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