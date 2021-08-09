import 'bootstrap/dist/css/bootstrap.min.css';
import generateForm from './generate-form.js';
import validator from './validator.js';

document.body.append(generateForm());
validator();
