const countriesContainer = document.querySelector('.countries-container')
const darkMode = document.querySelector('#dark-mode');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container')
let allCountriesData 
darkMode.addEventListener('click',()=>{
    document.querySelector('body').classList.toggle('body-dark')
    document.querySelector('main').classList.toggle('main-dark')
    
    const card = document.querySelectorAll('.country-card')
    card.forEach((cardElement)=>{
        cardElement.classList.toggle('body-dark')
    })
})
fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData = data
})

filterByRegion.addEventListener('change',()=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data){
    countriesContainer.innerHTML = ''
    data.forEach((countries) => {
        // console.log(countries.languages)
        const countryCard = document.createElement('a')
countryCard.classList.add('country-card')
countryCard.href = `/country.html?name=${countries.name.common}`
countryCard.innerHTML= `<img src=${countries.flags.svg} alt=${countries.name.common}>
                        <div class="card-text">
                            <h3 class="card-title">${countries.name.common}</h3>
                            <p><b>Population</b>: ${countries.population.toLocaleString('en-In')}</p>
                            <p><b>Region</b>: ${countries.region}</p>
                            <p><b>Capital</b>: ${countries?.capital}</p>
                        </div>
                        `
countriesContainer.append(countryCard)
    });
}
searchInput.addEventListener('input',(e)=>{
    const search =allCountriesData.filter((country)=>{
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCountries(search)
})