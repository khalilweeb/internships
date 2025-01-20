import { Routes , Route} from "react-router-dom";
import Sginup from "./pages/Sginup";




function App() {
  return (
    <div className="App">
      <Routes>
            <Route path='/sginup' element = {<Sginup/>}/>
      </Routes> 
       
    </div>
  );
}

export default App;
