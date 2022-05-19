import {useState,useEffect} from "react";
import axios from "axios"
import "./App.css";


function WeatherApp(){

const[weatherData,setWeatherData]=useState({});
const[city,setCity]=useState('');

const weatherApi={
  url:"https://api.openweathermap.org/data/2.5/",
  key:"822fc8446f5adc72ac8c766a871329a8"
}

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  const submit = e => {
    if(e.key==="Enter"){
      axios.get(`${weatherApi.url}weather?q=${city}&units=metric&APPID=${weatherApi.key}`)
        .then(result => {
          setWeatherData(result.data);
          setCity('');
          console.log(result.data);
        });
    }
    }
  return (
    <div>
    
<nav class="navbar bg-warning">
  <div class="container-fluid">
    <h1 class="navbar-brand"><i class="fa-solid fa-cloud-sun"></i> Live-WeatherApp</h1>

      <input class="form-control me-2" 
      type="search" 
      placeholder="Search City.." 
      aria-label="Search"
      value={city}
      onChange={e=>setCity(e.target.value)}
      onKeyPress={submit}
      />
  </div>
</nav>

{(typeof weatherData.main != "undefined") ?
   (weatherData.weather[0].main =="Clear")?
   <div className="clear" style={{"width":"100%"}}>
  <div class="container">
<div class="card p-2" style={{"width":"50%","margin":"0 auto","height":"78vh"}}>
<img src="https://static.vecteezy.com/system/resources/previews/002/596/183/large_2x/blue-sky-and-clouds-wallpaper-background-and-sunny-day-free-photo.jpg" class="card-img-top p-3" alt="..." style={{"max-width":"80rem","height":"200px"}} />
  <div class="card-body">
    <h1 class="card-title">{weatherData.main.temp}  &deg;C <span class="mx-4">{weatherData.weather[0].main} &nbsp;<i class="fa-solid fa-cloud-sun"></i>   </span></h1>
      <h2 class="card-text">{weatherData.name} ,{weatherData.sys.country}</h2>
    <h5 class="card-title">{weatherData.weather[0].description} </h5>
    <p class="card-text"><small class="text-muted">{dateBuilder(new Date())}</small></p>
        <h5 class="card-title">{weatherData.coord.lat},{weatherData.coord.lon} </h5>
  </div>
  </div>
  </div>
    </div>
    :
   <div className="clouds" style={{"width":"100%"}}>
  <div class="container">
<div class="card p-2" style={{"width":"50%","margin":"0 auto","height":"78vh"}}>
<img src="https://media.istockphoto.com/photos/transparent-umbrella-under-rain-against-water-drops-splash-background-picture-id1257951336?k=20&m=1257951336&s=612x612&w=0&h=KMMSYxYzjtqg7NAvNTO8ahMz84J7QW0FjvMSZ12Bq6I=" class="card-img-top p-3" alt="..." style={{"max-width":"80rem","height":"200px"}} />
  <div class="card-body">
    <h1 class="card-title">{weatherData.main.temp}  &deg;C <span class="mx-4">{weatherData.weather[0].main} &nbsp;<i class="fa-solid fa-cloud-rain"></i>   </span></h1>
      <h2 class="card-text">{weatherData.name} ,{weatherData.sys.country}</h2>
    <h5 class="card-title">{weatherData.weather[0].description} </h5>
    <p class="card-text"><small class="text-muted">{dateBuilder(new Date())}</small></p>
  <h5 class="card-title">{weatherData.coord.lat},{weatherData.coord.lon} </h5>
  </div>
  </div>
  </div>
    </div>

: (
<h1>Welcome to Live-WeatherApp !</h1>)
}

<div className="footer"><h2>Developed by: Mohammed Tayibulla</h2></div>
</div>
    )
}

export default WeatherApp;