import request from "request";

const geocode = (address, callback) => {
    const url = 'http://nominatim.openstreetmap.org/search?format=json&limit=3&q=' + address
    request({ url: url }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body === '[]') {
            callback('Unable to find location! Try another search.', undefined)
        }
        else {
            const data = JSON.parse(body)
            callback(undefined, {
                latitude: data[0].lat,
                longtitude: data[0].lon,
                location: data[0].display_name
            })
        }
    })
}

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=87853003a8a4192b8664b5ccd981fc78&query=' + lat + ',' + lon
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress out. The wind speed is '
            + body.current.wind_speed+'km/h',body.current.weather_icons[0])
        }
    })
} 

export { geocode, forecast }