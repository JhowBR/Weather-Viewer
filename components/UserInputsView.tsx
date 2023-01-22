import { Component, ReactNode } from "react";
import { OpenWeatherMap } from "../interfaces/OpenWeatherMap";
import TemperatureUnitSelector from "./TemperatureUnitSelector";

interface Props {
    initialPlaceInputValue: string,
    initialTempUnit: OpenWeatherMap.Unit
    handleSubmit: () => void;
    handleTempUnitChange: (selectedUnit: OpenWeatherMap.Unit) => void;
    handlePlaceValueChange: (text: string) => void;
}

export class UserInputsView extends Component<Props> {

    handlePlaceInputValueChange = (event) => this.props.handlePlaceValueChange(event.target.value)

    handlePlaceInputKeyDown = (event) => {
        if (event.key === "Enter") {
            if (!event.target.value.trim())
                alert("Type something before submit");
            else
                this.props.handleSubmit();
        }
    }

    render(): ReactNode {
        return (
            <div className="userInputs">
                <span>Type a city and press ENTER</span>

                <input
                    className="placeInput"
                    type="text"
                    placeholder="Curitiba, BR"
                    onKeyDown={this.handlePlaceInputKeyDown}
                    onChange={this.handlePlaceInputValueChange}
                />

                <TemperatureUnitSelector
                    initial={this.props.initialTempUnit}
                    onChange={this.props.handleTempUnitChange}
                />
                
                <button className="btn" onClick={this.props.handleSubmit}>{">"}</button>
            </div>
        )
    }
}