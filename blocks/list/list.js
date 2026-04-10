export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const items = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const title = cells[0]?.textContent?.trim() || '';
    const link = cells[1]?.querySelector('a')?.href || cells[1]?.textContent?.trim() || '#';
    const description = cells[2]?.textContent?.trim() || '';
    if (title) items.push({ title, link, description });
  });

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/list';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'list';
  block.dataset.aueLabel = 'List';

  const listItems = items.map((item) => `
    <li class="list__item">
      <a class="list__item-link" href="${item.link}">${item.title}</a>
      ${item.description ? `<p class="list__item-description">${item.description}</p>` : ''}
    </li>
  `).join('');

  block.innerHTML = `<ul class="list__items">${listItems}</ul>`;
}
