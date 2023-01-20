import { Component, ReactNode } from "react";

interface Props {
    city: string,
    country: string
    temp: number,
    maxTemp: number,
    minTemp: number,
}

export class CityWeatherView extends Component<Props> {
    render(): ReactNode {
        return (
            <div>
                <h3>Temperature of {this.props.city + ", " + this.props.country}</h3>
                <h4>{this.props.temp}</h4>
                <h4>Max: {this.props.maxTemp}</h4>
                <h4>Min: {this.props.minTemp}</h4>
            </div>
        )
    }
}