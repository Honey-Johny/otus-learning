export interface properties {
    city: string,
}

export interface state {
    current: {
        condition: {
            icon: string,
            text: string
        },
        temp_c: number,
        feelslike_c: number,
        wind_dir: '',
        wind_mph: number,
        wind_degree: number,
        humidity: number
    },
    isFavorite: boolean
}
