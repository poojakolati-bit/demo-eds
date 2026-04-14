export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // Extract content from table rows (key-value pairs)
  const config = {};
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const [keyCell, valueCell] = cells;
      const key = keyCell.textContent.trim().toLowerCase();
      config[key] = valueCell;
    }
  });

  const title = config.title?.textContent?.trim() || '';
  const description = config.description?.innerHTML || '';
  const imgEl = config.image?.querySelector('img');
  const imgSrc = imgEl?.src || '';
  const imgAlt = imgEl?.alt || title;
  const actionLinks = config.actions?.querySelectorAll('a') || [];

  // UE resource path
  const resource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/teaser';

  block.dataset.aueResource = resource;
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'teaser';
  block.dataset.aueLabel = title || 'Teaser';

  const actionsMarkup = [...actionLinks].map((a) => `
    <a class="teaser__action-link" href="${a.href || '#'}">${a.textContent}</a>
  `).join('');

  block.innerHTML = `
    <div class="teaser__inner">
      ${imgSrc ? `
        <div class="teaser__image">
          <img src="${imgSrc}" alt="${imgAlt}" loading="lazy">
        </div>
      ` : ''}
      <div class="teaser__content">
        <h2 class="teaser__title"
            data-aue-prop="jcr:title"
            data-aue-type="text"
            data-aue-label="Title">${title}</h2>
        <div class="teaser__description"
             data-aue-prop="jcr:description"
             data-aue-type="richtext"
             data-aue-label="Description">${description}</div>
        ${actionsMarkup ? `<div class="teaser__action-container">${actionsMarkup}</div>` : ''}
      </div>
    </div>
  `;
}
