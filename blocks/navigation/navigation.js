export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const navItems = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent?.trim() || '';
    const url = cells[1]?.querySelector('a')?.href || cells[1]?.textContent?.trim() || '#';
    const children = [];
    // Sub-items in remaining cells
    for (let i = 2; i < cells.length; i += 2) {
      const subLabel = cells[i]?.textContent?.trim();
      const subUrl = cells[i + 1]?.querySelector('a')?.href || cells[i + 1]?.textContent?.trim() || '#';
      if (subLabel) children.push({ label: subLabel, url: subUrl });
    }
    if (label) navItems.push({ label, url, children });
  });

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/navigation';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'navigation';
  block.dataset.aueLabel = 'Navigation';

  const items = navItems.map((item) => {
    const sub = item.children.length
      ? `<ul class="navigation__sub">${item.children.map((c) => `
          <li class="navigation__sub-item"><a class="navigation__sub-link" href="${c.url}">${c.label}</a></li>`).join('')}
        </ul>`
      : '';
    return `
      <li class="navigation__item${item.children.length ? ' navigation__item--has-children' : ''}">
        <a class="navigation__link" href="${item.url}">${item.label}</a>
        ${sub}
      </li>`;
  }).join('');

  block.innerHTML = `
    <nav class="navigation__nav" aria-label="Section navigation">
      <ul class="navigation__list">${items}</ul>
    </nav>
  `;
}
