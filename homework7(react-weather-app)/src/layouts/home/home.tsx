import React from "react";
import '../../assets/styles/common.css';
import CityCard from "../../components/cityCard/cityCard";
import CitySearch from "../../components/citySearch/citySearch"
import store from "../../store";
import {cityListProps, HomeState} from "./types";

class CityList extends React.Component<cityListProps> {
    render() {
        return this.props.arr.map((city, index) => <CityCard city={city} key={`${city}-${index}`}/>)
    }
}

class Home extends React.Component<{}, HomeState> {
    constructor() {
        super({});
        this.state = {
            popularCities: ['Moscow', 'Washington', 'Peking', 'London', 'Paris', 'Berlin', 'Rome'],
            favoriteCities: store.getState().favorites
        }
        store.subscribe(() => {
            this.setState({favoriteCities: store.getState().favorites})
        })
    }
    render() {
        return(
            <div>
                <div className="container">
                    <CitySearch/>
                    <h2>Избранное</h2>
                    <CityList arr={this.state.favoriteCities}/>
                    <h2>Популярные города</h2>
                    <CityList arr={this.state.popularCities}/>
                </div>
            </div>
        )
    }
}

export default Home
