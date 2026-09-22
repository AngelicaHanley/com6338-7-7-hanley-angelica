// Your code here
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"



var weatherDiv = document.getElementById('weather-app')
var form = document.querySelector('form')

form.onsubmit = function(e){
    e.preventDefault()
    var searchTerm = this.search.value.trim()
    if(!searchTerm) return
    form.search.value=""
    var queryString = "?units=imperial&appid=97a1ede70f8018568a9fe55a08dff43f&q=" + searchTerm
    var fetchURL = weatherURL + queryString
    fetch(fetchURL)
    .then(function(res){
        return res.json()
    })
    .then(function(weatherData){
        console.log(weatherData)
        weatherDiv.removeChild(form)
    })
}