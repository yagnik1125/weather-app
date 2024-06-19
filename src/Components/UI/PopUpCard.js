import React from 'react';
import { useState } from 'react';
import '../CSS/PopUpCard.css';

const PopUpCard = ({ onClose, data }) => {
    const [style,setStyle] = useState('popup-card');

    const { time, condition: { text, icon }, temp_c, feelslike_c, wind_kph, wind_dir, pressure_mb, humidity, cloud, precip_in, vis_km, uv, gust_kph } = data;

    function close(){
        setStyle('popup-card-close');
        setTimeout(() => {
            onClose();
        }, 200);
    }

    const directionMap = {
        N: "North",
        NNE: "North-Northeast",
        NE: "Northeast",
        ENE: "East-Northeast",
        E: "East",
        ESE: "East-Southeast",
        SE: "Southeast",
        SSE: "South-Southeast",
        S: "South",
        SSW: "South-Southwest",
        SW: "Southwest",
        WSW: "West-Southwest",
        W: "West",
        WNW: "West-Northwest",
        NW: "Northwest",
        NNW: "North-Northwest"
    };

    const icons = {
        feelslike: "https://img.icons8.com/color/48/000000/temperature--v1.png",
        wind: "https://img.icons8.com/color/48/000000/wind.png",
        pressure: "https://img.icons8.com/color/48/000000/barometer-gauge.png",
        humidity: "https://img.icons8.com/color/48/000000/hygrometer.png",
        cloud: "https://img.icons8.com/color/48/000000/clouds.png",
        precipitation: "https://img.icons8.com/color/48/000000/rain.png",
        visibility: "https://img.icons8.com/color/48/000000/binoculars.png",
        uv: "https://img.icons8.com/color/48/000000/sun.png",
        gust: "https://img.icons8.com/color/48/000000/wind.png",
        searchButton: "https://img.icons8.com/ios-filled/50/000000/search--v1.png",
    };

    // Helper function to convert time to 12-hour AM/PM format
    const convertTo12HourFormat = (time) => {
        const [date, localtime] = time.split(' ');
        const [hour, minute] = localtime.split(':');
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? 'PM' : 'AM';
        const adjustedHour = hourInt % 12 || 12; // Convert hour "0" to "12"
        return `${date} ${adjustedHour}:${minute} ${period}`;
    };

    const weatherMetrics = [
        { label: 'Feels Like', value: `${feelslike_c}°C`, icon: icons.feelslike },
        { label: 'Wind', value: `${wind_kph} kph ${directionMap[wind_dir]}`, icon: icons.wind },
        { label: 'Pressure', value: `${pressure_mb} mb`, icon: icons.pressure },
        { label: 'Humidity', value: `${humidity}%`, icon: icons.humidity },
        { label: 'Cloud Cover', value: `${cloud}%`, icon: icons.cloud },
        { label: 'Precipitation', value: `${precip_in} inch`, icon: icons.precipitation },
        { label: 'Visibility', value: `${vis_km} km`, icon: icons.visibility },
        { label: 'UV Index', value: `${uv}`, icon: icons.uv },
        { label: 'Gust Speed', value: `${gust_kph} kph`, icon: icons.gust },
    ];

    return (
        <div className={`fixed z-50 inset-0 overflow-y-auto`}>
            <div className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`inline-block align-bottom bg-gray-300 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${style}`} role="dialog" aria-modal="true" aria-labelledby="pop-up-headline">
                    <div className='mt-2 mr-4 ml-4'>
                        <p className='text-center text-gray-600'>{convertTo12HourFormat(time)}</p>
                        <div className='flex justify-center items-center'>
                            <img src={icon} alt={text} className='w-16 h-16' />
                            <span className='text-3xl ml-2'>{temp_c}°C</span>
                        </div>
                        <p className='text-center text-xl'>{text}</p>
                        <div className='grid grid-cols-2 gap-4'>
                            {weatherMetrics.map((metric, index) => (
                                <div key={index} className='flex items-center bg-blue-400 bg-opacity-40 rounded-2xl hover:bg-blue-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-blue-500/50 transition duration-500'>
                                    <img src={metric.icon} alt={metric.label} className='w-6 h-6 mr-2' />
                                    <div className='text-center'>
                                        <h2 className='font-bold text-start'>{metric.label}</h2>
                                        <p>{metric.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={close} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpCard;
