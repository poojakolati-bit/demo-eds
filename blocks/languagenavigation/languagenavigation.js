export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const languages = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent?.trim() || '';
    const code = cells[1]?.textContent?.trim() || '';
    const url = cells[2]?.querySelector('a')?.href || cells[2]?.textContent?.trim() || '#';
    const isActive = cells[3]?.textContent?.trim().toLowerCase() === 'true';
    if (label) {
      languages.push({
        label, code, url, isActive,
      });
    }
  });

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/languagenavigation';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'languagenavigation';
  block.dataset.aueLabel = 'Language Navigation';

  const activeLang = languages.find((l) => l.isActive) || languages[0];

  const options = languages.map((lang) => `
    <li class="languagenavigation__item${lang.isActive ? ' languagenavigation__item--active' : ''}">
      <a class="languagenavigation__link" href="${lang.url}" lang="${lang.code}">${lang.label}</a>
    </li>
  `).join('');

  block.innerHTML = `
    <div class="languagenavigation__wrapper">
      <button class="languagenavigation__toggle" aria-expanded="false" aria-haspopup="true">
        <span class="languagenavigation__current">${activeLang?.label || 'Language'}</span>
        <svg class="languagenavigation__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <ul class="languagenavigation__list" role="menu" hidden>${options}</ul>
    </div>
  `;

  const toggle = block.querySelector('.languagenavigation__toggle');
  const list = block.querySelector('.languagenavigation__list');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    list.hidden = expanded;
  });

  document.addEventListener('click', (e) => {
    if (!block.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      list.hidden = true;
    }
  });
}
