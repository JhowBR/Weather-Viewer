import { CityWeatherModel, CityWeatherViewModel } from "../components/CityWeatherView"
import { OpenWeatherMap } from "../interfaces/OpenWeatherMap"

export function cityWheaterModelFormater(model: CityWeatherModel): CityWeatherViewModel {
    const city_and_country = capitalize(model.city) + ", " + model.country.toUpperCase()
    const symbol = getSymbolOfUnit(model.unit)

    return {
        cityAndCountry: city_and_country,
        temp: model.temp.toString() + symbol,
        maxTemp: "Max: " + model.maxTemp.toString() + symbol,
        minTemp: "Min: " + model.minTemp.toString() + symbol
    }
}

function capitalize(text: string) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function getKeyNameByValue(value: OpenWeatherMap.Unit) { // not using...
    const indexOfS = Object.values(OpenWeatherMap.Unit).indexOf(value);
    return Object.keys(OpenWeatherMap.Unit)[indexOfS];
}

function getSymbolOfUnit(unit: OpenWeatherMap.Unit) {
    let symbol = ""

    if (unit === OpenWeatherMap.Unit.CELSIUS)
        symbol = "ºC"
    else if (unit === OpenWeatherMap.Unit.FAHRENHEIT)
        symbol = "ºF"
    else if (unit === OpenWeatherMap.Unit.KELVIN)
        symbol = "K"
    else
        throw "Error while processing unit symbol"
    
    return symbol
}