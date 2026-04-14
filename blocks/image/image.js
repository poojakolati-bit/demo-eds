export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const config = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const [keyCell, valueCell] = cells;
      const key = keyCell.textContent.trim().toLowerCase();
      config[key] = valueCell;
    }
  });

  const imgEl = config.image?.querySelector('img') || block.querySelector('img');
  const imgSrc = imgEl?.src || '';
  const imgAlt = config.alt?.textContent?.trim() || imgEl?.alt || '';
  const caption = config.caption?.textContent?.trim() || '';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/image';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'image';
  block.dataset.aueLabel = imgAlt || 'Image';

  block.innerHTML = `
    <figure class="image__figure">
      ${imgSrc ? `<img class="image__img" src="${imgSrc}" alt="${imgAlt}" loading="lazy"
          data-aue-prop="fileReference" data-aue-type="media" data-aue-label="Image">` : ''}
      ${caption ? `<figcaption class="image__caption">${caption}</figcaption>` : ''}
    </figure>
  `;
}
