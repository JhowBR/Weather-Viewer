import { Component, ReactNode } from "react";
import { OpenWeatherMap } from "../interfaces/OpenWeatherMap";
import { cityWheaterModelFormater } from "../scripts/CityWeatherModelFormater";

export interface CityWeatherModel {
    city: string,
    country: string
    temp: number,
    maxTemp: number,
    minTemp: number,
    unit: OpenWeatherMap.Unit
}

export interface CityWeatherViewModel {
    cityAndCountry: string
    temp: string
    maxTemp: string
    minTemp: string
}

export class CityWeatherView extends Component<CityWeatherModel> {
    render(): ReactNode {
        const view_model = cityWheaterModelFormater({
            city: this.props.city,
            country: this.props.country,
            temp: this.props.temp,
            minTemp: this.props.minTemp,
            maxTemp: this.props.maxTemp,
            unit: this.props.unit
        })

        return (
            <div className="cityWeatherView">
                <h3>Temperature of {view_model.cityAndCountry}</h3>
                <div className="tempContainer">
                    <span className="temp">{view_model.temp}</span>
                    <div>
                        <span className="otherTemps">{view_model.maxTemp}</span>
                        <br />
                        <span className="otherTemps">{view_model.minTemp}</span>
                    </div>
                </div>
            </div>
        )
    }
}