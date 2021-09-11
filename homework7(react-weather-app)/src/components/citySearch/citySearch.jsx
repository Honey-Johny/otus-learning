import React from "react";
import weatherApi from '../../api'
import {Link} from "react-router-dom";
import './city-search.css'
import store from "../../store";


class SearchedCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false
        }
        store.subscribe(() => {
            this.setState({isFavorite: store.getState().favorites.includes(this.props.name.split(',')[0])})
        })
    }

    async componentDidMount() {

        this.setState({isFavorite: store.getState().favorites.includes(this.props.name.split(',')[0])})
    }

    changeFavorites = (e) => {
        e.preventDefault();
        store.dispatch({ type: 'favorites/add-remove', city: this.props.name.split(',')[0] })
    }
    render() {
        return (
            <Link className="searched-city" to={this.props.name.split(',')[0]?.toLowerCase()}>
                <div className="name">{this.props.name}</div>
                <div className="favorite" onClick={this.changeFavorites}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -10 511.987 511" width="24px"><defs/>
                    <path d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 001.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
                          fill={this.state.isFavorite ? '#FBE739' : '#2C3135'}/>
                </svg>
                </div>
            </Link>
        )

    }
}

class CitySearchList extends React.Component {
    render() {
        return this.props.arr.map((city, index) => <SearchedCity name={city.name} key={index.toString()}/>)
    }
}



class CitySearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            value: ''
        }

        this.search = async (e) => {
            e.preventDefault();
            let response = await weatherApi.searchCities(this.state.value)
            this.setState({results: response.data})
        }

        this.handleChange = (event) => {
            this.setState({value: event.target.value});
        }
    }
    // async search() {
    //
    //     let response = await weatherApi.searchCities(this.state.value)
    //     this.setState({current: response.data})
    //     //this.setState({isFavorite: !this.state.isFavorite})
    // }

    render() {
        return(
            <div className="city-search">
                <form onSubmit={this.search}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <button type="submit" disabled={!this.state.value.length}>Искать</button>
                </form>
                <CitySearchList arr={this.state.results}/>
            </div>
        )
    }
}

export default CitySearch
