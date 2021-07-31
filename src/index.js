import 'bootstrap/dist/css/bootstrap.min.css';

const generateForm = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const divEl = document.createElement('div');
  divEl.classList.add('row');
  button.textContent = 'Submit';
  button.setAttribute('type', 'submit');
  divEl.append(input);
  divEl.append(button);
  form.append(divEl);
  return form;
};

document.body.append(generateForm());
