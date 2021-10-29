<template>
  <div id="sidebar" class="sidebar">
    <div id="search">
      <input
        id="location-input"
        type="text"
        ref="input"
        placeholder="Location?"
      />
      <button id="search-btn">
        <img src="../assets/search.svg" width="24" height="24" />
      </button>
    </div>
    <div id="info">
      <div class="wrapper-left">
        <div id="current-weather">
          {{ currentWeather.temp }}
          <span>°C</span>
        </div>
        <div id="weather-desc">{{ currentWeather.summary }}</div>
        <div class="temp-max-min">
          <div class="max-desc">
            <div id="max-detail">
              <i>▲</i>
              {{ currentWeather.todayHighLow.todayTempHigh }}
              <span>°C</span>
            </div>
            <div id="max-summary">
              at {{ currentWeather.todayHighLow.todayTempHighTime | formatHMA}}
            </div>
          </div>
          <div class="min-desc">
            <div id="min-detail">
              <i>▼</i>
              {{ currentWeather.todayHighLow.todayTempLow }}
              <span>°C</span>
            </div>
            <div id="min-summary">
              at {{ currentWeather.todayHighLow.todayTempLowTime | formatHMA}}
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="date-time-info">
          <div id="date-desc">
            <img src="../assets/calendar.svg" width="20" height="20" />
            {{ currentWeather.time | formatMDDY}}
          </div>
        </div>
        <div class="location-info">
          <div id="location-desc">
            <img
              src="../assets/location.svg"
              width="10.83"
              height="15.83"
              style="opacity: 0.9"
            />
            {{ currentWeather.full_location }}
            <div id="location-detail" class="mt-1">
              Lat: {{ currentWeather.formatted_lat }}°N
              <br />
              Long: {{ currentWeather.formatted_long }}°W
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["currentWeather"],
  data() {
    return {
      
    };
  },
  
};
</script>
