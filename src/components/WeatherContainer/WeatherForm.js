import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

import {apiKey, baseURL} from "../../constants";
import css from './WeatherForm.module.css'
const WeatherForm = () => {
    const {register,handleSubmit, formState: {errors}} = useForm();
    const [weatherData, setWeatherData] = useState(!{
        name: "",
        sys: { country: "" },
        main: { temp: "" },
        weather: [{ description: "" }],
    });
    const onSubmit = async (data) => {
        try {
            const res = await axios.get(baseURL+`?q=${data.city}&appid=${apiKey}&units=metric`)
            setWeatherData(res.data)
        } catch (e) {
            console.error('Error fetching weather data:', e);
        }
    };
    return (
        <div className={css.Form}>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('city', {required: true})} placeholder={'Введіть назву міста'}/>
                    <button type="submit">Пошук</button>
                    {errors.city && <span>Місто не визначено</span>}
                </form>
            </div>
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export {WeatherForm};