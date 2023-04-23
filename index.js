const container = document.querySelector(".container");
const search = document.querySelector(".search_box button");
const weatherBox = document.querySelector(".weather_box");
const weatherDetails = document.querySelector(".weather_details");
const errorCode = document.querySelector(".not_found");

search.addEventListener('click', () => {
    // api ley obtained from open weather map
    const apiKey = "68e6d48416a80e9f30581f7254de55d4";
    const city = document.querySelector(".search_box input").value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            errorCode.style.display = 'block';
            errorCode.classList.add('fadeIn');
            return;
        }

        errorCode.style.display = "none";
        errorCode.classList.remove("fadeIn");

        const image = document.querySelector('.weather_box img');
        const temperature = document.querySelector('.weather_box .temperature');
        const description = document.querySelector('.weather_box .description');
        const humidity = document.querySelector('.weather_details .humidity span');
        const wind = document.querySelector('.weather_details .wind span');

        switch (json.weather[0].main) {
          case 'Clear':
            image.src = 'images/clear.png';
            break;
          case 'Rain':
            image.src = 'images/rain.png';
            break;
          case 'Snow':
            image.src = 'images/snow.png';
            break;
          case 'Clouds':
            image.src = 'images/cloud.png';
            break;
          case 'Haze':
            image.src = 'images/mist.png';
            break;
          default:
            image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

        description.innerHTML = `${json.weather[0].description}`;

        humidity.innerHTML = `${json.main.humidity}%`;

        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});