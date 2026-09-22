// Your code here
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"

var weatherDiv = document.getElementById('weather-app')
var weatherSection = document.getElementById('weather')
var form = document.querySelector('form')
var cityCountry = document.createElement('h2')
var mapLink = document.createElement('a')
var weatherImage = document.createElement('img')
var description = document.createElement('p')
var actualTemp = document.createElement('p')
var perceivedTemp = document.createElement('p')
var lastUpdate = document.createElement('p')
var lineBreak = document.createElement('br')
var lineBreak2 = document.createElement('br')

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
        //mapLink.target = "__BLANK"
        mapLink.target = "_blank"
        //image
        weatherSection.appendChild(weatherImage)
        imageLink = "https://openweathermap.org/img/wn/" +weatherData.weather[0].icon + "@2x.png"
        weatherImage.src = imageLink
        //description and temps
        weatherSection.appendChild(description)
        weatherSection.appendChild(actualTemp)
        weatherSection.appendChild(perceivedTemp)

        description.textContent = weatherData.weather[0].description
        description.style.textTransform = "capitalize"
        weatherSection.appendChild(lineBreak)
        actualTemp.textContent = "Current: " + weatherData.main.temp +"° F"
        perceivedTemp.textContent = "Feels like: " + weatherData.main.feels_like +"° F"
        weatherSection.appendChild(lineBreak2)
        //time
        weatherSection.appendChild(lastUpdate)
        var date = new Date(weatherData.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
        })
        lastUpdate.textContent= "Last updated: "+ timeString
   
    })
    .catch(function(err){
        weatherSection.innerHTML = ""
        weatherSection.appendChild(cityCountry)
        cityCountry.textContent = err.message
    })
}