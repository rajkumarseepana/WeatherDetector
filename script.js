const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location .location");
const dateandTimeField = document.querySelector(".time_location .date_time");
const conditionField = document.querySelector(".condition .condition_text");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Srikakulam';

const fetchResults = async (targetLocation) => {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=c4386896f45b4024b06163753240311&q=${targetLocation}&aqi=no`;
        
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error('Location not found');
        }

        const data = await res.json();
        
        console.log(data); // For debugging

        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
        
        // Change background based on the location
        changeBackground(locationName); 

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error: ' + error.message);

        // Default to Srikakulam if the location is not found
        fetchResults('Srikakulam');
    }
};

const changeBackground = (location) => {
    const container = document.querySelector('.container');
    container.classList.remove('default-bg', 'other-location-bg'); // Remove previous backgrounds

    // Set the background based on the location
    if (location.toLowerCase() === 'srikakulam') {
        container.classList.add('default-bg'); // Add default background
    } else {
        container.classList.add('other-location-bg'); // Add alternate background for other locations
    }
};

function updateDetails(temp, locationName, time, condition) {
    const [splitDate, splitTime] = time.split(' ');
    
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

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResults(target);
    } else {
        alert('Please enter a location');
    }
}

// Initial fetch with default location
fetchResults(target);

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}
