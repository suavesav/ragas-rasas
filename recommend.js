// Raag recommender: pure logic (testable under node) + DOM code.
// Globals expected in the browser: raags, raagDetails (data.js), rasInfo, thaatInfo (info.js).

const BUCKETS = ['Late night', 'Pre-dawn', 'Dawn', 'Morning', 'Afternoon', 'Sunset', 'Evening', 'Night'];

function bucketForHour(h) {
  if (h <= 3) return 'Late night';
  if (h <= 5) return 'Pre-dawn';
  if (h <= 7) return 'Dawn';
  if (h <= 11) return 'Morning';
  if (h <= 15) return 'Afternoon';
  if (h <= 17) return 'Sunset';
  if (h <= 20) return 'Evening';
  return 'Night';
}

function adjacentBuckets(bucket) {
  const i = BUCKETS.indexOf(bucket);
  if (i === -1) return [];
  const n = BUCKETS.length;
  return [BUCKETS[(i - 1 + n) % n], BUCKETS[(i + 1) % n]];
}

function normalizeTime(t) {
  return t.split(' / ')[0].trim();
}

function seasonFromMonth(monthIndex, lat) {
  let m = monthIndex;
  if (lat < 0) m = (m + 6) % 12;
  if (m === 1 || m === 2) return 'Spring';
  if (m === 3 || m === 4 || m === 5) return 'Summer';
  if (m === 6 || m === 7 || m === 8) return 'Monsoon';
  if (m === 9 || m === 10) return 'Autumn';
  return 'Winter'; // 11 (Dec), 0 (Jan)
}

function seasonFromWeather(weather, monthIndex, lat) {
  const { temperature, precipitation, weatherCode } = weather;
  // The "rain rule": precipitation present, or a weather code for rain/showers/thunderstorm.
  const c = weatherCode;
  const raining = precipitation > 0 || (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || (c >= 95 && c <= 99);
  if (raining) return 'Monsoon';
  if (temperature >= 30) return 'Summer';
  if (temperature <= 12) return 'Winter';
  return seasonFromMonth(monthIndex, lat);
}

const FEELINGS = [
  { word: 'tender', ras: 'Shringar' },
  { word: 'still', ras: 'Shanta' },
  { word: 'wistful', ras: 'Karuna' },
  { word: 'playful', ras: 'Hasya' },
  { word: 'dreamy', ras: 'Adbhuta' },
  { word: 'bold', ras: 'Veer' },
  { word: 'fierce', ras: 'Raudra' },
  { word: 'in love', ras: 'Shringar' },
  { word: 'calm', ras: 'Shanta' },
  { word: 'homesick', ras: 'Karuna' },
  { word: 'giddy', ras: 'Hasya' },
  { word: 'wonder', ras: 'Adbhuta' },
  { word: 'fired up', ras: 'Veer' },
  { word: 'restless', ras: 'Raudra' },
  { word: 'longing', ras: 'Shringar' },
  { word: 'unhurried', ras: 'Shanta' },
  { word: 'melancholy', ras: 'Karuna' },
  { word: 'festive', ras: 'Hasya' },
  { word: 'proud', ras: 'Veer' },
  { word: 'curious', ras: 'Adbhuta' },
  { word: 'stormy', ras: 'Raudra' },
  { word: 'uneasy', ras: 'Bhayanaka' },
  { word: 'haunted', ras: 'Bhayanaka' },
  { word: 'brooding', ras: 'Bhayanaka' },
];

function buildPool(raags, bucket) {
  const adj = adjacentBuckets(bucket);
  const pool = [];
  for (const raag of raags) {
    const t = normalizeTime(raag.time);
    if (t === bucket) pool.push({ raag, tier: 0 });
    else if (adj.indexOf(t) !== -1) pool.push({ raag, tier: 1 });
    else if (raag.time === 'Any') pool.push({ raag, tier: 2 });
  }
  return pool;
}

function feelingsFor(pool) {
  const rasSeen = new Set();
  for (const { raag, tier } of pool) {
    if (tier === 0 || tier === 1) raag.ras.forEach(r => rasSeen.add(r));
  }
  return FEELINGS.filter(f => rasSeen.has(f.ras));
}

function rank(pool, chosenRas, season, rng) {
  const useRng = rng || Math.random;
  const matches = [];
  for (const { raag, tier } of pool) {
    let matched = 0;
    for (const r of raag.ras) if (chosenRas.has(r)) matched++;
    if (matched === 0) continue;
    const seasonRank = raag.season === season ? 0 : (raag.season === 'Any' ? 1 : 2);
    matches.push({ raag, tier, seasonRank, matched });
  }
  // Fisher-Yates shuffle so ties fall in a stable, rng-determined order after the sort below.
  const shuffled = matches.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(useRng() * (i + 1));
    const tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
  }
  shuffled.sort((a, b) => {
    if (b.matched !== a.matched) return b.matched - a.matched;
    if (a.tier !== b.tier) return a.tier - b.tier;
    if (a.seasonRank !== b.seasonRank) return a.seasonRank - b.seasonRank;
    const aPrimary = chosenRas.has(a.raag.ras[0]) ? 0 : 1;
    const bPrimary = chosenRas.has(b.raag.ras[0]) ? 0 : 1;
    return aPrimary - bPrimary;
  });
  return shuffled;
}

if (typeof document !== 'undefined') {
  (function () {
    'use strict';

    // ---------- static tables ----------

    const SEASON_ORDER = ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];
    const SEASON_MONTHS = { Spring: 'feb – mar', Summer: 'apr – jun', Monsoon: 'jul – sep', Autumn: 'oct – nov', Winter: 'dec – jan' };
    const SEASON_COLORS = { Spring: '#90c850', Summer: '#e89030', Monsoon: '#7ec8ea', Autumn: '#c87040', Winter: '#90a8c8' };

    const BUCKET_HOURS = {
      'Late night': '12am – 3am',
      'Pre-dawn': '4am – 5am',
      'Dawn': '6am – 7am',
      'Morning': '8am – 11am',
      'Afternoon': '12pm – 3pm',
      'Sunset': '4pm – 5pm',
      'Evening': '6pm – 8pm',
      'Night': '9pm – 11pm',
    };

    const RAS_COLORS = {
      Shringar: { bg: '#7a2e60', text: '#ffd6ea' },
      Shanta: { bg: '#2f5f2f', text: '#d6f2d6' },
      Karuna: { bg: '#343e7c', text: '#d8dfff' },
      Hasya: { bg: '#7a6520', text: '#fff1b8' },
      Veer: { bg: '#7c4a14', text: '#ffdcb0' },
      Adbhuta: { bg: '#4e2c7a', text: '#e9d8ff' },
      Raudra: { bg: '#7a2a1c', text: '#ffd2c8' },
      Bhayanaka: { bg: '#185048', text: '#c8f0e8' },
    };

    const RAS_REVEAL = {
      Shringar: { a: '#a03a7c', b: '#5a1c48' },
      Shanta: { a: '#3f8a3f', b: '#1f4a1f' },
      Karuna: { a: '#4a58b0', b: '#262e60' },
      Hasya: { a: '#b09030', b: '#5a4a14' },
      Veer: { a: '#b06a1a', b: '#5a3410' },
      Adbhuta: { a: '#7040b0', b: '#3a2060' },
      Raudra: { a: '#b04030', b: '#5a2018' },
      Bhayanaka: { a: '#2a8a7a', b: '#164a40' },
    };

    // ---------- small helpers ----------

    function esc(s) {
      return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function qs(id) { return document.getElementById(id); }

    function hexToRgba(hex, alpha) {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function darken(hex, factor) {
      const h = hex.replace('#', '');
      const r = Math.round(parseInt(h.substring(0, 2), 16) * factor);
      const g = Math.round(parseInt(h.substring(2, 4), 16) * factor);
      const b = Math.round(parseInt(h.substring(4, 6), 16) * factor);
      return `rgb(${r},${g},${b})`;
    }

    function lighten(hex, amt) {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
      const nr = Math.round(r + (255 - r) * amt);
      const ng = Math.round(g + (255 - g) * amt);
      const nb = Math.round(b + (255 - b) * amt);
      return `rgb(${nr},${ng},${nb})`;
    }

    function mulberry32(seed) {
      let a = seed >>> 0;
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    // Mirrors the rain rule inside seasonFromWeather, to derive the readout's "rain"/"clear" word.
    function isRaining(precipitation, weatherCode) {
      const c = weatherCode;
      return precipitation > 0 || (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || (c >= 95 && c <= 99);
    }

    function formatTime(d) {
      let h = d.getHours();
      const m = d.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12; if (h === 0) h = 12;
      return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
    }

    const ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6.5l2.6 2.5L10 3.5"></path></svg>';
    const ICON_INFO = '<svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="6" cy="6" r="5"></circle><path d="M6 5.5v3M6 3.6v.2"></path></svg>';
    const ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"></path></svg>';
    const ICON_ARROW = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h14M12 5l6 6-6 6"></path></svg>';

    // ---------- state ----------

    const now = new Date();
    const state = {
      bucket: bucketForHour(now.getHours()),
      season: seasonFromMonth(now.getMonth()),
      monthIndex: now.getMonth(),
      timeStr: formatTime(now),
      weatherWord: null, // 'rain' | 'clear' | null (month fallback)
      tempC: null,
      seasonLocked: false, // true once the season sheet has been opened
      chosen: new Set(),
      ranked: [],
      index: 0,
      rng: mulberry32((Date.now() ^ (Math.random() * 0xffffffff)) >>> 0),
    };

    // ---------- element refs ----------

    const screens = {
      guess: qs('screen-guess'),
      mood: qs('screen-mood'),
      reveal: qs('screen-reveal'),
    };

    const sheetEl = qs('sheet');
    const sheetContentEl = qs('sheet-content');
    const popoverEl = qs('popover');
    const popoverContentEl = qs('popover-content');
    const popoverPanelEl = popoverEl.querySelector('.popover-panel');

    document.querySelectorAll('.close-link').forEach(el => {
      el.innerHTML = ICON_CLOSE;
      el.addEventListener('click', (e) => e.stopPropagation());
    });
    document.querySelectorAll('.sheet-close, .popover-close').forEach(el => { el.innerHTML = ICON_CLOSE; });

    function showScreen(name) {
      Object.keys(screens).forEach(k => { screens[k].hidden = k !== name; });
    }

    // ---------- sheet / popover plumbing ----------

    function openSheet(html) {
      sheetContentEl.innerHTML = html;
      sheetEl.hidden = false;
    }

    function closeSheet() {
      sheetEl.hidden = true;
      sheetContentEl.innerHTML = '';
    }

    function openPopover(html, borderColor) {
      popoverContentEl.innerHTML = html;
      popoverPanelEl.style.borderColor = borderColor || 'rgba(201,168,76,0.35)';
      popoverEl.hidden = false;
    }

    function closePopover() {
      popoverEl.hidden = true;
      popoverContentEl.innerHTML = '';
    }

    document.querySelectorAll('[data-close="sheet"]').forEach(el => el.addEventListener('click', closeSheet));
    document.querySelectorAll('[data-close="popover"]').forEach(el => el.addEventListener('click', closePopover));

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!popoverEl.hidden) closePopover();
      else if (!sheetEl.hidden) closeSheet();
    });

    // ---------- screen 1: guess ----------

    const guessScreenEl = screens.guess;
    const seasonWordEl = qs('season-word');
    const timeWordEl = qs('time-word');
    const seasonWordText = seasonWordEl.querySelector('.word-text');
    const timeWordText = timeWordEl.querySelector('.word-text');
    const basedOnEl = qs('based-on');

    function renderGuess() {
      guessScreenEl.setAttribute('data-bucket', state.bucket);

      seasonWordText.textContent = state.season.toLowerCase();
      const seasonColor = SEASON_COLORS[state.season];
      seasonWordText.style.color = seasonColor;
      seasonWordText.style.borderBottomColor = hexToRgba(seasonColor, 0.55);

      timeWordText.textContent = state.bucket.toLowerCase() + '.';

      const parts = ['based on', state.timeStr];
      if (state.weatherWord) {
        parts.push(state.weatherWord, `${state.tempC}°C`);
      } else {
        parts.push('month');
      }
      basedOnEl.textContent = parts.join(' · ');
    }

    function seasonSheetHtml() {
      const rows = SEASON_ORDER.map(s => {
        const isCurrent = s === state.season;
        const color = isCurrent ? SEASON_COLORS[s] : '#8a7a60';
        let reason = SEASON_MONTHS[s];
        if (isCurrent) {
          if (state.weatherWord === 'rain') reason = 'raining near you';
          else if (state.weatherWord === 'clear') reason = `${state.tempC}°C near you`;
          else reason = 'by month';
        }
        return `<button type="button" class="sheet-row" data-season="${esc(s)}" style="color:${color}">
          <span class="sheet-row-name">${esc(s.toLowerCase())}</span>
          <span class="sheet-row-meta">${esc(reason)}</span>
        </button>`;
      }).join('');
      return `<div class="sheet-grab"></div><div class="sheet-label mono">season</div>${rows}`;
    }

    function timeSheetHtml() {
      const rows = BUCKETS.map(b => {
        const isCurrent = b === state.bucket;
        const color = isCurrent ? '#f0e8d8' : '#8a7a60';
        return `<button type="button" class="sheet-row" data-bucket="${esc(b)}" style="color:${color}">
          <span class="sheet-row-name">${esc(b.toLowerCase())}</span>
          <span class="sheet-row-meta">${esc(BUCKET_HOURS[b])}</span>
        </button>`;
      }).join('');
      return `<div class="sheet-grab"></div><div class="sheet-label mono">time of day</div>${rows}`;
    }

    function openSeasonSheet() {
      state.seasonLocked = true;
      openSheet(seasonSheetHtml());
      sheetContentEl.querySelectorAll('[data-season]').forEach(row => {
        row.addEventListener('click', () => {
          state.season = row.getAttribute('data-season');
          renderGuess();
          closeSheet();
        });
      });
    }

    function openTimeSheet() {
      openSheet(timeSheetHtml());
      sheetContentEl.querySelectorAll('[data-bucket]').forEach(row => {
        row.addEventListener('click', () => {
          state.bucket = row.getAttribute('data-bucket');
          renderGuess();
          closeSheet();
        });
      });
    }

    seasonWordEl.addEventListener('click', (e) => { e.stopPropagation(); openSeasonSheet(); });
    timeWordEl.addEventListener('click', (e) => { e.stopPropagation(); openTimeSheet(); });

    guessScreenEl.addEventListener('click', () => { goToMood(); });

    // ---------- screen 2: mood ----------

    const moodEyebrowEl = qs('mood-eyebrow');
    const moodGridEl = qs('mood-grid');
    const moodFindBtn = qs('mood-find-btn');
    const moodCountEl = moodFindBtn.querySelector('.count');

    let currentPool = [];
    let currentFeelings = [];

    function goToMood() {
      currentPool = buildPool(raags, state.bucket);
      currentFeelings = feelingsFor(currentPool);
      state.chosen.clear();
      renderMood();
      showScreen('mood');
    }

    function renderMood() {
      const seasonColor = SEASON_COLORS[state.season];
      moodEyebrowEl.textContent = `${state.season.toLowerCase()} ${state.bucket.toLowerCase()}`;
      moodEyebrowEl.style.color = seasonColor;

      moodGridEl.innerHTML = currentFeelings.map(f => {
        const colors = RAS_COLORS[f.ras];
        const selected = state.chosen.has(f.word);
        return `<button type="button" class="mood-tile${selected ? ' selected' : ''}" data-word="${esc(f.word)}" style="background:${colors.bg};color:${colors.text}">
          <span class="mood-tile-check">${selected ? ICON_CHECK : ''}</span>
          <span>${esc(f.word)}</span>
        </button>`;
      }).join('');

      moodGridEl.querySelectorAll('.mood-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          const word = tile.getAttribute('data-word');
          const on = !state.chosen.has(word);
          if (on) state.chosen.add(word); else state.chosen.delete(word);
          tile.classList.toggle('selected', on);
          tile.querySelector('.mood-tile-check').innerHTML = on ? ICON_CHECK : '';
          renderMoodCount();
        });
      });

      renderMoodCount();
    }

    function renderMoodCount() {
      const n = state.chosen.size;
      moodCountEl.textContent = n ? `· ${n} mood${n === 1 ? '' : 's'}` : '';
      moodFindBtn.disabled = n === 0;
    }

    moodFindBtn.addEventListener('click', () => {
      if (state.chosen.size === 0) return;
      const chosenRasSet = new Set(currentFeelings.filter(f => state.chosen.has(f.word)).map(f => f.ras));
      state.ranked = rank(currentPool, chosenRasSet, state.season, state.rng);
      state.index = 0;
      if (state.ranked.length === 0) return;
      renderReveal();
      showScreen('reveal');
    });

    // ---------- screen 3: reveal ----------

    const revealScreenEl = screens.reveal;
    const revealReadoutEl = qs('reveal-readout');
    const revealEyebrowEl = qs('reveal-eyebrow');
    const revealNameEl = qs('reveal-name');
    const revealAltEl = qs('reveal-alt');
    const revealCharEl = qs('reveal-char');
    const revealPillsEl = qs('reveal-pills');
    const revealHintEl = qs('reveal-hint');
    const revealNotesBtn = qs('reveal-notes-btn');
    const btnAnother = qs('btn-another');
    const btnStartOver = qs('btn-start-over');

    function chosenWords() {
      return currentFeelings.filter(f => state.chosen.has(f.word)).map(f => f.word);
    }

    function renderReveal() {
      const entry = state.ranked[state.index];
      const raag = entry.raag;
      const primaryRas = raag.ras[0];
      const revealColors = RAS_REVEAL[primaryRas] || RAS_REVEAL.Shringar;
      const rasColors = RAS_COLORS[primaryRas] || RAS_COLORS.Shringar;
      const dark = darken(revealColors.b, 0.35);
      const nameColor = lighten(rasColors.text, 0.15);

      revealScreenEl.style.setProperty('--ras-a', revealColors.a);
      revealScreenEl.style.setProperty('--ras-b', revealColors.b);
      revealScreenEl.style.setProperty('--ras-c', dark);
      revealScreenEl.style.setProperty('--ras-text', rasColors.text);
      revealScreenEl.style.setProperty('--ras-name', nameColor);

      const words = chosenWords();
      revealEyebrowEl.textContent = `for a ${words.join(', ')} ${state.season.toLowerCase()} ${state.bucket.toLowerCase()}`;
      revealReadoutEl.textContent = `${state.timeStr} · ${state.season.toLowerCase()} ${state.bucket.toLowerCase()}`;

      revealNameEl.textContent = raag.name;

      if (raag.alt) {
        revealAltEl.textContent = `also called ${raag.alt}`;
        revealAltEl.hidden = false;
      } else {
        revealAltEl.hidden = true;
      }

      revealCharEl.textContent = raag.char;

      const timeLabel = normalizeTime(raag.time).toLowerCase();
      const borderCol = hexToRgba(rasColors.text, 0.4);
      revealPillsEl.innerHTML = `
        <button type="button" class="pill pill-thaat" data-popover="thaat" data-name="${esc(raag.thaat)}" style="border-color:${borderCol}">${esc(raag.thaat)} thaat ${ICON_INFO}</button>
        <button type="button" class="pill pill-ras" data-popover="ras" data-name="${esc(primaryRas)}" style="border-color:${hexToRgba(rasColors.text, 0.7)};background:${hexToRgba(rasColors.text, 0.2)}">${esc(primaryRas.toLowerCase())} ${ICON_INFO}</button>
        <span class="pill pill-time">${esc(timeLabel)}</span>
      `;
      revealPillsEl.querySelectorAll('[data-popover]').forEach(btn => {
        btn.addEventListener('click', () => {
          const kind = btn.getAttribute('data-popover');
          const name = btn.getAttribute('data-name');
          if (kind === 'ras') openRasPopover(name);
          else openThaatPopover(name);
        });
      });

      let hint = '';
      if (entry.tier === 2) hint = 'sung at any hour';
      else if (entry.tier === 1) hint = `usually sung at ${timeLabel}`;
      else if (raag.season !== state.season && raag.season !== 'Any') hint = `a ${raag.season.toLowerCase()} raag`;
      if (hint) {
        revealHintEl.textContent = hint;
        revealHintEl.hidden = false;
      } else {
        revealHintEl.hidden = true;
      }

      const details = (typeof raagDetails !== 'undefined') ? raagDetails[raag.name] : undefined;
      const swarasEl = revealNotesBtn.querySelector('.reveal-notes-swaras');
      swarasEl.textContent = details && details.swaras ? details.swaras : raag.name;
      revealNotesBtn.onclick = () => openNotesSheet(raag, details);
    }

    function openNotesSheet(raag, details) {
      let html = `<div class="sheet-grab"></div><div class="notes-title">${esc(raag.name)}</div>`;
      if (details) {
        const fields = [
          ['Swaras', details.swaras],
          ['Vadi', details.vadi],
          ['Samvadi', details.samvadi],
          ['Arohana', details.arohana],
          ['Avarohana', details.avarohana],
          ['Aalap', details.aalap],
        ];
        html += `<div class="detail-grid">${fields.map(([label, val]) => val ? `
          <div class="detail-item"><div class="detail-label">${esc(label)}</div><div class="detail-value">${esc(val)}</div></div>
        ` : '').join('')}</div>`;
        if (details.narrative) {
          html += `<div class="notes-narrative">${details.narrative}</div>`;
        }
      }
      openSheet(html);
    }

    function openRasPopover(name) {
      const info = (typeof rasInfo !== 'undefined') ? rasInfo.find(r => r.name === name) : undefined;
      const color = info ? info.color : '#c9a84c';
      let html;
      if (info) {
        html = `
          <button class="popover-close" data-close="popover" aria-label="Close">${ICON_CLOSE}</button>
          <div class="popover-sanskrit">${esc(info.sanskrit)}</div>
          <div class="popover-name" style="color:${esc(color)}">${esc(info.name)}</div>
          <div class="popover-sub">${esc(info.meaning.toLowerCase())} · one of the nine ras</div>
          <div class="popover-desc">${info.description}</div>
          <a class="popover-link" href="rasas.html">all nine ras →</a>
        `;
      } else {
        html = `
          <button class="popover-close" data-close="popover" aria-label="Close">${ICON_CLOSE}</button>
          <div class="popover-name">${esc(name)}</div>
        `;
      }
      openPopover(html, hexToRgba(color, 0.4));
      wirePopoverClose();
    }

    function openThaatPopover(name) {
      const info = (typeof thaatInfo !== 'undefined') ? thaatInfo.find(t => t.name === name) : undefined;
      const color = info ? info.color : '#c9a84c';
      let html;
      if (info) {
        html = `
          <button class="popover-close" data-close="popover" aria-label="Close">${ICON_CLOSE}</button>
          <div class="popover-sanskrit">${esc(info.sanskrit)}</div>
          <div class="popover-name" style="color:${esc(color)}">${esc(info.name)}</div>
          <div class="popover-scale">${esc(info.scale)}</div>
          <div class="popover-sub">${esc(info.alteration)}</div>
          <div class="popover-desc">${info.description}</div>
          <a class="popover-link" href="thaats.html">all ten thaats →</a>
        `;
      } else {
        html = `
          <button class="popover-close" data-close="popover" aria-label="Close">${ICON_CLOSE}</button>
          <div class="popover-name">${esc(name)}</div>
        `;
      }
      openPopover(html, hexToRgba(color, 0.4));
      wirePopoverClose();
    }

    function wirePopoverClose() {
      popoverContentEl.querySelectorAll('[data-close="popover"]').forEach(el => el.addEventListener('click', closePopover));
    }

    btnAnother.addEventListener('click', () => {
      state.index = (state.index + 1) % state.ranked.length;
      renderReveal();
    });

    btnStartOver.addEventListener('click', () => {
      state.chosen.clear();
      showScreen('guess');
    });

    // ---------- weather / geolocation ----------

    function tryWeather() {
      if (!('geolocation' in navigator)) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 5000);
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code`;
          fetch(url, { signal: controller.signal })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error('bad response'))))
            .then(data => {
              const cur = data && data.current;
              if (!cur || typeof cur.temperature_2m !== 'number') return;
              const weather = { temperature: cur.temperature_2m, precipitation: cur.precipitation, weatherCode: cur.weather_code };
              const newSeason = seasonFromWeather(weather, state.monthIndex, latitude);
              if (!state.seasonLocked) {
                state.season = newSeason;
                state.weatherWord = isRaining(weather.precipitation, weather.weatherCode) ? 'rain' : 'clear';
                state.tempC = Math.round(weather.temperature);
                renderGuess();
              }
            })
            .catch(() => {})
            .finally(() => clearTimeout(timer));
        },
        () => {},
        { timeout: 5000 }
      );
    }

    // ---------- init ----------

    renderGuess();
    showScreen('guess');
    tryWeather();
  }());
}

if (typeof module !== 'undefined') module.exports = { BUCKETS, bucketForHour, adjacentBuckets, normalizeTime, seasonFromMonth, seasonFromWeather, FEELINGS, buildPool, feelingsFor, rank };
