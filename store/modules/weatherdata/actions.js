import axios from 'axios';
export default {
    async serchCity({ commit },payload) {
        // debugger
       
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=5c7f05a7f3a658a3eb497b56f39e182c`)
        console.log("11", response)
        commit('Search_City', response.data)
        return response
       
    }
    }
