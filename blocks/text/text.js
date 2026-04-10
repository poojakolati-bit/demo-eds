export default function decorate(block) {
  const content = block.querySelector(':scope > div > div')?.innerHTML || block.innerHTML;

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/text';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'text';
  block.dataset.aueLabel = 'Text';

  block.innerHTML = `
    <div class="text__body"
         data-aue-prop="text"
         data-aue-type="richtext"
         data-aue-label="Text Content">${content}</div>
  `;
}
