export default function decorate(block) {
  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/search';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'search';
  block.dataset.aueLabel = 'Search';

  block.innerHTML = `
    <form class="search__form" role="search" aria-label="Site search">
      <div class="search__input-wrapper">
        <input class="search__input" type="search" placeholder="Search..." aria-label="Search">
        <button class="search__button" type="submit" aria-label="Submit search">
          <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
      <div class="search__results" aria-live="polite" hidden></div>
    </form>
  `;
}
