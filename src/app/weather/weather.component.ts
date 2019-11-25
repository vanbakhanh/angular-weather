import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const API_KEY = '8d2de98e089f1c28e1a22fc19a24ef04';
const initialState = {
  main: {
    temp: null,
    pressure: null,
    humidity: null,
    temp_min: null,
    temp_max: null
  },
  weather: {
    id: null,
    main: null,
    description: null,
    icon: null
  },
  wind: {
    speed: null,
    deg: null
  },
  coord: {
    lat: null,
    lon: null
  },
  id: null,
  date: null,
  name: null,
  country: null,
  sunrise: null,
  sunset: null,
  visibility: null,
  clouds: null,
  error: null,
  background: null
};

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  title = 'angular-weather';
  state = initialState;
  searchForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      city: 'Da Lat',
    });
  }

  ngOnInit() {
    var hours = new Date().getHours();
    if (hours >= 6 && hours < 18) {
      this.state.background = 'default-day'
    } else {
      this.state.background = 'default-night'
    }
  }

  getBackground() {
    var hours = new Date(this.state.date * 1000).getHours();
    if (hours >= 6 && hours < 12) {
      return 'day';
    } else if (hours >= 12 && hours < 18) {
      return 'noon';
    } else if (hours >= 18 && hours < 24) {
      return 'night';
    } else {
      return 'evening';
    }
  }

  getWeather = async (value) => {
    var city = value.city;
    var data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    var response = await data.json();
    if (data.status === 200) {
      this.state = {
        main: response.main,
        weather: response.weather[0],
        wind: response.wind,
        coord: response.coord,
        id: response.id,
        date: response.dt,
        name: response.name,
        country: response.sys.country,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        visibility: response.visibility,
        clouds: response.clouds.all,
        error: null,
        background: this.getBackground(),
      };
    } else {
      this.state.error = response.message;
    }
  }

  formatDate() {
    return new Date(this.state.date);
  }

}
