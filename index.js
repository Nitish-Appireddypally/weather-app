const apiKey = "b9a575c6ba917e90d58da5b6947beab1";

function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city");
    return;
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(weatherURL);
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  console.log(forecastURL);

  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    });

  fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayHourlyForecast(data.list);
      displayWeeklyWeather(data.list);
    });
}
function displayWeather(data) {
  console.log(data);
  if (data.cod === "404") {
    alert("City not found");
  } else {
    const time = document.getElementById("time");
    const weatherIcon = document.getElementById("weatherIcon");
    const tempDiv = document.getElementById("tempDiv");
    const weatherInfo = document.getElementById("weatherInfo");
    const hourlyForecast = document.getElementById("hourly-forecast");

    time.innerHTML = "";
    weatherIcon.innerHTML = "";
    tempDiv.innerHTML = "";
    weatherInfo.innerHTML = "";
    hourlyForecast.innerHTML = "";

    const cityName = data.name;
    const date = new Date(data.dt * 1000);

    const dateDay = date.getDate();
    const dayOfWeek = date.getDay();
    const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = daysList[dayOfWeek];

    const month = monthsList[date.getMonth()];
    // const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    // const minTemp=Math.round(data.main.temp_min -273.15);
    // const maxTemp=Math.round(data.main.temp_max -273.15);

    const iconCode = data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const timeHTML = ` <p>${dayName}  ${dateDay}  ${month}  </p>  
    <p>${hours} : ${minutes} </p>
    `;
    const temperatureHTML = `<p> ${temperature} °C</p>`;
    const locationHTML = `<p> <i class="fa-solid fa-location-dot"></i> ${cityName}</p>`;
    const weatherHtml = `
            <p>${description}</p>
            <p>${humidity}%</p>



        `;

    time.innerHTML = timeHTML;
    tempDiv.innerHTML = temperatureHTML;
    locationInfo.innerHTML = locationHTML;
    weatherInfo.innerHTML = weatherHtml;
    weatherIcon.src = iconURL;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  //   console.log(hourlyData);

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();
    // console.log(hour);
    const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}

function displayWeeklyWeather(data) {
  console.log(data);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

  // Initialize an array to store the forecast for the next 6 days
  const nextSixDaysForecast = [];

  // Iterate over the forecast data and filter out the forecast for the next 6 days
  // data.forEach(item => {
  // Extract the date from the forecast timestamp
  const forecastDate = new Date(data[0].dt * 1000);
  forecastDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  console.log(forecastDate.getDay());

  // Check if the forecast date is within the next 6 days
  // if (forecastDate.getDay() > today.getDay() && nextSixDaysForecast.length < 6) {
  //     console.log(forecastDate.getDay())

  //     nextSixDaysForecast.push(forecastDate.getDay());
  // }
  // });
  // console.log(nextSixDaysForecast)

  // Process and display the forecast data for the next 6 days
  // nextSixDaysForecast.forEach(dayData => {
  // const weekTime = new Date(dayData.dt * 1000); // Convert timestamp to milliseconds

  // // Process each day's forecast data as needed
  // console.log(weekTime.getDate());
  const weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log(weekList[forecastDate.getDay()]);
  // });
}

// .catch(error => {
//     console.error('Error:', error);
// });

//     const cityLat=data.coord.lat;
//     const cityLon=data.coord.lon;
//     console.log(cityLat,cityLon)
//    console.log(apiKey);

//     const weekUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

// // Fetch weather forecast data from the OpenWeatherMap API
// fetch(weekUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Extract daily forecast data for the next 6 days
//         const nextSixDaysForecast = data.daily.slice(1, 7); // Exclude today's forecast (index 0)

//         // Process and display the forecast data for the next 6 days
//         nextSixDaysForecast.forEach(dayData => {
//             // Process each day's forecast data as needed
//             console.log(dayData);
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
//}
