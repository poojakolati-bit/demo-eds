export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // Extract content from table rows
  const config = {};
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1];
      config[key] = value;
    }
  });

  const heading = config.heading?.textContent?.trim() || 'Digital Banking';
  const subtitle = config.subtitle?.innerHTML || '';
  const ctaLabel = config['cta label']?.textContent?.trim() || config.cta?.textContent?.trim() || '';
  const ctaLink = config['cta link']?.querySelector('a')?.href || '#';
  const bgImage = config['background image']?.querySelector('img')?.src
    || config.background?.querySelector('img')?.src
    || '/media/hero-bg.jpg';
  const prefixText = config['prefix text']?.textContent?.trim() || 'Mobile and Online Banking';

  // UE resource path
  const resource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/hero';

  block.dataset.aueResource = resource;
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'hero-banner';
  block.dataset.aueLabel = 'Hero Banner';

  block.innerHTML = `
    <div class="hero__overlay" style="background-image: url('${bgImage}');"></div>
    <div class="hero__card">
      <h1 class="hero__title" data-aue-prop="heading" data-aue-type="text" data-aue-label="Heading">${heading}</h1>
      <div class="hero__subtitle" data-aue-prop="subtitle" data-aue-type="richtext" data-aue-label="Subtitle">${subtitle}</div>
      ${ctaLabel ? `
        <div class="hero__cta-wrap">
          <span class="hero__cta-prefix" data-aue-prop="prefixText" data-aue-type="text" data-aue-label="CTA Prefix Text">${prefixText}</span>
          <a class="hero__cta" href="${ctaLink}" data-aue-prop="ctaLabel" data-aue-type="text" data-aue-label="CTA Button Text">${ctaLabel}</a>
        </div>
      ` : ''}
    </div>
  `;
}
