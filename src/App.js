import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout'
import CurrentWeather from './CurrentWeather/CurrentWeather';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ForecastWeather from './ForecastWeather/ForecastWeather';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={<CurrentWeather />} />
        <Route path='/forecast' element={<ForecastWeather />} />
      </Route>
    )
  );

  return (
    // <>
    //   <CurrentWeather></CurrentWeather>
    //   <ForecastWeather></ForecastWeather>
    // </>

    <RouterProvider router={router} />
  );
}

export default App;