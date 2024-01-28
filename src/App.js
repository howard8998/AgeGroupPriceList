import "./App.css";
import AgeGroupPriceList from "./view/ageGroupPriceList";
function App() {
  return (
    <div className="App">
      <AgeGroupPriceList onChange={result => console.log(result)}/>
    </div>
  );
}

export default App;
