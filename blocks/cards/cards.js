export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const isResourceCenter = block.classList.contains('resource-center');

  // UE container attributes for the cards block
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/cards';
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'feature-card';
  block.dataset.aueLabel = isResourceCenter ? 'Resource Center Cards' : 'Feature Cards';

  const cardsHTML = rows.map((row, index) => {
    const cells = [...row.children];
    const imgEl = cells[0]?.querySelector('img') || cells[0]?.querySelector('picture img');
    const title = cells[1]?.textContent?.trim() || '';
    const description = cells[2]?.innerHTML || '';
    const linkText = cells[3]?.textContent?.trim() || '';
    const linkUrl = cells[4]?.querySelector('a')?.href || cells[3]?.querySelector('a')?.href || '#';

    const imgSrc = imgEl?.src || '';
    const imgAlt = imgEl?.alt || title;

    const itemResource = `urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/cards/item_${index}`;

    if (isResourceCenter) {
      return `
        <div class="cards__card cards__card--resource"
             data-aue-resource="${itemResource}" data-aue-type="component"
             data-aue-model="feature-card" data-aue-label="${title}">
          ${imgSrc ? `<div class="cards__card-image"><img src="${imgSrc}" alt="${imgAlt}" loading="lazy"></div>` : ''}
          <div class="cards__card-content">
            <h3 class="cards__card-title" data-aue-prop="cardTitle" data-aue-type="text" data-aue-label="Title">${title}</h3>
            <div class="cards__card-description" data-aue-prop="cardDescription" data-aue-type="richtext" data-aue-label="Description">${description}</div>
            ${linkText ? `<a class="cards__card-action" href="${linkUrl}" data-aue-prop="cardLinkText" data-aue-type="text" data-aue-label="Link Text">${linkText}</a>` : ''}
          </div>
        </div>
      `;
    }

    return `
      <div class="cards__card"
           data-aue-resource="${itemResource}" data-aue-type="component"
           data-aue-model="feature-card" data-aue-label="${title}">
        ${imgSrc ? `<div class="cards__card-image"><img src="${imgSrc}" alt="${imgAlt}" loading="lazy"></div>` : ''}
        <div class="cards__card-content">
          <h3 class="cards__card-title" data-aue-prop="cardTitle" data-aue-type="text" data-aue-label="Title">${title}</h3>
          <div class="cards__card-description" data-aue-prop="cardDescription" data-aue-type="richtext" data-aue-label="Description">${description}</div>
          ${linkText ? `<a class="cards__card-link" href="${linkUrl}" data-aue-prop="cardLinkText" data-aue-type="text" data-aue-label="Link Text">${linkText}</a>` : ''}
        </div>
      </div>
    `;
  }).join('');

  block.innerHTML = `<div class="cards__grid">${cardsHTML}</div>`;
}
