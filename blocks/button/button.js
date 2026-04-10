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

  const text = config.text?.textContent?.trim() || config.label?.textContent?.trim()
    || block.querySelector(':scope > div > div')?.textContent?.trim() || 'Click here';
  const link = config.link?.querySelector('a')?.href || config.link?.textContent?.trim() || '#';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/button';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'button';
  block.dataset.aueLabel = text;

  const isSecondary = block.classList.contains('secondary');

  block.innerHTML = `
    <a class="button__link${isSecondary ? ' button__link--secondary' : ''}" href="${link}">
      <span class="button__text"
            data-aue-prop="text"
            data-aue-type="text"
            data-aue-label="Button Text">${text}</span>
    </a>
  `;
}
