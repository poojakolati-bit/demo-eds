export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const links = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent?.trim() || '';
    const url = cells[1]?.querySelector('a')?.href || cells[1]?.textContent?.trim() || '#';
    if (label) links.push({ label, url });
  });

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/breadcrumb';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'breadcrumb';
  block.dataset.aueLabel = 'Breadcrumb';

  const items = links.map((link, i) => {
    const isLast = i === links.length - 1;
    return isLast
      ? `<li class="breadcrumb__item breadcrumb__item--active" aria-current="page">${link.label}</li>`
      : `<li class="breadcrumb__item"><a class="breadcrumb__link" href="${link.url}">${link.label}</a></li>`;
  }).join('');

  block.innerHTML = `
    <nav class="breadcrumb__nav" aria-label="Breadcrumb">
      <ol class="breadcrumb__list">${items}</ol>
    </nav>
  `;
}
