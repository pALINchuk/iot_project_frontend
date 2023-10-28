import './App.css';
import Auth from "./Components/Auth/Auth";
import {HashRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration/Registration";

function App() {

  return (
      <HashRouter>
        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Auth/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='*' element={<h1>Not found!</h1>}/>
            </Routes>

        </div>
      </HashRouter>
  );
}

export default App;
