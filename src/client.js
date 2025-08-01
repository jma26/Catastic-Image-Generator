const closeDialogButton = document.getElementsByClassName('data-dialog__close-button')[0];
const generateImageButton = document.getElementsByClassName('hero-content__button')[0];
const loaderContainer = document.getElementsByClassName('data-dialog__loader-container')[0];

generateImageButton.addEventListener('click', () => {
  fetchImage();
});

closeDialogButton.addEventListener('click', () => {
  loaderContainer.classList.toggle('not-loading');
  document.body.focus();
  toggleModal();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    loaderContainer.classList.toggle('not-loading');
    document.body.focus();
    toggleModal();
  }
});

async function fetchImage() {
  console.log('Fetching image...');
  fetch(`${process.env.API_URL}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('This is the payload', data);
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Data payload not received');
    }
    return setImage(data);
  })
  .catch(error => {
    console.error('Error', error);
  })
}

function setImage({ mimetype, tags, url }) {
  const imageElement = document.getElementsByClassName('data-dialog__image')[0] || document.createElement('img');
  imageElement.className = 'data-dialog__image';
  imageElement.src = url;
  imageElement.mimetype = mimetype;
  imageElement.alt = tags.join(' ');
  imageElement.onload = () => {
    appendImageToModal(imageElement);
    loaderContainer.classList.toggle('not-loading');
  }
  
  toggleModal();
}

function appendImageToModal(imageElement) {
  const figureElement = document.getElementsByClassName('data-dialog__figure')[0];
  figureElement.innerHTML = '';
  figureElement.appendChild(imageElement);
}

function toggleModal() {
  const closeModalButton = document.getElementsByClassName('data-dialog__close-button')[0];
  const modal = document.getElementsByClassName('modal')[0];

  closeModalButton.toggleAttribute('aria-hidden');
  document.body.classList.toggle('modal--open');
  modal.classList.toggle('modal--hidden');
}