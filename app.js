const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const query = req.body.cityName
    const apiKey = "53bbf67e10f3d655a28c9cc8051cc4ae"
    const unitsType = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unitsType + "&lang=en&appid=" + apiKey + " "

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const weatherDescription = weatherData.weather[0].description
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celsius.</h1>")
            res.write("<img src=" + imageUrl + ">")
            res.send()
        })
    })

})

app.listen(3000, function() {
    console.log("Server running on port 3000.")
})