<template>
  <div>
    <WeatherApp />
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import WeatherApp from '../components/WeatherApp.vue';
export default {
  name: 'IndexPage',
  components: {
    WeatherApp
  },
  computed: {
    ...mapGetters("modules/weatherdata", ["weatherData"])
  },
}

</script>
 


