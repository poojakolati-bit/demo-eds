export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // UE container attributes for the accordion block
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/root/container/container/accordion_faq';
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'accordion-item';
  block.dataset.aueLabel = 'Accordion';

  const items = rows.map((row, index) => {
    const cells = [...row.children];
    const title = cells[0]?.textContent?.trim() || `Item ${index + 1}`;
    const content = cells[1]?.innerHTML || '';
    const id = `accordion-${index}`;
    const itemResource = `urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/root/container/container/accordion_faq/item_${index + 1}`;

    return `
      <div class="accordion__item"
           data-aue-resource="${itemResource}" data-aue-type="component"
           data-aue-model="accordion-item" data-aue-label="${title}">
        <h3 class="accordion__header">
          <button class="accordion__button" type="button"
                  aria-expanded="false" aria-controls="${id}-panel"
                  id="${id}-button">
            <span class="accordion__title" data-aue-prop="accordionTitle" data-aue-type="text" data-aue-label="Question">${title}</span>
            <span class="accordion__icon"></span>
          </button>
        </h3>
        <div class="accordion__panel accordion__panel--hidden"
             role="region" aria-labelledby="${id}-button" id="${id}-panel">
          <div class="accordion__panel-content" data-aue-prop="accordionContent" data-aue-type="richtext" data-aue-label="Answer">${content}</div>
        </div>
      </div>
    `;
  }).join('');

  block.innerHTML = items;

  // Wire up toggle behavior
  block.querySelectorAll('.accordion__button').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const panel = button.closest('.accordion__item').querySelector('.accordion__panel');

      // Single expansion: close all others
      block.querySelectorAll('.accordion__button').forEach((other) => {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          other.classList.remove('accordion__button--expanded');
          const otherPanel = other.closest('.accordion__item').querySelector('.accordion__panel');
          otherPanel.classList.add('accordion__panel--hidden');
        }
      });

      // Toggle current
      button.setAttribute('aria-expanded', String(!expanded));
      button.classList.toggle('accordion__button--expanded', !expanded);
      panel.classList.toggle('accordion__panel--hidden', expanded);
    });
  });
}
