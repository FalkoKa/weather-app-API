const spanCity = document.querySelector('.city-name');
const spanWeather = document.querySelector('.weather');
const spanTemp = document.querySelector('.temperature');
const inputField = document.querySelector('input');
const submitButton = document.querySelector('button');
const form = document.querySelector('form');
const toggleTemp = document.querySelector('input[type="checkbox"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchData(inputField.value);
});

async function fetchData(city = 'Saigon') {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c7eead2865a44dbb57e7a767a1e7be4d`,
      {
        mode: 'cors',
      }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    const data = {
      name: weatherData.name,
      country: weatherData.sys.country,
      temperature: kelvinToCelcius(weatherData.main.temp),
      feelsLike: weatherData.main.feels_like,
      background: weatherData.weather[0].main,
    };
    displayData(data);
    renderBackground(data);
  } catch {
    throw new Error(`Status Code Error: ${response.status}`);
  }
}

function displayData(data) {
  spanCity.textContent = `${data.name}, ${data.country}`;
  spanTemp.innerHTML = `${data.temperature + '&degC'}`;
  spanWeather.textContent = data.background;

  toggleTemp.addEventListener('change', (e) => {
    e.preventDefault;
    if (!toggleTemp.checked) {
      spanTemp.innerHTML = `${data.temperature + '&degC'}`;
    } else {
      spanTemp.innerHTML = `${celciusToFahrenheit(data.temperature) + '&degF'}`;
    }
  });
}

function renderBackground(data) {
  if (data.background === 'Clouds') {
    document.body.style.backgroundImage = 'url("./pictures/cloudss.jpg")';
  } else if (data.background === 'Clear') {
    document.body.style.backgroundImage = 'url("./pictures/clear.jpg")';
  } else if (
    data.background === 'Rain' ||
    data.background === 'Drizzle' ||
    data.background === 'Mist'
  ) {
    document.body.style.backgroundImage = 'url("./pictures/rain.jpg")';
  } else if (data.background === 'Thunderstorm') {
    document.body.style.backgroundImage = 'url("./pictures/thunderstorm.jpg")';
  } else if (data.background === 'Snow') {
    document.body.style.backgroundImage = 'url("./pictures/snow.jpg")';
  }
}

fetchData();

// Convert Temperature
function kelvinToCelcius(temp) {
  let celcius = Math.floor(temp - 273.15);
  return celcius;
}

function celciusToFahrenheit(temp) {
  let fahrenheit = (temp * 9) / 5 + 32;
  return fahrenheit;
}
