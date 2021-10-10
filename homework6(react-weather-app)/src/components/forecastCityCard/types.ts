export interface hour {
    time: string,
    temp_c: number,
    "condition": {
        "icon": string,
    },
    "wind_degree": number
    "wind_dir": string,
    "wind_mph": number,
    humidity: number,
    "feelslike_c": number
}



export interface properties {
    "date": string,
    "hour": hour[]
}

export interface state {
    isFavorite: boolean
}


