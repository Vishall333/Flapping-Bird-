const API_TOKEN = 'a9465ce2914a4f99c7e0f79cfdba3719';

document.getElementById('searchBtn').addEventListener('click', () => {
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const depart = document.getElementById('depart').value;

  if (!origin || !destination || !depart) {
    alert('Please fill all fields');
    return;
  }

  const url = `https://api.travelpayouts.com/v2/prices/latest?origin=${origin}&destination=${destination}&depart_date=${depart}&token=${API_TOKEN}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const results = document.getElementById('results');
      results.innerHTML = '';

      if (data.data && data.data.length > 0) {
        data.data.forEach(flight => {
          const div = document.createElement('div');
          div.className = 'result-card';
          div.innerHTML = `
            <p><strong>Price:</strong> $${flight.price}</p>
            <p><strong>Airline:</strong> ${flight.airline}</p>
            <p><strong>Flight:</strong> ${flight.flight_number}</p>
            <p><strong>Departure:</strong> ${flight.departure_at}</p>
            <p><strong>Return:</strong> ${flight.return_at}</p>
            <a href="https://www.travelpayouts.com/" target="_blank">Book Now</a>
          `;
          results.appendChild(div);
        });
      } else {
        results.innerHTML = '<p>No flights found for this route.</p>';
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('results').innerHTML = '<p>Error fetching data.</p>';
    });
});
