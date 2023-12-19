import './App.css';
import Auth from "./Components/Auth/Auth";
import {Routes, Route, useNavigate} from "react-router-dom"
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration/Registration";
import ClassDetails from "./Components/ClassDetails/ClassDetails";
import DevicesPageStudent from "./Components/DevicesPageStudent/DevicesPageStudent"
import DevicesPageTeacher from "./Components/DevicesPageTeacher/DevicesPageTeacher"
import {UserInformationService} from "./services/UserInformationService";
import {setCurrentWeek, setUser, setWholeSchedule} from "./Redux/actions";
import {ScheduleService} from "./services/ScheduleService";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await UserInformationService(token)
            dispatch(setUser(result.data))

            const schedule = await ScheduleService(token)
            // console.log(schedule.data) //schedule.data.schedule[schedule.data.currentWeek]
            dispatch(setWholeSchedule(schedule.data))
            dispatch(setCurrentWeek(schedule.data.schedule[schedule.data.currentWeek]))
            // dispatch(setCurrentWeek(schedule.data.schedule["Second"]))

            console.log(schedule.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                console.log('Unauthorized access. Redirecting to login page...');
                localStorage.removeItem('token');
                navigate('/login')
                // Redirect to the login page or perform other actions for unauthorized access
            } else {
                // Handle other types of errors (network error, server error, etc.)
                console.error('Error occurred:', error);
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])

  return (
      // <HashRouter>
        <div className="App">
            <Routes>
                <Route path='/' element={<>
                        <Navbar/>
                        <Home/>
                    </>}
                />
                <Route path='/devicesPageStudent' element={<>
                    <Navbar/>
                    <DevicesPageStudent/>
                </>}/>
                <Route path='/devicesPageTeacher' element={<>
                    <Navbar/>
                    <DevicesPageTeacher/>
                </>}/>
                <Route path='/class/:id/:date' element={<>
                        <Navbar/>
                        <ClassDetails/>
                    </>}
                />
                <Route path='/login' element={<Auth/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='*' element={<h1>Not found!</h1>}/>
            </Routes>
        </div>
      // </HashRouter>
  );
}

export default App;
