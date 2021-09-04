import { Modal } from 'bootstrap';

export default (title, link, description) => {
  const modalTitle = document.getElementById('ModalLabel');
  modalTitle.textContent = title;
  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;
  const aEl = document.querySelector('#fullArticle');
  aEl.href = link;
  Modal.getInstance(modalTitle);
};
