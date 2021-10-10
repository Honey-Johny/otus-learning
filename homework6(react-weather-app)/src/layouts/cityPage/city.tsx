import React from "react";
import {
    useParams
} from "react-router-dom";
import ForecastCityCard from "../../components/forecastCityCard/forecastCityCard";
import store from "../../store";
import {state, forecastDay} from "./types";
import './city.css'
import {cityListProps} from "../home/types";
import CityCard from "../../components/cityCard/cityCard";
import weatherApi from "../../api";


// class CityDays extends React.Component<{arr: forecastDay[] | null}> {
//     render() {
//         if(this.props.arr){
//             return this.props.arr.map((day, index) => <ForecastCityCard day={day} key={`${day}-${index}`}/>)
//         } else{
//             return null
//         }
//         //return this.props.cities.map((city, index) => <CityCard city={city} key={`${city}-${index}`}/>)
//     }
// }


class City extends React.Component<{city: string}, state> {
    constructor(props: {city: string}) {
        super(props);
        this.state = {
            isFavorite: false,
            cityCurrentTemp: 0,
            citiesInfo: []
        }

        store.subscribe(() => {
            this.setState({isFavorite: store.getState().favorites.includes(this.props.city)})
        })

    }
    async componentDidMount() {
        let response = await weatherApi.forecastWeather(this.props.city)
        //@ts-ignore
        this.setState({citiesInfo: response.data.forecast.forecastday.map(({date, hour}) => ({date: date, hour: hour}))});
        this.setState({cityCurrentTemp: response.data.current.temp_c});
        this.setState({isFavorite: store.getState().favorites.includes(this.props.city)})
    }
    render() {
        return(
            <div>
                <div className="container">
                    <h1>{`${this.props.city}`}</h1>
                    {/*<div>{this.state.citiesInfo}</div>*/}
                    <div className="forecast-card-container">
                        {this.state.citiesInfo.map((day, index) => <ForecastCityCard date={day.date} hour={day.hour} key={`${day}-${index}`}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default City
