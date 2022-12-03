const API_KEY = "399c1caa155a987b83546a1c6c696e7e";

//selecting html tags to access them
let input_section = document.getElementById("input");
let output_section = document.getElementById("output");
let city_name = document.createElement("input");
city_name.setAttribute("type", "text")
let city_label = document.createElement("label");
city_label.textContent = "City Name: ";
input_section.appendChild(city_label);
input_section.appendChild(city_name);
submit_btn_city = document.createElement("button");
submit_btn_city.textContent = "submit";
submit_btn_city.setAttribute("onClick", "getCityName()");
input_section.appendChild(submit_btn_city);
output_section.style.display = "none";


//gets city name from user and sends it to api
function getCityName(){
    if (city_name.value.trim()){
       getByCityName(city_name.value);
    } else{
        alert("enter input");
    }
}

//selecting html tags to access them for searching based on coordinates
let lat_input = document.createElement("input");
let lon_input = document.createElement("input");
lat_input.setAttribute("type", "text");
lon_input.setAttribute("type", "text");
submit_btn_coor = document.createElement("button");
submit_btn_coor.textContent = "submit";
submit_btn_coor.setAttribute("onClick", "getLatLon()");

//gets latitude and longitude from user and send them to api
function getLatLon(){
    if(lat_input.value.trim() && lon_input.value.trim()){
        getData(lat_input.value, lon_input.value)
    } else{
        alert("wrong coordinates")
    }
}


let current_loc_button = document.createElement("button");
current_loc_button.textContent = "My Location";
current_loc_button.setAttribute("onClick", "getLocation()");

//gets user's current location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else{
        console.log("not supported")
    }
}

function showPosition(position){
    getData(position.coords.latitude,position.coords.longitude )
}

//gets the selected search method
function getOption(){
    selected_option = document.getElementById("methods");
    output = selected_option.value;
    console.log(output)
    return output;
}

//shows the input field based on the selected search method
function showInputMethod(){
    input_section.innerHTML = "";

    if(getOption() === 'city'){
        input_section.appendChild(city_label);
        input_section.appendChild(city_name);
        input_section.appendChild(submit_btn_city);
    } else if(getOption() === 'lat_lon'){
        let lat_label = document.createElement("label");
        lat_label.textContent = "latitude";
        input_section.appendChild(lat_label)
        input_section.appendChild(lat_input)
        let lon_label = document.createElement("label");
        lon_label.textContent = "longitude";
        input_section.appendChild(lon_label)
        input_section.appendChild(lon_input)
        input_section.appendChild(submit_btn_coor);
    }
    else if(getOption() === 'current'){
        input_section.appendChild(current_loc_button)
    }
}

//selecting the output fields
let city_name_output = document.getElementById("city-name");
let country_name_output = document.getElementById("country-name");
let weather_main_output = document.getElementById("weather-main");
let weather_desc_output = document.getElementById("weather-desc");
let temperature_output = document.getElementById("temperature");
let humidity_output = document.getElementById("humidity");
let pressure_output = document.getElementById("pressure");
let wind_speed_output = document.getElementById("wind-speed");
let time = document.getElementById('local-time');

//displays the fetched data
async function showData(data){
    if(!data){
        return
    } else{
        output_section.style.display = "block";
       city_name_output.innerHTML = `city: ${data.name}`;
       country_name_output.innerHTML = `Country: ${await getCountryName(data.sys.country)}`
       weather_main_output.innerHTML = `weather: ${data.weather[0].main}`;
       weather_desc_output.innerHTML = `weather description: ${data.weather[0].description}`;
       temperature_output.innerHTML = `temperature: ${Math.floor(data.main.temp)}℃, minimum temperature: ${data.main.temp_min}℃, maximum temperature: ${data.main.temp_max}℃, feels like: ${data.main.feels_like}℃`;
       humidity_output.innerHTML = `humidity: ${data.main.humidity}%`;
       pressure_output.innerHTML = `pressure: ${data.main.pressure}`;
       wind_speed_output.innerHTML = `wind speed: ${data.wind.speed}m/s, wind direction: ${findWindDirection(data.wind.deg)}`;
       time.innerHTML = `local time: ${timeConverter(data.dt)}`;
    }
}

//based on the given degree decides the direction of a wind
function findWindDirection(deg){
    if(deg <= 90){
        return "east"
    } else if(deg <= 180){
        return  "south"
    }
    else if(deg <= 270){
        return "west"
    }else{
        return "north"
    }
}

//fetching data from api by latitude and longitude;
async function getData(lat, lon){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        const data = await response.json();

        showData(data);
        // return data
    }catch (e){
        console.error(e)
    }

}
// fetching data from api by city name;
async function getByCityName(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data)
        showData(data)
        // return data
    } catch (e){
        console.error(e)
    }

}

//based on the given country code fetches the full name of the country
async function getCountryName(code){
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await response.json();
        console.log(data[0].name.common)
        return data[0].name.common;
    }catch (e){
        console.error(e);
    }
}

function timeConverter(time){
    let new_time = new Date(time * 1000);
    return new_time.toLocaleTimeString("it-IT");
}


