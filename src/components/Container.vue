<template>
  <div class="row">
    <div class="col-md-3">
      <sideBar :currentWeather="currentWeather"></sideBar>
    </div>

    <div class="col-md-9">
    <br>
    <h4>Select Location</h4>
      <select v-model="locationId" class="form-control" @change="fetchWeatherData">
        <option v-for="item in locationList" :value="item.id" :key="item.id">{{ item.location }}</option>
      </select>
      <br>
      <h3>Daily Temprature</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Sr#</th>
            <th>Summary</th>
            <th>High Temprature</th>
            <th>Low Temprature</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rawWeatherData.daily.data" :key="index">
            <td>{{ index + 1 }}</td>
            <td >{{ item.summary }}</td>
            <td >{{ item.temperatureHigh }}</td>
            <td>{{ item.temperatureLow }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SideBar from "./Sidebar.vue";
import * as Axios from "axios";

export default {
  components: {
    sideBar: SideBar,
  },
  data() {
    return {
      weatherDetails: false,
      locationId:1,
      locationList:[
        {
          id:1,
          location: "Pakistan", // raw location from input
          lat: "31.5204", // raw latitude from google maps api response
          long: "74.3587",
        },
        {
          id:2,
          location: "Australia", // raw location from input
          lat: "33.8688", // raw latitude from google maps api response
          long: "151.2093",
        },
        {
          id:3,
          location: "UK", // raw location from input
          lat: "55.3781", // raw latitude from google maps api response
          long: "3.4360",
        }
      ],
      location: "", // raw location from input
      lat: "", // raw latitude from google maps api response
      long: "", // raw longitude from google maps api response
      rawWeatherData: "", // raw response from weather api
      currentWeather: {
        full_location: "Lahore pakistan", // for full address
        formatted_lat: "40.7128", // for N/S
        formatted_long: "70.006", // for E/W
        time: new Date(),
        temp: "3",
        todayHighLow: {
          todayTempHigh: "4",
          todayTempHighTime: "2:00 PM",
          todayTempLow: "1",
          todayTempLowTime: "7:00 AM",
        },
        summary: "Mostly Cloudy",
        possibility: "",
      },
      maxTemp: 0,
      maxTime: 0,
      minTemp: 9999,
      minTime: 0,
    };
  },
  methods: {
    findMaxTemprature(hourlyTemp) {
      hourlyTemp.forEach((res) => {
        if (this.maxTemp <= res.temperature) {
          this.maxTemp = res.temperature;
          this.maxTime = res.time;
        }

        if (this.minTemp >= res.temperature) {
          this.minTemp = res.temperature;
          this.minTime = res.time;
        }
      });
    },
    fetchWeatherData: function () {
      var lat=0;
      var long=0
      this.locationList.filter(res=>res.id==this.locationId)
      .forEach(el=>{
        lat=el.lat
        long=el.long
      })
      Axios.get(
        "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=darksky&lat="+lat+"&long="+long
      ).then((res) => {
        if (res.status == 200) {
          this.rawWeatherData = res.data;
          this.findMaxTemprature(this.rawWeatherData.hourly.data);
          this.currentWeather = {
            full_location: this.rawWeatherData.timezone, // for full address
            formatted_lat: this.rawWeatherData.latitude, // for N/S
            formatted_long: this.rawWeatherData.longitude, // for E/W
            time: new Date(),
            temp: this.rawWeatherData.currently.temperature.toString(),
            todayHighLow: {
              todayTempHigh: this.maxTemp,
              todayTempHighTime: new Date(this.maxTime),
              todayTempLow: this.minTemp,
              todayTempLowTime: new Date(this.minTime),
            },
            summary: this.rawWeatherData.currently.summary,
            possibility: "",
          };
        }
      });
    },
  },
  mounted: function () {
    this.fetchWeatherData();
    // function body here
  },
};
</script>

<style></style>
