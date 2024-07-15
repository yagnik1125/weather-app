// import { useEffect, useState } from 'react';
// const CurrentWeather = () => {
//     const [weatherDetails, setWeatherDetails] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('Mumbai'); // Default search term
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     useEffect(() => {
//         const fetchSuggestions = async () => {
//             try {
//                 if (searchTerm.trim() === '') {
//                     setSuggestions([]);
//                     setShowSuggestions(false); // Hide suggestions if input is empty
//                     return;
//                 }
//                 const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=b743c1e6a18e44e3bc0131521240806&q=${searchTerm}`);
//                 const data = await response.json();
//                 // Filter out the current search term from suggestions
//                 const filteredSuggestions = data.filter(suggestion => suggestion.name.toLowerCase() !== searchTerm.toLowerCase());
//                 setSuggestions(filteredSuggestions);
//                 setShowSuggestions(true); // Show suggestions after fetching
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//             }
//         };
//         fetchSuggestions();
//     }, [searchTerm]);
//     const handleSuggestionClick = (suggestion) => {
//         setSearchTerm(suggestion.name);
//         setShowSuggestions(false); // Hide suggestions after selecting one
//     };
//     const fetchWeatherData = (location) => {
//         if (location === '') {
//             return;
//         }
//         const currentWeatherApi = `http://api.weatherapi.com/v1/current.json?key=b743c1e6a18e44e3bc0131521240806&q=${location}`;
//         fetch(currentWeatherApi)
//             .then((res) => res.json())
//             .then((data) => setWeatherDetails(data))
//             .catch((error) => console.error('Error fetching:', error));
//     };
//     useEffect(() => {
//         fetchWeatherData(searchTerm); // Fetch data when the component mounts
//         const intervalId = setInterval(() => fetchWeatherData(searchTerm), 300000); // 300,000 ms = 5 minutes
//         return () => clearInterval(intervalId); // Clear the interval when the component unmounts
//     }, []);
//     const handleSearch = () => {
//         fetchWeatherData(searchTerm);
//     };
//     if (!weatherDetails) {
//         return <div className='text-center text-4xl'>Loading...</div>;
//     }
//     const {
//         location: { name, region, country, localtime },
//         current: {
//             temp_c, feelslike_c, condition, wind_kph, wind_dir, pressure_mb, humidity, cloud, precip_mm, vis_km, uv, gust_kph
//         }
//     } = weatherDetails;
//     const directionMap = {
//         N: "North",
//         NNE: "North-Northeast",
//         NE: "Northeast",
//         ENE: "East-Northeast",
//         E: "East",
//         ESE: "East-Southeast",
//         SE: "Southeast",
//         SSE: "South-Southeast",
//         S: "South",
//         SSW: "South-Southwest",
//         SW: "Southwest",
//         WSW: "West-Southwest",
//         W: "West",
//         WNW: "West-Northwest",
//         NW: "Northwest",
//         NNW: "North-Northwest"
//     };
//     const icons = {
//         feelslike: "https://img.icons8.com/color/48/000000/temperature--v1.png",
//         wind: "https://img.icons8.com/color/48/000000/wind.png",
//         pressure: "https://img.icons8.com/color/48/000000/barometer-gauge.png",
//         humidity: "https://img.icons8.com/color/48/000000/hygrometer.png",
//         cloud: "https://img.icons8.com/color/48/000000/clouds.png",
//         precipitation: "https://img.icons8.com/color/48/000000/rain.png",
//         visibility: "https://img.icons8.com/color/48/000000/binoculars.png",
//         uv: "https://img.icons8.com/color/48/000000/sun.png",
//         gust: "https://img.icons8.com/color/48/000000/wind.png",
//     };
//     const backgroundImage = 'https://w0.peakpx.com/wallpaper/60/652/HD-wallpaper-blue-sky-summer-sky-summer-clouds-nature.jpg';
//     return (
//         <div className='h-screen overflow-y-auto' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <div className='max-w-xl h-screen overflow-y-auto bg-white bg-opacity-30 mx-auto p-2 rounded-3xl shadow-md'>
//                 <div className='flex justify-between mb-4'>
//                     <input
//                         type='text'
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 handleSearch();
//                             }
//                         }}
//                         className='p-2 rounded border border-gray-300'
//                         placeholder='Enter city, region, or country'
//                     />
//                     {showSuggestions && suggestions.length > 0 && (
//                         <ul className="absolute z-10 bg-white w-sm shadow-md rounded-b mt-12">
//                             {suggestions.map((suggestion, index) => (
//                                 <li
//                                     key={index}
//                                     onClick={() => handleSuggestionClick(suggestion)}
//                                     className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                                 >
//                                     {suggestion.name}, {suggestion.region}, {suggestion.country}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                     <button
//                         onClick={handleSearch}
//                         className='bg-blue-500 text-white p-2 rounded ml-2'
//                     >
//                         Search
//                     </button>
//                 </div>
//                 <h1 className='text-2xl font-bold text-center mb-2'>{name}, {region}, {country}</h1>
//                 <p className='text-center text-gray-600'>{localtime}</p>
//                 <div className='flex justify-center items-center mt-2'>
//                     <img src={condition.icon} alt={condition.text} className='w-16 h-16' />
//                     <span className='text-3xl ml-2'>{temp_c}°C</span>
//                 </div>
//                 <p className='text-center text-xl'>{condition.text}</p>
//                 <div className='grid grid-cols-2 gap-4 mt-2'>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.feelslike} alt="Feels Like" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Feels Like</h2>
//                             <p>{feelslike_c}°C</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.wind} alt="Wind" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold text-start'>Wind</h2>
//                             <p>{wind_kph} kph {directionMap[wind_dir]}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.pressure} alt="Pressure" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Pressure</h2>
//                             <p>{pressure_mb} mb</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.humidity} alt="Humidity" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Humidity</h2>
//                             <p>{humidity}%</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.cloud} alt="Cloud Cover" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Cloud Cover</h2>
//                             <p>{cloud}%</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.precipitation} alt="Precipitation" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Precipitation</h2>
//                             <p>{precip_mm} mm</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.visibility} alt="Visibility" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Visibility</h2>
//                             <p>{vis_km} km</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.uv} alt="UV Index" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>UV Index</h2>
//                             <p>{uv}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center bg-blue-300 bg-opacity-40 rounded-3xl'>
//                         <img src={icons.gust} alt="Gust Speed" className='w-6 h-6 mr-2' />
//                         <div className='text-center'>
//                             <h2 className='font-bold'>Gust Speed</h2>
//                             <p>{gust_kph} kph</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default CurrentWeather;


// ----------------------------------------------------------------------------------

import { useEffect, useState, useRef, useCallback } from 'react';
import CircularLoading from '../Components/UI/CircularLoading';

const CurrentWeather = () => {
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('Mumbai'); // Default search term
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state
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

                const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`);
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

        setLoading(true); // Start loading
        const currentWeatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        try {
            const res = await fetch(currentWeatherApi);
            const data = await res.json();
            setWeatherDetails(data);
        } catch (error) {
            console.error('Error fetching:', error);
        } finally {
            setLoading(false); // Stop loading
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

    if (loading) {
        return <div className='flex justify-center gap-x-4 text-3xl mt-10'>
        <CircularLoading></CircularLoading>
        Loading...</div>
    }

    if (!weatherDetails) {
        return <div className='flex justify-center gap-x-4 text-3xl mt-10'>
        <CircularLoading></CircularLoading>
        Loading...</div>;
    }

    const {
        location: { name, region, country, localtime },
        current: {
            temp_c, feelslike_c, condition, wind_kph, wind_dir, pressure_mb, humidity, cloud, precip_in, vis_km, uv, gust_kph
        }
    } = weatherDetails;

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

    // const backgroundImage = 'https://w0.peakpx.com/wallpaper/60/652/HD-wallpaper-blue-sky-summer-sky-summer-clouds-nature.jpg';

    return (
        // <div className='h-screen overflow-y-auto' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='max-w-xl h-screen overflow-y-auto bg-white bg-opacity-30 mx-auto p-2 rounded-3xl shadow-md'>
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
                    style={{ backgroundImage: `url(${icons.searchButton})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >

                </button>
            </div>
            <h1 className='text-2xl font-bold text-center mb-2'>{name}, {region}, {country}</h1>
            <p className='text-center text-gray-600'>{convertTo12HourFormat(localtime)}</p>
            <div className='flex justify-center items-center'>
                <img src={condition.icon} alt={condition.text} className='w-16 h-16' />
                <span className='text-3xl ml-2'>{temp_c}°C</span>
            </div>
            <p className='text-center text-xl'>{condition.text}</p>
            <div className='grid grid-cols-2 gap-4'>
                {weatherMetrics.map((metric, index) => (
                    <div key={index} className='flex items-center bg-blue-300 bg-opacity-40 rounded-2xl hover:bg-blue-400 hover:bg-opacity-50 hover:shadow-lg hover:shadow-blue-500/50 transition duration-500'>
                        <img src={metric.icon} alt={metric.label} className='w-6 h-6 mr-2' />
                        <div className='text-center'>
                            <h2 className='font-bold text-start'>{metric.label}</h2>
                            <p>{metric.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        // </div>
    );
}

export default CurrentWeather;
