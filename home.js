document.getElementById('stocksBtn').addEventListener('click', () => {
  window.location.href = 'stocks.html';
});

document.getElementById('dogsBtn').addEventListener('click', () => {
  window.location.href = 'dogs.html';
});

window.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('https://zenquotes.io/api/random');
  const data = await res.json();
  document.getElementById('quoteBox').innerText = data[0].q + ' — ' + data[0].a;
});