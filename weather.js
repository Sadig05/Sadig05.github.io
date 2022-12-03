const API_KEY = "399c1caa155a987b83546a1c6c696e7e";

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

function getCityName(){
    if (city_name.value.trim()){
       getByCityName(city_name.value);
    } else{
        console.log("enter input");
    }
}

let lat_input = document.createElement("input");
let lon_input = document.createElement("input");
lat_input.setAttribute("type", "text");
lon_input.setAttribute("type", "text");
submit_btn_coor = document.createElement("button");
submit_btn_coor.textContent = "submit";
submit_btn_coor.setAttribute("onClick", "getLatLon()");

function getLatLon(){
    if(lat_input.value.trim() && lon_input.value.trim()){
        getData(lat_input.value, lon_input.value)
    } else{
        console.log("wrong coordinates")
    }
}

let current_loc_button = document.createElement("button");
current_loc_button.textContent = "My Location";
current_loc_button.setAttribute("onClick", "getLocation()");
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else{
        console.log("not supported")
    }
}

function getOption(){
    selected_option = document.getElementById("methods");
    output = selected_option.value;
    console.log(output)
    return output;
}

function showPosition(position){
    getData(position.coords.latitude,position.coords.longitude )
}


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

async function getData(lat, lon){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        const data = await response.json();

        // showData(data);
        // return data
    }catch (e){
        console.error(e)
    }

}

async function getByCityName(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data)
        // showData(data)
        // return data
    } catch (e){
        console.error(e)
    }

}