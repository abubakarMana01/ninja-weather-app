const form = document.querySelector('form');
const searchField = document.querySelector('#searchCity');
const cityName = document.querySelector('.info-text h3');
const text = document.querySelector('.info-text p');
const temperature = document.querySelector('.info-text h2');
const icon = document.querySelector('.icon img');
const timeImg = document.querySelector('.time-img');
const informationContainer = document.querySelector('.information');

const apiKey = '67zHOcZmBn15X5Lb5BCU4z7sLpwP96HA';

form.addEventListener('submit', e => {
	e.preventDefault();
	const userSearch = form.searchCity.value;
	getKey(userSearch, apiKey);
	form.reset();
});

function getKey(city, apiKey) {
	const base = `http://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=${apiKey}`;
	fetch(base)
		.then(response => response.json())
		.then(data => {
			const name = data[0].EnglishName;
			const cityKey = data[0].Key;
			cityName.innerHTML = name;
			getWeather(cityKey);

			return cityKey;
		})
		.catch(err => {
			console.log('An error was encountered');
		});
}

function getWeather(cityKey) {
	const base = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
	fetch(base)
		.then(response => response.json())
		.then(data => {
			const temp = data[0].Temperature.Metric.Value;
			const weatherIcon = data[0].WeatherIcon;
			const weatherText = data[0].WeatherText;
			const weatherIsDayTime = data[0].IsDayTime;

			temperature.innerHTML = temp + '&deg;C';
			text.innerHTML = weatherText;
			icon.setAttribute('src', `../src/img/icons/${weatherIcon}.svg`);
			if (weatherIsDayTime) {
				timeImg.setAttribute('src', `../src/img/day.svg`);
			} else {
				timeImg.setAttribute('src', `../src/img/night.svg`);
			}
			informationContainer.style.display = 'block';
			console.log(icon.innerHTML);
		});
}
