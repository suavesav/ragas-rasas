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
    tr.dataset.search = [r.name, r.alt, r.thaat, r.time, r.season, r.ras.join(' '), r.char].join(' ').toLowerCase();
    tr.dataset.ras = r.ras.join(',');
    tr.dataset.season = r.season;
    tr.dataset.time = r.time;
    tr.dataset.thaat = r.thaat;
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
};
let searchTerm = '';

const groupLabels = { ras: 'Ras', time: 'Time', season: 'Season', thaat: 'Thaat' };

function applyFilters() {
  document.querySelectorAll('#tbody tr.main-row').forEach(tr => {
    const matchSearch = !searchTerm || tr.dataset.search.includes(searchTerm);
    const matchRas   = activeFilters.ras.size === 0   || [...activeFilters.ras].every(v => tr.dataset.ras.includes(v));
    const matchTime   = activeFilters.time.size === 0   || activeFilters.time.has(tr.dataset.time);
    const matchSeason = activeFilters.season.size === 0 || activeFilters.season.has(tr.dataset.season);
    const matchThaat  = activeFilters.thaat.size === 0  || activeFilters.thaat.has(tr.dataset.thaat);
    const hide = !(matchSearch && matchRas && matchTime && matchSeason && matchThaat);
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

function renderDetail(raag, panel) {
  const d = raagDetails[raag.name];
  if (!d) {
    panel.innerHTML = `<div style="font-family:'Inconsolata',monospace;font-size:0.8rem;color:var(--muted);padding:12px 0">Detailed information for this raag is not yet available.</div>`;
    return;
  }
  panel.innerHTML = `
    <div class="detail-grid">
      <div class="detail-block">
        <div class="detail-label">Swaras</div>
        <div class="detail-value">${d.swaras}</div>
      </div>
      <div class="detail-block">
        <div class="detail-label">Vadi</div>
        <div class="detail-value">${d.vadi}</div>
      </div>
      <div class="detail-block">
        <div class="detail-label">Samvadi</div>
        <div class="detail-value">${d.samvadi}</div>
      </div>
      <div class="detail-block">
        <div class="detail-label">Arohana</div>
        <div class="detail-value">${d.arohana}</div>
      </div>
      <div class="detail-block">
        <div class="detail-label">Avarohana</div>
        <div class="detail-value">${d.avarohana}</div>
      </div>
      <div class="detail-block" style="grid-column:1/-1">
        <div class="detail-label">Aalap</div>
        <div class="detail-value">${d.aalap}</div>
      </div>
    </div>
    <div class="detail-narrative">${d.narrative}</div>
  `;
}

renderRows(raags);
