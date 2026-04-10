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

  const heading = config.heading?.textContent?.trim() || 'Bank simply and conveniently on your own schedule';
  const ctaLabel = config['cta label']?.textContent?.trim() || config.cta?.textContent?.trim() || 'Get the app';
  const ctaLink = config['cta link']?.querySelector('a')?.href || '#';
  const qrcImg = config['qr image']?.querySelector('img')?.src || config.qrc?.querySelector('img')?.src || '/media/qrc-widget.jpg';
  const termsText = config.terms?.innerHTML || '';

  // UE component attributes
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/app-download';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'app-download';
  block.dataset.aueLabel = 'App Download';

  block.innerHTML = `
    <div class="app-download__bar"></div>
    <div class="app-download__wrapper">
      <div class="app-download__left">
        <h2 class="app-download__title" data-aue-prop="heading" data-aue-type="text" data-aue-label="Heading">${heading}</h2>
        <div class="app-download__select">
          <select>
            <option>Select your device</option>
            <option>iPhone</option>
            <option>Android</option>
          </select>
          <div class="app-download__select-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>
          </div>
        </div>
        <a class="app-download__cta" href="${ctaLink}" data-aue-prop="ctaLabel" data-aue-type="text" data-aue-label="CTA Button Text">${ctaLabel}</a>
        ${termsText ? `<div class="app-download__terms" data-aue-prop="termsText" data-aue-type="richtext" data-aue-label="Terms Text">${termsText}</div>` : ''}
      </div>
      <div class="app-download__right">
        <img class="app-download__qrc-image" src="${qrcImg}" alt="Scan the QR code to download our app" loading="lazy">
      </div>
    </div>
  `;
}
