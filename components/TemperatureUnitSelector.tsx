import React, { Component } from 'react';
import { OpenWeatherMap } from '../interfaces/OpenWeatherMap';

interface Props {
  initial: OpenWeatherMap.Unit
  onChange: (unit: OpenWeatherMap.Unit) => void
}

class TemperatureUnitSelector extends Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unit = event.target.value as OpenWeatherMap.Unit
    this.props.onChange(unit);
  }

  render() {
    return (
      <div className='unitInputContainer'>
        <div className="unitInput">
          <input
            type="radio"
            name="temperatureUnit"
            className='unitInput'
            id={OpenWeatherMap.Unit.FAHRENHEIT}
            value={OpenWeatherMap.Unit.FAHRENHEIT}
            checked={this.props.initial === OpenWeatherMap.Unit.FAHRENHEIT}
            onChange={this.handleChange}
          />
          <label htmlFor={OpenWeatherMap.Unit.FAHRENHEIT}>Fahrenheit</label>
        </div>

        <div className="unitInput">
          <input
            type="radio"
            name="temperatureUnit"
            className='unitInput'
            id={OpenWeatherMap.Unit.CELSIUS}
            value={OpenWeatherMap.Unit.CELSIUS}
            checked={this.props.initial === OpenWeatherMap.Unit.CELSIUS}
            onChange={this.handleChange}
          />
          <label htmlFor={OpenWeatherMap.Unit.CELSIUS}>Celsius</label>
        </div>

        <div className="unitInput">
          <input
            type="radio"
            name="temperatureUnit"
            className='unitInput'
            id={OpenWeatherMap.Unit.KELVIN}
            value={OpenWeatherMap.Unit.KELVIN}
            checked={this.props.initial === OpenWeatherMap.Unit.KELVIN}
            onChange={this.handleChange}
          />
          <label htmlFor={OpenWeatherMap.Unit.KELVIN}>Kelvin</label>
        </div>

      </div>
    )
  }
}

export default TemperatureUnitSelector