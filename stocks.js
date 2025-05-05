document.getElementById('lookupBtn').addEventListener('click', fetchStockData);

if (annyang) {
  annyang.addCommands({
    'lookup *ticker': (ticker) => {
      document.getElementById('tickerInput').value = ticker;
      document.getElementById('rangeSelect').value = '30';
      fetchStockData();
    }
  });
}

async function fetchStockData() {
  const ticker = document.getElementById('tickerInput').value;
  const range = document.getElementById('rangeSelect').value;
  const apiKey = 'zItZ6rewL7hZBY8C_F6SkSyMCdjRTpdI'; // Replace with your key
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - parseInt(range));
  const toStr = toDate.toISOString().split('T')[0];
  const fromStr = fromDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/range/1/day/${fromStr}/${toStr}?adjusted=true&sort=asc&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  const dates = data.results.map(d => new Date(d.t).toLocaleDateString());
  const prices = data.results.map(d => d.c);

  new Chart(document.getElementById('stockChart'), {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: `${ticker.toUpperCase()} Closing Prices`,
        data: prices,
        fill: false,
        borderColor: 'blue'
      }]
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
  const topFive = (await res.json()).slice(0, 5);

  const table = document.getElementById('redditTableBody');
  topFive.forEach(stock => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
      <td>${stock.no_of_comments}</td>
      <td>${stock.sentiment === 'Bullish' ? '🐂' : '🐻'}</td>
    `;
    table.appendChild(row);
  });
});