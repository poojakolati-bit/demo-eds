/**
 * Container Component Block — EDS equivalent of AEM container-component.
 * Provides layout variants: cards (3-col grid), split (50/50), centered, cta-banner.
 * Variant is set via block class modifier, e.g. `container-component (cards)`.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  // UE attributes
  const resource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/root/container/container';

  block.dataset.aueResource = resource;
  block.dataset.aueType = 'container';
  block.dataset.aueLabel = 'Container';

  const rows = [...block.querySelectorAll(':scope > div')];

  // Determine variant from block class (cards, split, centered, cta-banner)
  const isCards = block.classList.contains('cards');
  const isSplit = block.classList.contains('split');
  const isCtaBanner = block.classList.contains('cta-banner');

  if (isCards) {
    // 3-column card grid: wrap children in a grid container
    const grid = document.createElement('div');
    grid.className = 'container-component__grid';
    rows.forEach((row) => {
      row.classList.add('container-component__grid-item');
      grid.append(row);
    });
    block.append(grid);
  } else if (isSplit) {
    // 50/50 split layout: first child = image, second = content
    rows.forEach((row, index) => {
      const cells = [...row.children];
      if (cells.length >= 2) {
        const imageCell = cells[0].querySelector('img') ? cells[0] : cells[1];
        const contentCell = cells[0].querySelector('img') ? cells[1] : cells[0];
        imageCell.className = 'container-component__split-image';
        contentCell.className = 'container-component__split-content';
        row.className = 'container-component__split-row';
        if (index % 2 !== 0) {
          row.classList.add('container-component__split-row--reverse');
        }
        row.innerHTML = '';
        row.append(imageCell, contentCell);
      }
    });
  } else if (isCtaBanner) {
    // CTA banner: navy bar top, centered content
    const wrapper = document.createElement('div');
    wrapper.className = 'container-component__cta-inner';
    rows.forEach((row) => wrapper.append(row));
    block.append(wrapper);
  } else {
    // Default / centered: wrap in a max-width container
    const wrapper = document.createElement('div');
    wrapper.className = 'container-component__inner';
    rows.forEach((row) => wrapper.append(row));
    block.append(wrapper);
  }
}
