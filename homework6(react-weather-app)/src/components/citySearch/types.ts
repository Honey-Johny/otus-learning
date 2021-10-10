export interface searchedCityProps {
    name: string,
}

export interface searchedCityState {
    isFavorite: boolean
}

interface searchedCity {
    name: string
}

export interface citySearchListProps {
    arr: searchedCity[]
}

export interface citySearchState {
    results: searchedCity[]
    value: string
}
