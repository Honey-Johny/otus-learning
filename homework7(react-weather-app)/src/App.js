import './assets/styles/common.css';
import CityCard from "./components/cityCard/cityCard";

function App() {
  return (
    <div className="App">
        <div className="container">
            <CityCard city={'Moscow'}></CityCard>
            <CityCard city={'Washington'}></CityCard>
            <CityCard city={'Peking'}></CityCard>
            <CityCard city={'London'}></CityCard>
            <CityCard city={'Paris'}></CityCard>
            <CityCard city={'Berlin'}></CityCard>
            <CityCard city={'Rome'}></CityCard>
        </div>
    </div>
  );
}

export default App;
