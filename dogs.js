if (annyang) {
  annyang.addCommands({
    'load dog breed *breed': (breed) => {
      document.querySelectorAll('#breedButtons button').forEach(btn => {
        if (btn.innerText.toLowerCase() === breed.toLowerCase()) btn.click();
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const carousel = document.getElementById('dogCarousel');
  const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
  const images = (await res.json()).message;
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    carousel.appendChild(img);
  });

  new SimpleSlider(carousel);

  const breedRes = await fetch('https://dogapi.dog/api/v2/breeds');
  const breeds = await breedRes.json();
  const breedButtons = document.getElementById('breedButtons');

  breeds.data.forEach(b => {
    const button = document.createElement('button');
    button.innerText = b.attributes.name;
    button.classList.add('breed-btn');
    button.addEventListener('click', () => {
      const infoBox = document.getElementById('breedInfo');
      infoBox.style.display = 'block';
      document.getElementById('breedName').innerText = b.attributes.name;
      document.getElementById('breedDesc').innerText = b.attributes.description || 'No description';
      document.getElementById('lifeMin').innerText = b.attributes.life.min;
      document.getElementById('lifeMax').innerText = b.attributes.life.max;
    });
    breedButtons.appendChild(button);
  });
});