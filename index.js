// Your code here
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"

var weatherDiv = document.getElementById('weather-app')
var weatherSection = document.getElementById('weather')
var form = document.querySelector('form')
var cityCountry = document.createElement('h2')
var mapLink = document.createElement('a')
var weatherImage = document.createElement('img')



form.onsubmit = function(e){
    e.preventDefault()
    var searchTerm = this.search.value.trim()
    if(!searchTerm) return
    form.search.value=""
    var queryString = "?units=imperial&appid=97a1ede70f8018568a9fe55a08dff43f&q=" + searchTerm
    var fetchURL = weatherURL + queryString
    fetch(fetchURL)
    .then(function(res){
        if(res.status!==200){
            throw new Error('Location not found')
        }
        return res.json()
    })
    .then(function(weatherData){
        console.log(weatherData)
       
        weatherDiv.insertBefore(weatherSection, form)
        //Weather Display
        weatherSection.appendChild(cityCountry)
        cityCountry.textContent = weatherData.name + ", " + weatherData.sys.country
        //google maps link
        weatherSection.appendChild(mapLink)
        lat = weatherData.coord.lat
        lon = weatherData.coord.lon
        mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
        mapLink.href = mapsUrl
        mapLink.textContent = "Click to view map"
        mapLink.target = "__BLANK"
        //image
        weatherSection.appendChild(weatherImage)
        imageLink = "https://openweathermap.org/img/wn/" +weatherData.weather[0].icon + "@2x.png"
        weatherImage.src = imageLink
    })
    .catch(function(err){
        weatherDiv.appendChild(weatherSection)
        weatherSection.appendChild(cityCountry)
        cityCountry.textContent = err.message
    })
}