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

  const title = config.title?.textContent?.trim() || 'Download';
  const description = config.description?.innerHTML || '';
  const fileUrl = config.file?.querySelector('a')?.href || config.file?.textContent?.trim() || '#';
  const fileName = config.filename?.textContent?.trim() || fileUrl.split('/').pop() || 'file';
  const actionText = config.action?.textContent?.trim() || 'Download';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/download';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'download';
  block.dataset.aueLabel = title;

  block.innerHTML = `
    <div class="download__inner">
      <div class="download__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </div>
      <div class="download__content">
        <h3 class="download__title">${title}</h3>
        ${description ? `<div class="download__description">${description}</div>` : ''}
        <span class="download__filename">${fileName}</span>
      </div>
      <a class="download__action" href="${fileUrl}" download>${actionText}</a>
    </div>
  `;
}
