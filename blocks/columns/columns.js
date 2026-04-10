export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // UE container attributes for the columns block
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/columns';
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'columns-item';
  block.dataset.aueLabel = 'Columns';

  // Each row has 2 cells: image | content (or content | image)
  rows.forEach((row, index) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    // UE attributes for each column row
    row.dataset.aueResource = `urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/columns/item_${index}`;
    row.dataset.aueType = 'component';
    row.dataset.aueModel = 'columns-item';
    row.dataset.aueLabel = `Column ${index + 1}`;

    // Determine which cell has the image
    let imageCell;
    let contentCell;
    if (cells[0].querySelector('img') || cells[0].querySelector('picture')) {
      imageCell = cells[0];
      contentCell = cells[1];
    } else {
      imageCell = cells[1];
      contentCell = cells[0];
    }

    // Build image side
    imageCell.className = 'columns__image';
    const img = imageCell.querySelector('img');
    if (img) {
      img.loading = 'lazy';
    }

    // Build content side — add UE inline editing attribute
    contentCell.className = 'columns__content';
    contentCell.dataset.aueProp = 'columnContent';
    contentCell.dataset.aueType = 'richtext';
    contentCell.dataset.aueLabel = 'Content';

    // Wrap row
    row.className = 'columns__row';

    // Alternate layout: even rows reverse
    if (index % 2 !== 0) {
      row.classList.add('columns__row--reverse');
    }

    // Alternate background
    if (index % 2 === 0) {
      row.classList.add('columns__row--blue');
    } else {
      row.classList.add('columns__row--gray');
    }

    // Structure: image first, then content
    if (cells[0] !== imageCell) {
      row.innerHTML = '';
      row.append(imageCell, contentCell);
    }
  });

  // Handle Erica special styling (first row)
  const firstRow = block.querySelector('.columns__row');
  if (firstRow) {
    firstRow.classList.add('columns__row--erica');
  }
}
