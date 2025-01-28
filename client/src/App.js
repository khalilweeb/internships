import { Routes , Route} from "react-router-dom";
import Sginup from "./pages/auth/Sginup";
import Login from "./pages/auth/login";




function App() {
  return (
   
      <Routes>
            <Route path='/sginup' element = {<Sginup/>}/>
            <Route path='/login' element = {<Login/>}/>
      </Routes> 
       
   
  );
}

export default App;
