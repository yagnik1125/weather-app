# Weather Forecast Application

This is a weather forecast application built with React. The app fetches weather data from the Weather API and displays the forecast for the next 14 days. Users can search for different cities, regions, or countries to get the weather details.

## Features

- Search for weather forecasts by city, region, or country
- Can get the details of current as well as future weather
- Display 14-day weather forecast with hourly details
- Click on an hour to see detailed weather information in a popup card
- Responsive design
- Animated transitions for popup card
- Properly organised information with trusted resources

## Demo

Check out the live demo of the application [here](#).

## Screenshots

![Weather Forecast](./screenshots/forecast.png)
*Description: Main forecast screen showing the weather forecast for selected city.*

![Popup Card](./screenshots/popup.png)
*Description: Popup card showing detailed hourly weather information.*

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   cd weather-forecast-app
    ```
2. Install the dependencies:

   ```bash
   npm install
    ```
3. Create a .env file in the root of the project and add your Weather API key:

   ```bash
   REACT_APP_API_KEY=your_api_key_here
    ```
4. Start the development server:

   ```bash
   npm start
    ```
The application will be available at http://localhost:3000.

**Usage**

    Enter the name of the city, region, or country in the search bar.
    Select the desired location from the suggestions dropdown.
    View the 14-day weather forecast for the selected location.
    Click on an hour to view detailed weather information in the popup card.

**Technologies Used**

    React
    JavaScript
    CSS
    Weather API (https://www.weatherapi.com/)

**Components**
CurrentWeather
ForecastWeather

The main component that displays the weather forecast. It includes the search bar, suggestions dropdown, and weather forecast cards.
PopUpCard

The component that displays detailed weather information for a selected hour in a popup card.
CircularLoading

A loading spinner component that is displayed while fetching weather data.
Styles

The styles for the application are defined in the ForecastWeather.css file.
Animations

**The popup card uses CSS animations for smooth transitions:**

```css

@keyframes zoomIn {
    0% {
        transform: scale(0.1);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes zoomOut {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.1);
        opacity: 0;
    }
}

.popup-card {
    animation: zoomIn 0.3s ease-out;
}

.popup-card-close {
    animation: zoomOut 0.3s ease-in;
}
```

**Contributing**

Contributions are welcome! Please fork the repository and submit a pull request for any bug fixes or enhancements.
License

This project is licensed under the MIT License. See the LICENSE file for more details.


**Acknowledgements**

    Weather API for providing the weather data.

```vbnet
You can customize the above `README.md` file to suit your project's specific details, such as adding a link to the live demo, updating the repository link, and adding screenshots. If you have any other information or sections you would like to include, feel free to modify the content accordingly.
```