import axios from 'axios';

const weatherApi = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    headers: { 'Content-Type': 'application/json' }
});

const key = "245bff99677543cf81d92901210409"

export default {
    async getCurrentWeather(city){
        try {
            return await weatherApi.get('/current.json', { params: {
                key: key,
                lang: 'ru',
                q: city
            } });
        } catch (error) {
            throw error;
        }
    },
    async searchCities(query){
        try {
            return await weatherApi.get('/search.json', { params: {
                    key: key,
                    q: query
                } });
        } catch (error) {
            throw error;
        }
    }
}
