document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "41f6003502cf1330dfd79536fc48103f"; // Replace with your OpenWeatherMap API key
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const forecastList = document.getElementById("forecast-list");
  
    getWeatherBtn.addEventListener("click", () => {
      const cityName = cityInput.value.trim();
      if (cityName) {
        fetchCurrentWeather(cityName);
        fetchWeatherForecast(cityName);
      } else {
        alert("Please enter a city name.");
      }
    });
  
    // Fetch current weather for the city
    function fetchCurrentWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            // Handle city not found
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "Error fetching weather data");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Log the response to inspect its structure
          const { name } = data;
          const { temp } = data.main;
          const { description } = data.weather[0];
  
          locationElement.textContent = `Location: ${name}`;
          temperatureElement.textContent = `Temperature: ${temp}°C`;
          descriptionElement.textContent = `Description: ${description}`;
        })
        .catch((error) => {
          locationElement.textContent = "Error: Unable to fetch weather.";
          temperatureElement.textContent = "";
          descriptionElement.textContent = "";
          console.error("Error:", error.message); // Log the specific error message
        });
    }
  
    
  });
  