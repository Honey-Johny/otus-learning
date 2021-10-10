import React from "react";
import './city-card.css';
import weatherApi from '../../api'
import store from '../../store'
import {
    Link
} from "react-router-dom";
import {properties, state} from "./types";

class CityCard extends React.Component<properties, state> {
    constructor(props: properties) {
        super(props);
        this.state = {
            current: {
                condition: {
                    icon: '',
                    text: ''
                },
                temp_c: 0,
                feelslike_c: 0,
                wind_dir: '',
                wind_mph: 0,
                wind_degree: 1,
                humidity: 0
            },
            isFavorite: false
        }
        store.subscribe(() => {
            this.setState({isFavorite: store.getState().favorites.includes(this.props.city)})
        })
    }

    changeFavorites = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        store.dispatch({ type: 'favorites/add-remove', city: this.props.city })
    }

    async componentDidMount() {
        let response = await weatherApi.getCurrentWeather(this.props.city)
        this.setState({current: response.data.current});
        this.setState({isFavorite: store.getState().favorites.includes(this.props.city)})
    }


    render() {
    return(
        <Link to={`/${this.props.city.toLowerCase()}`} className="city-card">
            <div className="city-card__name">{this.props.city}</div>
            <div className="city-card__temp">
                <img src={`https:${this.state.current.condition.icon}`} alt={this.state.current.condition.text}/>
                <div>{`${this.state.current.temp_c > 0 ? '+' : '-'} ${this.state.current.temp_c}°`}</div>
            </div>
            <div className="city-card__temp-feels">{`${this.state.current.feelslike_c > 0 ? '+' : '-'} ${this.state.current.feelslike_c}°`}</div>
            <div className="city-card__wind">
                <div style={{transform: `rotate(${180 + this.state.current.wind_degree}deg)`}}>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid" viewBox="0 0 11 11"><defs/><path d="M5.5 1L9 10 5.5 7.796 2 10z" fill="#333"/></svg>
                </div>
                <div>{this.state.current.wind_dir}</div>
                <div>{this.state.current.wind_mph} mi/h</div>
            </div>
            <div className="city-card__humidity">{this.state.current.humidity} %</div>
            <div className="city-card__favorite" onClick={this.changeFavorites}>
                <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -10 511.987 511" width="34px"><defs/>
                    <path d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 001.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
                          fill={this.state.isFavorite ? '#FBE739' : '#F2F3F7'}/>
                </svg>
            </div>
        </Link>
    )
    }
}

export default CityCard
