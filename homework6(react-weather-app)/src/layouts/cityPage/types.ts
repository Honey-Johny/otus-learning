import {hour} from '../../components/forecastCityCard/types'

export interface forecastDay{
    "date": string,
    "hour": hour[]
}

export interface state {
    isFavorite: boolean
    cityCurrentTemp: number
    citiesInfo: forecastDay[]
}
