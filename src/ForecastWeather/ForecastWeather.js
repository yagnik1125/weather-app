// import React, { useEffect, useState } from 'react';
// import CircularLoading from '../Components/UI/CircularLoading';

// const ForecastWeather = () => {
//     const [weatherData, setWeatherData] = useState(null);
//     const apiKey = process.env.REACT_APP_API_KEY;

//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=new york&days=14`);
//                 const data = await response.json();
//                 setWeatherData(data);
//             } catch (error) {
//                 console.error('Error fetching weather data:', error);
//             }
//         };

//         fetchWeatherData();
//     }, [apiKey]);

//     if (!weatherData) {
//         return <div className='flex justify-center gap-x-4 text-3xl mt-10'>
//             <CircularLoading></CircularLoading>
//             Loading...</div>;
//     }

//     const { forecast } = weatherData;
//     const dailyForecast = forecast.forecastday.slice(0, 11); // Get forecast for 5 days

//     return (
//         <div className="p-4">
//             <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>
//             <div className='grid grid-cols-24 gap-4 mt-2'>
//                 {
//                     dailyForecast.map((day, index) => (
//                         day.hour.map((hour, hourIndex) => (
//                             <div key={`${index}-${hourIndex}`} className="p-2 bg-blue-300 rounded-xl shadow-md flex flex-col items-center">
//                                 <p className="font-bold text-sm">{hour.time.split(' ')[1]}</p>
//                                 <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="h-8 w-8 mb-1" />
//                                 <p className="text-sm">{hour.temp_c}°C</p>
//                                 <p className="text-gray-600 text-xs">{hour.condition.text}</p>
//                                 <p className="text-xs">Wind: {hour.wind_kph} kph</p>
//                             </div>
//                         )
//                         )
//                     )
//                     )
//                 }
//             </div>
//         </div>
//     );
// };

// export default ForecastWeather;
// -------------------------------------------------------------------------------------------


import React, { useEffect, useState, useRef, useCallback } from 'react';
import CircularLoading from '../Components/UI/CircularLoading';
import PopUpCard from '../Components/UI/PopUpCard';
import './ForecastWeather.css';
import '../Components/CSS/PopUpCard.css';

const ForecastWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('Mumbai'); // Default search term
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null); // New state to hold the selected hour
    const apiKey = process.env.REACT_APP_API_KEY;

    const inputRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (searchTerm.trim() === '') {
                    setSuggestions([]);
                    setShowSuggestions(false); // Hide suggestions if input is empty
                    return;
                }

                const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`);
                const data = await response.json();

                // Filter out the current search term from suggestions
                const filteredSuggestions = data.filter(suggestion => suggestion.name.toLowerCase() !== searchTerm.toLowerCase());

                setSuggestions(filteredSuggestions);
                setShowSuggestions(true); // Show suggestions after fetching
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [searchTerm]);

    const handleSuggestionClick = (suggestion) => {
        console.log("Suggestion clicked:", suggestion);
        setSearchTerm(suggestion.name);
        setShowSuggestions(false); // Hide suggestions after selecting one
        fetchWeatherData(suggestion.name); // Fetch weather data for the selected suggestion
    };

    const fetchWeatherData = async (location) => {
        if (location === '') {
            return;
        }

        setLoading(true); // Set loading to true before fetching data

        try {
            const forecastWeatherApi = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=14`;

            const response = await fetch(forecastWeatherApi);
            const data = await response.json();

            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchWeatherData(searchTerm); // Fetch data when the component mounts

        const intervalId = setInterval(() => fetchWeatherData(searchTerm), 300000); // 300,000 ms = 5 minutes

        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, [apiKey]);

    const handleSearch = () => {
        fetchWeatherData(searchTerm);
    };

    const handleClickOutside = useCallback((event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    }, []);

    const handleBlur = useCallback(() => {
        setShowSuggestions(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        if (inputRef.current) {
            inputRef.current.querySelector('input').addEventListener('blur', handleBlur);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

            if (inputRef.current) {
                inputRef.current.querySelector('input').removeEventListener('blur', handleBlur);
            }
        };
    }, [handleClickOutside, handleBlur]);

    const handleHourClick = (hour) => {
        // console.log("Hour clicked:", hour);
        // console.log("Hello---------->",selectedHour);
        setSelectedHour(hour);
    };

    const handleClosePopUp = () => {
        setSelectedHour(null);
    };


    if (loading) {
        return (
            <div className='flex justify-center gap-x-4 text-3xl mt-10'>
                <CircularLoading></CircularLoading>
                Loading...</div>
        );
    }

    if (!weatherData) {
        return (
            <div className='flex justify-center gap-x-4 text-3xl mt-10'>
                <CircularLoading></CircularLoading>
                Loading...</div>
        );
    }

    const { forecast } = weatherData;
    const dailyForecast = forecast.forecastday.slice(0, 14); // Get forecast for 14 days

    // Helper function to convert time to 12-hour AM/PM format
    const convertTo12HourFormat = (time) => {
        const [hour, minute] = time.split(':');
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? 'PM' : 'AM';
        const adjustedHour = hourInt % 12 || 12; // Convert hour "0" to "12"
        return `${adjustedHour}:${minute} ${period}`;
    };

    const searchButton = `https://img.icons8.com/ios-filled/50/000000/search--v1.png`;

    return (
        <div className="p-4">
            <div className='relative flex justify-between mb-4 ml-10 mr-10' ref={inputRef}>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    className='p-2 rounded border border-gray-300 w-full'
                    placeholder='Enter city, region, or country'
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white w-full shadow-md rounded-b mt-12">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {suggestion.name}, {suggestion.region}, {suggestion.country}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={handleSearch}
                    className='p-2 rounded ml-2 w-10 h-auto'
                    style={{ backgroundImage: `url(${searchButton})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >

                </button>
            </div>

            <div className="space-y-4">
                {dailyForecast.map((day, index) => (
                    <div key={index} className="mb-4">
                        <div className='flex justify-center'><h2 className="text-2xl font-semibold mb-2 bg-blue-300 w-fit p-2 rounded-xl bg-opacity-50">{day.date}</h2></div>
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-4">
                                {day.hour.map((hour, hourIndex) => (
                                    <div
                                        key={`${index}-${hourIndex}`}
                                        className="p-2 bg-white rounded-xl shadow-md flex flex-col items-center min-w-[9rem] min-h-[9rem] bg-opacity-30 hover:scale-110 hover:cursor-pointer transition duration-300 overflow-visible"
                                        onClick={() => handleHourClick(hour)}
                                    >
                                        <p className="font-bold text-sm">{convertTo12HourFormat(hour.time.split(' ')[1])}</p>
                                        <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="h-8 w-8 mb-1" />
                                        <p className="text-sm">{hour.temp_c}°C</p>
                                        <p className="text-gray-600 text-xs">{hour.condition.text}</p>
                                        <p className="text-xs">Wind: {hour.wind_kph} kph</p>
                                        <p className="text-xs">Rain: {hour.precip_in} inch</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <PopUpCard show={selectedHour?true:false} onClose={handleClosePopUp} data={selectedHour} /> */}
            {
                selectedHour!==null && (
                    <PopUpCard onClose={handleClosePopUp} data={selectedHour} />
                )
            }
        </div>
    );
};

export default ForecastWeather;