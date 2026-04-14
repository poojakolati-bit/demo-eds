export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const tabItems = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent?.trim() || '';
    const content = cells[1]?.innerHTML || '';
    tabItems.push({ label, content });
  });

  const resource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/tabs';

  block.dataset.aueResource = resource;
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'tabs';
  block.dataset.aueLabel = 'Tabs';

  const tabNav = tabItems.map((item, i) => `
    <button class="tabs__tab${i === 0 ? ' tabs__tab--active' : ''}"
            role="tab"
            aria-selected="${i === 0}"
            aria-controls="tabpanel-${i}"
            id="tab-${i}">${item.label}</button>
  `).join('');

  const tabPanels = tabItems.map((item, i) => `
    <div class="tabs__panel${i === 0 ? ' tabs__panel--active' : ''}"
         role="tabpanel"
         id="tabpanel-${i}"
         aria-labelledby="tab-${i}"
         ${i !== 0 ? 'hidden' : ''}>${item.content}</div>
  `).join('');

  block.innerHTML = `
    <div class="tabs__list" role="tablist">${tabNav}</div>
    <div class="tabs__panels">${tabPanels}</div>
  `;

  block.querySelectorAll('.tabs__tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      block.querySelectorAll('.tabs__tab').forEach((t) => {
        t.classList.remove('tabs__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      block.querySelectorAll('.tabs__panel').forEach((p) => {
        p.classList.remove('tabs__panel--active');
        p.hidden = true;
      });
      tab.classList.add('tabs__tab--active');
      tab.setAttribute('aria-selected', 'true');
      const panel = block.querySelector(`#${tab.getAttribute('aria-controls')}`);
      if (panel) {
        panel.classList.add('tabs__panel--active');
        panel.hidden = false;
      }
    });
  });
}
