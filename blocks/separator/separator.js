export default function decorate(block) {
  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/separator';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'separator';
  block.dataset.aueLabel = 'Separator';

  block.innerHTML = '<hr class="separator__rule">';
}
