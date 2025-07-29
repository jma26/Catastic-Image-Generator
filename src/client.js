const button = document.getElementsByClassName('hero-content__button')[0];

button.addEventListener('click', () => {
  fetchImage();
});

async function fetchImage() {
  console.log('Fetching image...');
  fetch(`${process.env.API_HOST}/api/cat-image`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (!data || data.length === 0) {
      throw new Error('Data payload not received');
    }
    console.log('This is the payload', data);
    const imageUrl = data.url;
    const imageHeight = data.height;
    const imageWidth = data.width;
  })
  .catch(error => {
    console.error('Error', error);
  })
}