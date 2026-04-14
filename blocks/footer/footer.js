export default async function decorate(block) {
  // UE attributes on the footer block
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/footer';
  block.dataset.aueType = 'component';
  block.dataset.aueLabel = 'Footer';

  block.innerHTML = `
    <div class="footer__inner">
      <p>&copy; ${new Date().getFullYear()} Bank of America Corporation. All rights reserved.</p>
    </div>
  `;
}
