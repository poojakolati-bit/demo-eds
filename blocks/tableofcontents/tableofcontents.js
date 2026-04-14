export default function decorate(block) {
  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/tableofcontents';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'tableofcontents';
  block.dataset.aueLabel = 'Table of Contents';

  // Scan page headings to build TOC
  const headings = document.querySelectorAll('main h2, main h3, main h4');
  const tocItems = [];

  headings.forEach((heading, i) => {
    if (!heading.id) {
      heading.id = `toc-heading-${i}`;
    }
    tocItems.push({
      text: heading.textContent.trim(),
      id: heading.id,
      level: parseInt(heading.tagName.charAt(1), 10),
    });
  });

  const items = tocItems.map((item) => `
    <li class="tableofcontents__item tableofcontents__item--h${item.level}">
      <a class="tableofcontents__link" href="#${item.id}">${item.text}</a>
    </li>
  `).join('');

  block.innerHTML = `
    <nav class="tableofcontents__nav" aria-label="Table of contents">
      <h3 class="tableofcontents__heading">Contents</h3>
      <ol class="tableofcontents__list">${items}</ol>
    </nav>
  `;
}
