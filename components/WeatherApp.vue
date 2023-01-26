<template>
    <div>
        <header class=" mt-4">
            <a-row>
                <a-col :span="12">
                    <p>SignupWeather</p>
                </a-col>
                <a-col :span="12">

                    <a>Weather</a>
                    <a>Home</a>
                </a-col>
            </a-row>
        </header>
        <a-row class="main mt-4">
            <a-col>
                <a-row class="mt-5">
                    <a-col :span="16" :offset="4">

                        <a-input-search :Form="Form" placeholder="input search text" :loading="loader" v-model="search"
                            enter-button="Search" size="large" @search="onSearch" class="input-search" />
                    </a-col>
                </a-row>


                <a-row class="mt-5">
                    <a-col class="data-detail" :span="6" :offset="9">

                        <a-row class="mt-2 ml-2" type="flex" justify="space-between">
                            <a-col :span="14">
                                {{ weatherDetails.name }},{{ weatherDetails.country }}
                            </a-col>
                            <a-col :span="10">
                                <h3 class="text-center">{{ weatherDetails.description }} </h3>
                            </a-col>
                        </a-row>
                        <a-row class="mt-3" type="flex" justify="center">
                            <a-col v-show="truevalue" :span="8">
                                <h4>Humidity </h4>
                            </a-col>
                            <a-col v-show="truevalue" :span="6">
                                <h4>Cloudy</h4>
                            </a-col>
                            <a-col v-show="truevalue" :span="8">
                                <h4>Wind Speed </h4>
                            </a-col>
                        </a-row>
                        <a-row v-show="truevalue" class="" type="flex" justify="center">
                            <a-col :span="8" :offset="2">
                                <h4>{{ weatherDetails.humidity }}</h4>
                            </a-col>
                            <a-col :span="6">
                                <h4> {{ weatherDetails.clouds }}%</h4>
                            </a-col>
                            <a-col :span="8">
                                <h4> {{ weatherDetails.speed }}m/s</h4>
                            </a-col>
                        </a-row>
                        <a-row v-show="truevalue">
                            <a-col :span="12">
                                <h1 class="font-size ml-2 text-center">{{ (weatherDetails.temp - weatherDetails.temp %
                                1) - 273}}'C</h1>
                            </a-col>
                            <a-col :span="12">
                                <img class="mt-4" v-show="cloudvalue" src="../static/cloudy.png" alt="" width="50px" />
                                <img class="mt-4" v-show="hazevalue" src="../static/haze.png" alt="" width="50px" />
                                <img class="mt-4" v-show="sunvalue" src="../static/sun.png" alt="" width="50px" />
                            </a-col>
                        </a-row>









                    </a-col>
                </a-row>
            </a-col>

        </a-row>

    </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
export default {

    computed: {
        ...mapGetters("modules/weatherdata", ["weatherData"])
    },
    watch: {
        weatherData: {
            immediate: true,
            deep: true,
            handler(val) {
                // debugger
                console.log(val);
                if (val.sys) {
                    this.weatherDetails.country = val.sys.country;
                    this.weatherDetails.temp = val.main.temp;
                    this.weatherDetails.speed = val.wind.speed;
                    this.weatherDetails.humidity = val.main.humidity;
                    this.weatherDetails.description = val.weather[0].description;
                    this.weatherDetails.clouds = val.clouds.all;
                    this.weatherDetails.name = val.name;
                }
            },
        }
    },
    data() {
        return {
            loader: false,
            search: '',
            loadvalue: false,
            truevalue: false,
            hazevalue: false,
            sunvalue: false,
            cloudvalue: false,
            weatherDetails: {
                country: '',
                temp: '',
                humidity: '',
                description: '',
                clouds: '',
                speed: '',
                name: 'Please enter city name'
            }
        }
    },

    methods: {
        ...mapActions("modules/weatherdata", ["serchCity"]),
        async onSearch(value) {
            this.loader = true
            if (value) {
                try {
                    this.loadvalue = true
                    await this.serchCity(value);
                    this.loader = false
                    this.truevalue = true
                    console.log(value);
                    if (this.weatherDetails.description == "clear sky") {
                        this.hazevalue = false
                        this.sunvalue = true
                        this.cloudvalue = false
                    } else if (this.weatherDetails.description == "haze") {
                        this.hazevalue = true
                        this.sunvalue = false
                        this.cloudvalue = false
                    }
                    else {
                        this.hazevalue = false
                        this.sunvalue = false
                        this.cloudvalue = true
                    }
                } catch (error) {
                    this.loader = false
                    this.$notification.error({
                        message: 'City not found',
                    });
                }

            }
            else {
                this.loader = false
                this.$notification.error({
                    message: 'Enter City Name please',
                });

            }



        },
    },
}
</script>

<style lang="scss">
@import "@/assets/global/shortHandClasses.scss";

body {
    background: black;
    height: 100vh;
    width: 100%;
}

p,
h1,
h3,
h4 {
    color: white;
}

a {
    color: white;
    text-decoration: none;
    float: right !important;
    padding: 5px;

}

.icon {
    background: white;
}

header {
    width: 80%;
    margin: auto;
}

.main {
    background: white;
    width: 80%;
    margin: auto;
    height: 80vh;
}

.data-detail {
    background: black;
    color: white;
    width: 30%;
    height: 40vh;
    border-radius: 10px;
}

</style>