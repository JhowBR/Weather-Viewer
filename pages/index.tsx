import { Component, ReactNode } from "react"
import { OpenWeatherMap } from "../interfaces/OpenWeatherMap"
import { CityWeatherView } from "../components/CityWeatherView"
import { UserInputsView } from "../components/UserInputsView"

const API_KEY = '08f82dfbbe70f4dcda9de8d5499ea392'

interface State {
    isLoading: boolean

    // User Inputs
    placeInputValue: string
    temperatureUnit: OpenWeatherMap.Unit

    // Fetched Data
    cityName: string
    countryName: string
    temp: number
    maxTemp: number
    minTemp: number
}

export default class Home extends Component<null, State> {

    constructor(params) {
        super(params)

        this.state = {
            isLoading: true,
            temperatureUnit: OpenWeatherMap.Unit.CELSIUS,
            cityName: "None",
            countryName: "",
            temp: 0,
            minTemp: 0,
            maxTemp: 0,
            placeInputValue: "Curitiba"
        }

        this.submit("Curitiba", OpenWeatherMap.Unit.CELSIUS)
    }

    // Children prop callbacks

    private handleTemperatureUnitChange = (unit: OpenWeatherMap.Unit) => this.submit(this.state.placeInputValue, unit)

    private handlePlaceValueChange = (text: string) => this.setState({placeInputValue: text})

    private handleSubmit = () => this.submit(this.state.placeInputValue, this.state.temperatureUnit)

    private submit = async (placeValue: string, tempUnit: OpenWeatherMap.Unit) => {

        console.log(`[REQUESTING] Place: ${ placeValue }; Temp unit: ${ tempUnit }`)

        try {
            this.setLoading(true)
            const res_data = await this.fetchData(placeValue, tempUnit)
            const new_state = this.parseDataToState(res_data, placeValue, tempUnit)
            this.setState(new_state)
        }
        catch (error) {
            const error_msg = 'Error while fetching data: ' + error
            console.error(error_msg)
            alert(error_msg)
        }
        finally {
            this.setLoading(false)
        }
    }

    private setLoading(loading: boolean) {
        if (this.state.isLoading !== loading)
            this.setState({isLoading: loading})
    }

    private async fetchData(placeInput: string, temperatureUnit: OpenWeatherMap.Unit) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeInput}&APPID=${API_KEY}&units=${temperatureUnit}`
        const response = await fetch(url) // GET
        
        if (!response.ok)
            throw response.statusText
        
        const res_data: OpenWeatherMap.Root = await response.json()
        
        if (!res_data)
            throw "Data was not loaded"
        
        return res_data
    }

    private parseDataToState(data: OpenWeatherMap.Root, place:string, unit: OpenWeatherMap.Unit) : State {
        return {
            isLoading: false,
            placeInputValue: place,
            temperatureUnit: unit,
            cityName: data.name,
            countryName: data.sys.country,
            temp: data.main.temp,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
        }
    }
    
    render (): ReactNode {
        return (
            <div className="container">                    
                <UserInputsView
                initialTempUnit={this.state.temperatureUnit}
                initialPlaceInputValue={this.state.placeInputValue}
                handlePlaceValueChange={this.handlePlaceValueChange}
                handleTempUnitChange={this.handleTemperatureUnitChange}
                handleSubmit={this.handleSubmit}
                />
                
                {this.state.isLoading ?
                    <p className="loadingP">Loading data...</p> :
                    <CityWeatherView
                    city={this.state.cityName}
                    country={this.state.countryName}
                    temp={this.state.temp}
                    maxTemp={this.state.maxTemp}
                    minTemp={this.state.minTemp}
                    unit={this.state.temperatureUnit}
                    />
                }
            </div>
        )
    }
}

