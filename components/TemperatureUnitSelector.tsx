import React, { Component } from 'react';
import { OpenWeatherMap } from '../interfaces/OpenWeatherMap';

interface Props {
  onChange: (unit: OpenWeatherMap.Unit) => void;
}

interface State {
  selectedUnit: OpenWeatherMap.Unit;
}

class TemperatureUnitSelector extends Component<Props, State> {
  state = {
    selectedUnit: OpenWeatherMap.Unit.CELSIUS,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unit = event.target.value as OpenWeatherMap.Unit;
    this.setState({ selectedUnit: unit });
    this.props.onChange(unit);
  };

  render() {
    return (
      <div>
        <input
          type="radio"
          id={OpenWeatherMap.Unit.CELSIUS}
          name="temperatureUnit"
          value={OpenWeatherMap.Unit.CELSIUS}
          checked={this.state.selectedUnit === OpenWeatherMap.Unit.CELSIUS}
          onChange={this.handleChange}
        />
        <label htmlFor={OpenWeatherMap.Unit.CELSIUS}>Celsius</label>

        <input
          type="radio"
          id={OpenWeatherMap.Unit.FAHRENHEIT}
          name="temperatureUnit"
          value={OpenWeatherMap.Unit.FAHRENHEIT}
          checked={this.state.selectedUnit === OpenWeatherMap.Unit.FAHRENHEIT}
          onChange={this.handleChange}
        />
        <label htmlFor={OpenWeatherMap.Unit.FAHRENHEIT}>Fahrenheit</label>

        <input
          type="radio"
          id={OpenWeatherMap.Unit.KELVIN}
          name="temperatureUnit"
          value={OpenWeatherMap.Unit.KELVIN}
          checked={this.state.selectedUnit === OpenWeatherMap.Unit.KELVIN}
          onChange={this.handleChange}
        />
        <label htmlFor={OpenWeatherMap.Unit.KELVIN}>Kelvin</label>
      </div>
    );
  }
}

export default TemperatureUnitSelector;