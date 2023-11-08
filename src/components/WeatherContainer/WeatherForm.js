import { useState } from "react";
import { useForm } from "react-hook-form";

import { apiKey } from "../../constants";
import { axiosService } from "../../services";
import css from './WeatherForm.module.css'

const WeatherForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await getWeatherData(data.city);
            setWeatherData(response.data);
            setError(null);
        } catch (e) {
            setError('Помилка при отриманні погодних даних.');
            console.error('Error fetching weather data:', e);
        }
    };

    const getWeatherData = async (city) => {
        return axiosService.get('', {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });
    };

    return (
        <div className={css.Form}>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('city', { required: true })} placeholder={'Введіть назву міста'} />
                    <button type="submit">Пошук</button>
                    {errors.city && <span>Місто не визначено</span>}
                    {error && <span>{error}</span>}
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

export { WeatherForm };
