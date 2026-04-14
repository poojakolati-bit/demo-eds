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

  const label = config.label?.textContent?.trim() || 'Progress';
  const value = parseInt(config.value?.textContent?.trim(), 10) || 0;
  const clampedValue = Math.min(100, Math.max(0, value));

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/progressbar';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'progressbar';
  block.dataset.aueLabel = label;

  block.innerHTML = `
    <div class="progressbar__wrapper">
      <div class="progressbar__label-row">
        <span class="progressbar__label">${label}</span>
        <span class="progressbar__value">${clampedValue}%</span>
      </div>
      <div class="progressbar__track" role="progressbar" aria-valuenow="${clampedValue}" aria-valuemin="0" aria-valuemax="100" aria-label="${label}">
        <div class="progressbar__fill" style="width: ${clampedValue}%;"></div>
      </div>
    </div>
  `;
}
