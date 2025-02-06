const countryName = new URLSearchParams(location.search).get('name')
const darkMode = document.querySelector('#dark-mode');
const countryElement = document.querySelector('.country-detail')
const borderCountry = document.querySelector('#Border-country')
let nativeNames = ''
let currency = ''
let languages =''
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((country) => {
    countryElement.innerHTML='';
    // console.log(country[0])
    if(country[0].name.nativeName){
        nativeNames = Object.values(country[0].name.nativeName)
        // console.log(nativeNames)
    }
    else{
        nativeNames = country[0].name.common
    }
    if(country[0].currencies){
        currency = Object.values(country[0].currencies).map((currency)=> currency.name).join(', ')
    }
    else{
        currency = 'No Currency'
    }
    if(country[0].languages){
        languages= Object.values(country[0].languages).join(', ')
    }
    const details = `
    <img src=${country[0].flags.svg} alt="">
    <div class="details-text-container">
        <h1>${country[0].name.common}</h1>
        <div class="details-text">
            <p><b>Native Name:</b> ${nativeNames[0].official}</p>
            <p><b>Population</b>:${country[0].population.toLocaleString('en-In')}</p>
            <p><b>Region</b>: ${country[0].region}</p>
            <p><b>Sub Region</b>: ${country[0].subregion}</p>
            <p><b>Capital</b>: ${country[0].capital}</p>
            <p><b>Top Level Domain</b>: ${country[0].tld.join(' ,')}</p>
            <p><b>Currency</b>: ${currency}</p>
            <p><b>Language</b>: ${languages}</p>
        </div>
    </div>
`
countryElement.innerHTML = details
if(country[0].borders){
    country[0].borders.forEach((border) => {
        // console.log(border)
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data[0])
            const borderCountries = document.createElement('a')
            borderCountries.innerText = data[0].name.common
            borderCountries.href = `country.html?name=${data[0].name.common}`
            borderCountry.append(borderCountries)
        })
    });
} 
})
darkMode.addEventListener('click',()=>{
    document.querySelector('body').classList.toggle('body-dark')
    document.querySelector('main').classList.toggle('main-dark')
    document.querySelector('#back-btn').classList.toggle('body-dark')

    const borderTag = document.querySelectorAll('#Border-country a');
    borderTag.forEach((tag) => tag.classList.toggle('body-dark'))
})