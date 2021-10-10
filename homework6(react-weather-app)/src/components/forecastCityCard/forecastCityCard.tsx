import React from "react";
import '../forecastCityCard/forecast-city-card.css'
import {properties, state} from "./types";
import store from "../../store";


class ForecastCityCard extends React.Component<properties, state>{
    humanizeDay: any
    constructor(props: properties) {
        super(props);
        this.state = {
            isFavorite: false
        }
        this.humanizeDay = (day: string) => {
            const dict = {
                '01': 'января',
                '02': 'февраля',
                '03': 'марта',
                '04': 'апреля',
                '05': 'мая',
                '06': 'июня',
                '07': 'июля',
                '08': 'августа',
                '09': 'сентября',
                '10': 'октября',
                '11': 'ноября',
                '12': 'декабря',
            }
            const arr = day.split('-')
            // @ts-ignore
            return `${arr[2]} ${dict[arr[1]]}`
        }
    }
    render() {
        return(
            <div>

                    <div className="forecast-card">
                        <div className="forecast-card-title">{this.humanizeDay(this.props.date)}</div>
                        {this.props.hour.map((hour, index) => <div key={`${hour}-${index}`}>
                            <div style={{fontSize: '15px', fontWeight: 500}}>{hour.time.split(' ')[1]}</div>
                            <div className="forecast-card__weather-container">
                                <div className="city-card__temp">
                                    <img src={`https:${hour.condition.icon}`}/>
                                    <div>{`${hour.temp_c > 0 ? '+' : '-'} ${hour.temp_c}°`}</div>
                                </div>
                                <div className="city-card__wind">
                                    <div style={{transform: `rotate(${180 + hour.wind_degree}deg)`}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid" viewBox="0 0 11 11"><defs/><path d="M5.5 1L9 10 5.5 7.796 2 10z" fill="#333"/></svg>
                                    </div>
                                    <div>{hour.wind_dir}</div>
                                    <div>{hour.wind_mph} mi/h</div>
                                </div>
                            </div>

                        </div>)}
                    </div>

            </div>
        )
    }
}

export default ForecastCityCard
