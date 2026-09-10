function renderRows(data) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  data.forEach(r => {
    const tr = document.createElement('tr');
    const rasTags = r.ras.map(ras =>
      `<span class="ras-tag ${rasClass[ras] || ''}">${ras}</span>`
    ).join('');
    const sClass = seasonClass[r.season] || 's-any';
    tr.classList.add('main-row');
    tr.innerHTML = `
      <td>
        <div class="raag-line1">
          <div class="raag-name">${r.name}<span class="expand-icon">▶</span></div>
          <div class="mobile-meta-tags">${rasTags}</div>
        </div>
        ${r.alt ? `<div class="raag-alt">${r.alt}</div>` : ''}
        <div class="row-mobile-meta">${[r.alt && r.alt !== r.thaat ? r.alt : null, r.thaat, r.time, r.season].filter(Boolean).join(' · ')}</div>
      </td>
      <td class="thaat-cell">${r.thaat}</td>
      <td><span class="time-badge">${r.time}</span></td>
      <td><span class="season-badge ${sClass}">${r.season}</span></td>
      <td>${rasTags}</td>
      <td class="char-cell">${r.char}</td>
    `;

    const detailTr = document.createElement('tr');
    detailTr.classList.add('detail-row');
    const detailTd = document.createElement('td');
    detailTd.colSpan = 6;
    detailTd.innerHTML = `<div class="detail-panel"></div>`;
    detailTr.appendChild(detailTd);

    let loaded = false;
    tr.addEventListener('click', () => {
      const isOpen = detailTr.classList.contains('open');
      document.querySelectorAll('tr.detail-row.open').forEach(el => {
        el.classList.remove('open');
        el.previousElementSibling?.classList.remove('expanded');
      });
      if (!isOpen) {
        tr.classList.add('expanded');
        detailTr.classList.add('open');
        if (!loaded) {
          loaded = true;
          renderDetail(r, detailTd.querySelector('.detail-panel'));
        }
      }
    });
    tr.dataset.search = [r.name, r.alt, r.thaat, r.time, r.season, r.ras.join(' '), r.char, (raagDetails[r.name] || {}).family || ''].join(' ').toLowerCase();
    tr.dataset.ras = r.ras.join(',');
    tr.dataset.season = r.season;
    tr.dataset.time = r.time;
    tr.dataset.thaat = r.thaat;
    tr.dataset.family = (raagDetails[r.name] || {}).family || '';
    tr.dataset.name = r.name;
    tbody.appendChild(tr);
    tbody.appendChild(detailTr);
  });
  updateStats();
}

function updateStats() {
  const visible = document.querySelectorAll('#tbody tr.main-row:not(.hidden)').length;
  const total = document.querySelectorAll('#tbody tr.main-row').length;
  document.getElementById('stats').textContent =
    visible === total ? `Showing all ${total} raags` : `Showing ${visible} of ${total} raags`;
}

// Filter state — each group holds a Set of selected values
const activeFilters = {
  ras:   new Set(),
  time:   new Set(),
  season: new Set(),
  thaat:  new Set(),
  family: new Set(),
};
let searchTerm = '';

const groupLabels = { ras: 'Ras', time: 'Time', season: 'Season', thaat: 'Thaat', family: 'Family' };

function applyFilters() {
  document.querySelectorAll('#tbody tr.main-row').forEach(tr => {
    const matchSearch = !searchTerm || tr.dataset.search.includes(searchTerm);
    const matchRas   = activeFilters.ras.size === 0   || [...activeFilters.ras].every(v => tr.dataset.ras.includes(v));
    const matchTime   = activeFilters.time.size === 0   || activeFilters.time.has(tr.dataset.time);
    const matchSeason = activeFilters.season.size === 0 || activeFilters.season.has(tr.dataset.season);
    const matchThaat  = activeFilters.thaat.size === 0  || activeFilters.thaat.has(tr.dataset.thaat);
    const matchFamily = activeFilters.family.size === 0 || activeFilters.family.has(tr.dataset.family);
    const hide = !(matchSearch && matchRas && matchTime && matchSeason && matchThaat && matchFamily);
    tr.classList.toggle('hidden', hide);
    const detail = tr.nextElementSibling;
    if (detail?.classList.contains('detail-row')) detail.classList.toggle('hidden', hide);
  });
  updateStats();
  renderActiveChips();
}

function renderActiveChips() {
  const container = document.getElementById('active-chips');
  container.innerHTML = '';
  for (const [group, values] of Object.entries(activeFilters)) {
    values.forEach(value => {
      const chip = document.createElement('button');
      chip.className = 'active-chip';
      chip.innerHTML = `<span>${groupLabels[group]}: ${value}</span><span class="active-chip-remove">✕</span>`;
      chip.addEventListener('click', () => {
        activeFilters[group].delete(value);
        // sync the fchip button state
        document.querySelector(`.fchip[data-group="${group}"][data-value="${value}"]`)?.classList.remove('active');
        applyFilters();
      });
      container.appendChild(chip);
    });
  }
}

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const filterBtn = document.getElementById('filter-toggle');
const overlay = document.getElementById('overlay');

function isMobile() { return window.innerWidth <= 768; }

function closeBottomSheet() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  filterBtn.classList.remove('open');
}

filterBtn.addEventListener('click', () => {
  if (isMobile()) {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeBottomSheet();
    } else {
      sidebar.classList.add('open');
      overlay.classList.add('visible');
      filterBtn.classList.add('open');
    }
  } else {
    sidebar.classList.toggle('collapsed');
    filterBtn.classList.toggle('open');
  }
});

overlay.addEventListener('click', closeBottomSheet);

window.addEventListener('resize', () => {
  if (!isMobile()) closeBottomSheet();
});

// Chip clicks inside the filter panel
document.querySelectorAll('.fchip').forEach(btn => {
  btn.addEventListener('click', () => {
    const { group, value } = btn.dataset;
    if (activeFilters[group].has(value)) {
      activeFilters[group].delete(value);
      btn.classList.remove('active');
    } else {
      activeFilters[group].add(value);
      btn.classList.add('active');
    }
    applyFilters();
  });
});

// Reset
document.getElementById('reset-btn').addEventListener('click', () => {
  searchTerm = '';
  document.getElementById('search').value = '';
  for (const group of Object.keys(activeFilters)) activeFilters[group].clear();
  document.querySelectorAll('.fchip.active').forEach(el => el.classList.remove('active'));
  applyFilters();
});

// Search
document.getElementById('search').addEventListener('input', e => {
  searchTerm = e.target.value.toLowerCase().trim();
  applyFilters();
});

// Sort
let sortCol = -1, sortDir = 1;
document.querySelectorAll('th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = parseInt(th.dataset.col);
    if (sortCol === col) sortDir *= -1; else { sortCol = col; sortDir = 1; }
    const rows = Array.from(document.querySelectorAll('#tbody tr'));
    rows.sort((a, b) => {
      const av = a.cells[col]?.textContent.trim() || '';
      const bv = b.cells[col]?.textContent.trim() || '';
      return av.localeCompare(bv) * sortDir;
    });
    const tbody = document.getElementById('tbody');
    rows.forEach(r => tbody.appendChild(r));
  });
});

function block(label, value, wide) {
  if (!value) return '';
  return `<div class="detail-block"${wide ? ' style="grid-column:1/-1"' : ''}>
        <div class="detail-label">${label}</div>
        <div class="detail-value">${value}</div>
      </div>`;
}

function raagLinks(names) {
  return names.map(n => raagDetails[n]
    ? `<a class="raag-link" href="#" data-raag="${n}">${n}</a>`
    : `<span class="raag-plain">${n}</span>`).join(', ');
}

function renderDetail(raag, panel) {
  const d = raagDetails[raag.name];
  if (!d) {
    panel.innerHTML = `<div style="font-family:'Inconsolata',monospace;font-size:0.8rem;color:var(--muted);padding:12px 0">Detailed information for this raag is not yet available.</div>`;
    return;
  }
  const rasTags = raag.ras.map((r, i) =>
    `<span class="ras-tag ${rasClass[r] || ''}">${r}</span><span class="ras-role">${i === 0 ? 'primary' : 'secondary'}</span>`
  ).join(' ');
  const conf = d.rasConfidence ? `<span class="conf-badge conf-${d.rasConfidence.toLowerCase()}">${d.rasConfidence} confidence</span>` : '';
  const notes = [
    d.thaatNote && `<div class="detail-note"><span class="note-key">Thaat</span> ${d.thaatNote}</div>`,
    d.timeNote && `<div class="detail-note"><span class="note-key">Time</span> ${d.timeNote}</div>`,
    d.seasonNote && `<div class="detail-note"><span class="note-key">Season</span> ${d.seasonNote}</div>`,
    d.vadiNote && `<div class="detail-note"><span class="note-key">Vadi</span> ${d.vadiNote}</div>`,
    d.associations && d.associations.length && `<div class="detail-note"><span class="note-key">Association</span> ${d.associations.join('; ')}</div>`,
  ].filter(Boolean).join('');
  const sources = (d.sources || []).map(s => {
    const c = sourceCatalog[s.tag] || { name: s.tag };
    return `<a class="src-link" href="${s.url}" target="_blank" rel="noopener" title="${c.name}">${s.tag}</a>`;
  }).join('');
  panel.innerHTML = `
    <div class="detail-grid">
      ${block('Swaras', d.swaras)}
      ${block('Vadi', d.vadi)}
      ${block('Samvadi', d.samvadi)}
      ${block('Jati', d.jati)}
      ${block('Family', d.family)}
      ${block('Arohana', d.arohana)}
      ${block('Avarohana', d.avarohana)}
      ${block('Pakad', d.pakad, true)}
      ${block('Aalap', d.aalap, true)}
    </div>
    <div class="detail-ras">
      <div class="detail-label">Ras ${conf}</div>
      <div class="detail-ras-tags">${rasTags}</div>
      ${d.rasEvidence ? `<div class="detail-evidence">${d.rasEvidence}</div>` : ''}
    </div>
    ${notes ? `<div class="detail-notes">${notes}</div>` : ''}
    <div class="detail-narrative">${d.narrative}</div>
    <div class="detail-related">
      ${d.confusedWith && d.confusedWith.length ? `<div class="detail-note"><span class="note-key">Easily confused with</span> ${raagLinks(d.confusedWith)}</div>` : ''}
      ${d.variants && d.variants.length ? `<div class="detail-note"><span class="note-key">${d.family} family</span> ${raagLinks(d.variants)}</div>` : ''}
    </div>
    <div class="detail-sources">
      <span class="note-key">Sources</span> ${sources}
      <a class="src-all" href="sources.html">all sources ›</a>
    </div>
  `;
  panel.querySelectorAll('a.raag-link').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const target = document.querySelector(`#tbody tr.main-row[data-name="${a.dataset.raag}"]`);
    if (!target) return;
    if (target.classList.contains('hidden')) {
      document.getElementById('reset-btn').click();
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (!target.classList.contains('expanded')) target.click();
  }));
}

// Family filter chips are built from the data so new families appear automatically.
(function buildFamilyChips() {
  const container = document.getElementById('chips-family');
  if (!container) return;
  const fams = [...new Set(raags.map(r => (raagDetails[r.name] || {}).family).filter(Boolean))].sort();
  fams.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'fchip'; btn.dataset.group = 'family'; btn.dataset.value = f; btn.textContent = f;
    btn.addEventListener('click', () => {
      if (activeFilters.family.has(f)) { activeFilters.family.delete(f); btn.classList.remove('active'); }
      else { activeFilters.family.add(f); btn.classList.add('active'); }
      applyFilters();
    });
    container.appendChild(btn);
  });
}());

renderRows(raags);
