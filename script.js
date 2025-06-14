const countriesContainer = document.querySelector('.countries-container');
const darkMode = document.querySelector('#dark-mode');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
let allCountriesData;

// Dark Mode Toggle
darkMode.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('body-dark');
    document.querySelector('main').classList.toggle('main-dark');

    const cards = document.querySelectorAll('.country-card');
    cards.forEach((cardElement) => {
        cardElement.classList.toggle('body-dark');
    });
});

// Fetch countries (name and flags only)
fetch('https://restcountries.com/v3.1/all?fields=name,flags')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data);
        allCountriesData = data;
    });

// NOTE: This region filter won't work anymore unless you use full data or a different endpoint.
// You may want to either disable or enhance it accordingly.
filterByRegion.addEventListener('change', () => {
    // Optional: Display a message that filtering is not supported with minimal fields
    alert('Region filtering requires full data. Please use the full endpoint or add the "region" field.');
});

// Render countries (name and flag only)
function renderCountries(data) {
    countriesContainer.innerHTML = '';
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`;
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
            </div>
        `;
        countriesContainer.append(countryCard);
    });
}

// Search by country name
searchInput.addEventListener('input', (e) => {
    const search = allCountriesData.filter((country) => {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    });
    renderCountries(search);
});
