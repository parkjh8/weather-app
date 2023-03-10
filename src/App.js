import {useEffect,useState} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
//1. 앱시작하자마자 현재날씨로 된다.
//2.날씨정보에는 도시,섭씨,화씨 온도
//3. 5개의 버튼이 있다. (1개는 현재위치,4개는 다른위치)
//4. 도시버튼을 클릭할떄마다 도시별 날씨
//5. 현ㄴ재위치 버튼을 누르면 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩스피너가 돈다.
function App() {


  const [weather,setWeather]=useState(null);
  const cities=['paris','new york','tokyo','seoul']
  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    });
  };

  const getWeatherByCurrentLocation = async(lat,lon)=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8d95e17925994eb34f38a504a332751e`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data);
  };

   useEffect(()=>{
    getCurrentLocation()
   },[]);

  return (
    <div>
    <div class="container">
    <WeatherBox weather={weather}/>
    <WeatherButton cities={cities}/>
    </div>
  </div>
  );

}

export default App;
