export default () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const divContainer = document.createElement('div');
  const labelEl = document.createElement('label');
  divContainer.classList.add('row');

  labelEl.setAttribute('for', 'url-input');
  labelEl.textContent = 'Ссылка RSS';

  form.classList.add('rss-form', 'text-body');

  input.classList.add('form-control', 'w-100');
  input.setAttribute('id', 'url-input');
  input.setAttribute('aria-label', 'url');
  input.setAttribute('name', 'url');
  input.setAttribute('placeholder', 'ссылка RSS');

  button.textContent = 'Submit';
  button.setAttribute('type', 'submit');
  button.setAttribute('aria-label', 'add');
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');

  const divInput = document.createElement('div');
  divInput.classList.add('col');
  const divFormFloating = document.createElement('div');
  divFormFloating.classList.add('form-floating');
  divFormFloating.append(input);
  divFormFloating.append(labelEl);
  divInput.append(divFormFloating);

  const divButton = document.createElement('div');
  divButton.classList.add('col-auto');
  divButton.append(button);

  divContainer.append(divInput);
  divContainer.append(divButton);
  form.append(divContainer);
  return form;
};
