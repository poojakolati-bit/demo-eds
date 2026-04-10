export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const slides = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgEl = cells[0]?.querySelector('img');
    const content = cells[1]?.innerHTML || '';
    slides.push({
      imgSrc: imgEl?.src || '',
      imgAlt: imgEl?.alt || '',
      content,
    });
  });

  const resource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/carousel';

  block.dataset.aueResource = resource;
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'carousel';
  block.dataset.aueLabel = 'Carousel';

  const slidesMarkup = slides.map((slide, i) => `
    <div class="carousel__slide${i === 0 ? ' carousel__slide--active' : ''}"
         role="group" aria-roledescription="slide" aria-label="Slide ${i + 1} of ${slides.length}">
      ${slide.imgSrc ? `<div class="carousel__slide-image"><img src="${slide.imgSrc}" alt="${slide.imgAlt}" loading="lazy"></div>` : ''}
      ${slide.content ? `<div class="carousel__slide-content">${slide.content}</div>` : ''}
    </div>
  `).join('');

  const indicators = slides.map((_, i) => `
    <button class="carousel__indicator${i === 0 ? ' carousel__indicator--active' : ''}"
            aria-label="Go to slide ${i + 1}" data-index="${i}"></button>
  `).join('');

  block.innerHTML = `
    <div class="carousel__track" aria-live="polite">${slidesMarkup}</div>
    <button class="carousel__btn carousel__btn--prev" aria-label="Previous slide">&#8249;</button>
    <button class="carousel__btn carousel__btn--next" aria-label="Next slide">&#8250;</button>
    <div class="carousel__indicators">${indicators}</div>
  `;

  let current = 0;
  const allSlides = block.querySelectorAll('.carousel__slide');
  const allIndicators = block.querySelectorAll('.carousel__indicator');

  function goTo(index) {
    allSlides.forEach((s) => s.classList.remove('carousel__slide--active'));
    allIndicators.forEach((ind) => ind.classList.remove('carousel__indicator--active'));
    current = (index + allSlides.length) % allSlides.length;
    allSlides[current].classList.add('carousel__slide--active');
    allIndicators[current].classList.add('carousel__indicator--active');
  }

  block.querySelector('.carousel__btn--prev').addEventListener('click', () => goTo(current - 1));
  block.querySelector('.carousel__btn--next').addEventListener('click', () => goTo(current + 1));
  allIndicators.forEach((ind) => {
    ind.addEventListener('click', () => goTo(parseInt(ind.dataset.index, 10)));
  });

  // Auto-advance every 5s
  let autoplay = setInterval(() => goTo(current + 1), 5000);
  block.addEventListener('mouseenter', () => clearInterval(autoplay));
  block.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  });
}
