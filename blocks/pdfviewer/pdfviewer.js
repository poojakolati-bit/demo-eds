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

  const pdfUrl = config.url?.querySelector('a')?.href || config.url?.textContent?.trim()
    || config.file?.querySelector('a')?.href || config.file?.textContent?.trim() || '';
  const title = config.title?.textContent?.trim() || 'PDF Document';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/pdfviewer';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'pdfviewer';
  block.dataset.aueLabel = title;

  if (pdfUrl) {
    block.innerHTML = `
      <div class="pdfviewer__wrapper">
        <iframe class="pdfviewer__frame" src="${pdfUrl}" title="${title}" loading="lazy"></iframe>
      </div>
    `;
  } else {
    block.innerHTML = '<p class="pdfviewer__empty">No PDF file configured.</p>';
  }
}
