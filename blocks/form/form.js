export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const fields = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const type = cells[0]?.textContent?.trim().toLowerCase() || 'text';
    const label = cells[1]?.textContent?.trim() || '';
    const name = cells[2]?.textContent?.trim() || label.toLowerCase().replace(/\s+/g, '-');
    const required = cells[3]?.textContent?.trim().toLowerCase() === 'true';
    const options = cells[4]?.textContent?.trim() || '';
    fields.push({
      type, label, name, required, options,
    });
  });

  block.dataset.aueResource = block.closest('[data-aue-resource]')?.dataset.aueResource
    || 'urn:aemconnection:/content/demo/us/en/digital-banking/jcr:content/form';
  block.dataset.aueType = 'container';
  block.dataset.aueModel = 'form';
  block.dataset.aueLabel = 'Form';

  const fieldsMarkup = fields.map((field) => {
    const reqAttr = field.required ? ' required' : '';
    const reqMark = field.required ? '<span class="form__required">*</span>' : '';

    switch (field.type) {
      case 'textarea':
        return `
          <div class="form__field">
            <label class="form__label" for="form-${field.name}">${field.label}${reqMark}</label>
            <textarea class="form__textarea" id="form-${field.name}" name="${field.name}"${reqAttr}></textarea>
          </div>`;
      case 'select':
        return `
          <div class="form__field">
            <label class="form__label" for="form-${field.name}">${field.label}${reqMark}</label>
            <select class="form__select" id="form-${field.name}" name="${field.name}"${reqAttr}>
              <option value="">Select...</option>
              ${field.options.split(',').map((o) => `<option value="${o.trim()}">${o.trim()}</option>`).join('')}
            </select>
          </div>`;
      case 'checkbox':
        return `
          <div class="form__field form__field--checkbox">
            <input class="form__checkbox" type="checkbox" id="form-${field.name}" name="${field.name}"${reqAttr}>
            <label class="form__label form__label--inline" for="form-${field.name}">${field.label}</label>
          </div>`;
      case 'submit':
        return `
          <div class="form__field">
            <button class="form__submit" type="submit">${field.label || 'Submit'}</button>
          </div>`;
      case 'hidden':
        return `<input type="hidden" name="${field.name}" value="${field.options}">`;
      default:
        return `
          <div class="form__field">
            <label class="form__label" for="form-${field.name}">${field.label}${reqMark}</label>
            <input class="form__input" type="${field.type}" id="form-${field.name}" name="${field.name}"${reqAttr}>
          </div>`;
    }
  }).join('');

  block.innerHTML = `<form class="form__inner">${fieldsMarkup}</form>`;
}
