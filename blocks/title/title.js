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

  const text = config.text?.textContent?.trim() || config.title?.textContent?.trim()
    || block.querySelector(':scope > div > div')?.textContent?.trim() || '';
  const type = config.type?.textContent?.trim() || 'h2';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/title';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'title';
  block.dataset.aueLabel = text || 'Title';

  block.innerHTML = `
    <div class="title__wrapper">
      <${type} class="title__text"
          data-aue-prop="jcr:title"
          data-aue-type="text"
          data-aue-label="Title Text">${text}</${type}>
    </div>
  `;
}
