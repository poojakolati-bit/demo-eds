export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const config = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const [keyCell, valueCell] = cells;
      const key = keyCell.textContent.trim().toLowerCase();
      config[key] = valueCell;
    }
  });

  const url = config.url?.querySelector('a')?.href || config.url?.textContent?.trim() || '';
  const html = config.html?.innerHTML || '';
  const type = config.type?.textContent?.trim()?.toLowerCase() || 'url';

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/embed';
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'embed';
  block.dataset.aueLabel = 'Embed';

  if (type === 'html' && html) {
    block.innerHTML = `<div class="embed__wrapper">${html}</div>`;
  } else if (url) {
    // Auto-detect YouTube/Vimeo for responsive embed
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

    if (youtubeMatch) {
      block.innerHTML = `
        <div class="embed__wrapper embed__wrapper--video">
          <iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen loading="lazy" title="Embedded video"></iframe>
        </div>`;
    } else if (vimeoMatch) {
      block.innerHTML = `
        <div class="embed__wrapper embed__wrapper--video">
          <iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen loading="lazy" title="Embedded video"></iframe>
        </div>`;
    } else {
      block.innerHTML = `
        <div class="embed__wrapper">
          <iframe src="${url}" frameborder="0" loading="lazy" title="Embedded content"></iframe>
        </div>`;
    }
  }
}
