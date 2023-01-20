import { useState, useEffect } from "react"
import { OpenWeatherMap } from "../interfaces/OpenWeatherMap"
import { CityWeatherView } from "../components/CityWeatherView"
import TemperatureUnitSelector from "../components/TemperatureUnitSelector"

const API_KEY = '08f82dfbbe70f4dcda9de8d5499ea392'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OpenWeatherMap.Root>(null)
    const [temperatureUnit, setTemperatureUnit] = useState<OpenWeatherMap.Unit>(OpenWeatherMap.Unit.CELSIUS)
    const [placeInputValue, setPlaceInputValue] = useState("London, UK")

    const onPlaceInputValueChange = (event) => {
        setPlaceInputValue(event.target.value);
    };
    
    const onSubmitBtnClick = async () => {
        try {
            if (placeInputValue == "")
                throw "Place input value can't be null"

            await fetchData()
        }
        catch (error) {
            alert(error)
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${placeInputValue}&APPID=${API_KEY}&units=${temperatureUnit}`) // GET
            
            if (!response.ok)
                throw response.statusText
            
            const loaded_data = await response.json()

            if (!loaded_data)
                throw "Data was not loaded"

            setData(loaded_data)
        }
        catch (error) {
            const error_msg = 'Error while fetching data: ' + error
            console.error(error_msg)
            alert(error_msg)
        }
        finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [temperatureUnit])

    return (
    <div>
        <input type="text" value={placeInputValue} placeholder="Curitiba, BR" onChange={onPlaceInputValueChange}/>
        <button onClick={onSubmitBtnClick}>Submit</button>

        <TemperatureUnitSelector onChange={setTemperatureUnit}/>

        { loading && !data && <p>Loading data...</p> }

        {data && (
            <CityWeatherView
            city={data.name}
            country={data.sys.country}
            temp={data.main.temp}
            maxTemp={data.main.temp_max}
            minTemp={data.main.temp_min}
            />
        )}
    </div>
    )
}

