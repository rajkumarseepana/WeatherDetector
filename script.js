// Selecting DOM elements
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location .location");
const dateandTimeField = document.querySelector(".time_location .date_time");
const conditionField = document.querySelector(".condition .condition_text");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

// WeatherAPI API Key
const apiKey = "d7c5886699324dcdb84162430241411";

// Initial location target
let target = 'Srikakulam';

// Function to fetch weather data from WeatherAPI
const fetchResults = async (targetLocation) => {
    try {
        // Construct the API URL for WeatherAPI
        const weatherUrl = `http://localhost:8080/http://api.weatherapi.com/v1/current.json?key=your-api-key&q=srikakulam&aqi=no`;

        let res = await fetch(weatherUrl);

        // Handle response for invalid city names
        if (!res.ok) {
            throw new Error('Location not found. Please check the city name.');
        }

        const data = await res.json();

        // Extract and assign weather data
        const locationName = data.location.name;
        const temp = data.current.temp_c; // Temperature in Celsius
        const condition = data.current.condition.text; // Weather condition description
        const time = new Date().toLocaleString(); // Get current time

        // Update the UI with fetched data
        updateDetails(temp, locationName, time, condition);

        // Change background based on location
        changeBackground(locationName);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error: ' + error.message);
    }
};

// Function to update weather details on the page
function updateDetails(temp, locationName, time, condition) {
    const [splitDate, splitTime] = time.split(', ');
    const currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp} °C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${currentDay}, ${splitDate} ${splitTime}`;
    conditionField.innerText = condition;

    // Highlight the weather container
    const weatherContainer = document.querySelector('.weather_container');
    weatherContainer.classList.add('highlight');

    // Remove highlight after 2 seconds
    setTimeout(() => {
        weatherContainer.classList.remove('highlight');
    }, 2000);
}

// Function to handle search input and fetch new weather data
function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResults(target); // Fetch weather for the entered location
    } else {
        alert('Please enter a location');
    }
}

// Function to get the name of the day based on the day number (0-6)
function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}

// Function to update the background based on the specified location
const changeBackground = (location) => {
    const container = document.querySelector('.container');
    container.classList.remove('default-bg', 'other-location-bg');

    if (location.toLowerCase() === 'srikakulam') {
        container.classList.add('default-bg'); // Default background
    } else {
        container.classList.add('other-location-bg'); // Background for other locations
    }
};

// Event listener for the search form
form.addEventListener('submit', searchForLocation);

// Initial fetch with default location
fetchResults(target);
