import { Routes , Route} from "react-router-dom";
import Sginup from "./pages/auth/Sginup";




function App() {
  return (
   
      <Routes>
            <Route path='/sginup' element = {<Sginup/>}/>
      </Routes> 
       
   
  );
}

export default App;
