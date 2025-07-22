const button = document.getElementsByClassName('hero-content__button')[0];

button.addEventListener('click', () => {
  console.log('Button clicked!');
  fetchImage();
});

async function fetchImage() {
  console.log('Fetching image...');
  fetch('/api/cat-image')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Response received', response.json());
  })
  .then(data => {
    console.log('This is the payload', data);
  })
  .catch(error => {
    console.error('Error', error);
  })
}