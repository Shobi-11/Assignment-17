// Function to create a Bootstrap card for a country
function createCountryCard(country) {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-sm-12 mb-4";

    const cardElement = document.createElement("div");
    cardElement.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = country.name.common;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const flagImage = document.createElement("img");
    flagImage.src = country.flags.png;
    flagImage.className = "mb-2";

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital}`;
    capital.className = "key-value";

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;
    region.className = "key-value";

    const countryCode = document.createElement("p");
    countryCode.textContent = `Country Code: ${country.cca2}`;
    countryCode.className = "key-value";
    const temp = document.createElement("p");
    
    const weatherButton = document.createElement("button");
    weatherButton.className = "btn btn-primary";
    weatherButton.textContent = "Click for Weather";
    weatherButton.addEventListener("click", async () => {
        // Fetch weather data for the selected country here
        // You will need to use the OpenWeatherMap API
        let lat = country.latlng === undefined ? 'hi' : country.latlng[0];
        let lng = country.latlng === undefined ? 'hi' : country.latlng[1];
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=00fda11cf400fad84b33896ea4303e61`);
        let weatherResult = await weatherData.json();
        //alert(`Country name : ${country.name.common}Current Tempature : ${weatherResult.main.temp}`);
        temp.textContent = `Country name : ${country.name.common}Current Tempature : ${weatherResult.main.temp}`;

    });

    // Append elements to the card
    cardBody.appendChild(flagImage);
    cardBody.appendChild(capital);
    cardBody.appendChild(region);
    cardBody.appendChild(countryCode);
    cardBody.appendChild(weatherButton);
    cardBody.appendChild(temp);
    cardElement.appendChild(cardHeader);
    cardElement.appendChild(cardBody);

    card.appendChild(cardElement);

    return card;
}

function isDesiredCountry(country) {
    const desiredCountries = ["Albania", "Åland Islands", "Afghanistan"];
    
    for (const desired of desiredCountries) {
        if (country.name.common.toLowerCase() === desired.toLowerCase()) {
            return true;
        }
    }

    return false;
}


// Fetch data from the Rest Countries API
fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {
        const countries = Object.values(data);
        const row = document.querySelector(".row");
        
        // Filter and create cards for the desired countries
        const desiredCountries = countries.filter(country => { return isDesiredCountry(country)});
        desiredCountries.forEach(country => {
            const card = createCountryCard(country);
            row.appendChild(card);
        });
    })
    .catch(error => console.error(error));