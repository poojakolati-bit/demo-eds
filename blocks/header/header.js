function buildDefaultHeader(block) {
  // UE attributes on the header block
  block.dataset.aueResource = 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/header';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'site-header';
  block.dataset.aueLabel = 'Site Header';

  block.innerHTML = `
    <header class="bofa-header">
      <div class="bofa-header__utility">
        <div class="bofa-header__utility-inner">
          <nav class="bofa-header__utility-links">
            <a href="#">bankofamerica.com</a>
            <a href="#">Log in</a>
            <a href="#">Contact us</a>
            <a href="#">En español</a>
          </nav>
        </div>
      </div>
      <div class="bofa-header__main">
        <div class="bofa-header__main-inner">
          <div class="bofa-header__logo">
            <img src="/media/bofa-logo.svg" alt="Bank of America" height="24">
          </div>
          <a href="#" class="bofa-header__cta">Get the app</a>
        </div>
      </div>
      <div class="bofa-header__subnav">
        <div class="bofa-header__subnav-inner">
          <nav class="bofa-header__nav">
            <div class="bofa-header__nav-item bofa-header__nav-item--active">
              <a href="#" class="bofa-header__nav-link">Mobile &amp; Online Banking</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Mobile Banking</a>
                <a href="#" class="bofa-header__dropdown-link">Digital/Online Banking</a>
                <a href="#" class="bofa-header__dropdown-link">ATM</a>
              </div>
            </div>
            <div class="bofa-header__nav-item bofa-header__nav-item--no-dropdown">
              <a href="#" class="bofa-header__nav-link">Erica®</a>
            </div>
            <div class="bofa-header__nav-item">
              <a href="#" class="bofa-header__nav-link">Deposit Money</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Direct Deposit</a>
                <a href="#" class="bofa-header__dropdown-link">Mobile Check Deposit</a>
              </div>
            </div>
            <div class="bofa-header__nav-item">
              <a href="#" class="bofa-header__nav-link">Pay &amp; Transfer</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Bill Pay</a>
                <a href="#" class="bofa-header__dropdown-link">Zelle®</a>
                <a href="#" class="bofa-header__dropdown-link">Transfers</a>
              </div>
            </div>
            <div class="bofa-header__nav-item">
              <a href="#" class="bofa-header__nav-link">Account Management</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Statements &amp; Documents</a>
                <a href="#" class="bofa-header__dropdown-link">Alerts</a>
              </div>
            </div>
            <div class="bofa-header__nav-item">
              <a href="#" class="bofa-header__nav-link">Card Management</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Lock/Unlock Card</a>
                <a href="#" class="bofa-header__dropdown-link">Manage Rewards</a>
              </div>
            </div>
            <div class="bofa-header__nav-item">
              <a href="#" class="bofa-header__nav-link">Resource Center</a>
              <div class="bofa-header__dropdown">
                <a href="#" class="bofa-header__dropdown-link">Security Center</a>
                <a href="#" class="bofa-header__dropdown-link">Privacy</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `;
}

function decorateHeader(block) {
  // If loaded from nav doc, transform into the BofA header structure
  const nav = block.querySelector('nav');
  if (!nav) return;

  // The nav doc should provide lists/links - transform them
  const wrapper = document.createElement('div');
  wrapper.className = 'bofa-header';

  // Build utility bar
  const utility = document.createElement('div');
  utility.className = 'bofa-header__utility';
  utility.innerHTML = `
    <div class="bofa-header__utility-inner">
      <nav class="bofa-header__utility-links">
        <a href="#">bankofamerica.com</a>
        <a href="#">Log in</a>
        <a href="#">Contact us</a>
        <a href="#">En español</a>
      </nav>
    </div>
  `;

  // Build main bar with logo + CTA
  const main = document.createElement('div');
  main.className = 'bofa-header__main';
  const logo = nav.querySelector('img') || { src: '/media/bofa-logo.svg', alt: 'Bank of America' };
  main.innerHTML = `
    <div class="bofa-header__main-inner">
      <div class="bofa-header__logo">
        <img src="${logo.src || '/media/bofa-logo.svg'}" alt="${logo.alt || 'Bank of America'}" height="24">
      </div>
      <a href="#" class="bofa-header__cta">Get the app</a>
    </div>
  `;

  wrapper.append(utility, main);
  block.innerHTML = '';
  block.append(wrapper);
}

export default async function decorate(block) {
  const resp = await fetch('/nav.html');
  if (!resp.ok) {
    // Fallback: build header inline
    block.innerHTML = '';
    buildDefaultHeader(block);
    return;
  }

  const html = await resp.text();
  const nav = document.createElement('nav');
  nav.innerHTML = html;
  block.innerHTML = '';
  block.append(nav);
  decorateHeader(block);
}
