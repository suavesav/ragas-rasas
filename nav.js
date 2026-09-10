(function () {
  const links = [
    { href: 'index.html',  label: 'Raags' },
    { href: 'rasas.html',  label: 'Ras' },
    { href: 'thaats.html', label: 'Thaats' },
    { href: 'sources.html', label: 'Sources' },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = links.map(l =>
    `<a href="${l.href}" class="nav-link${current === l.href ? ' active' : ''}">${l.label}</a>`
  ).join('<span class="nav-sep">·</span>');

  document.currentScript.insertAdjacentElement('afterend', nav);
}());
