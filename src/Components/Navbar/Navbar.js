import styles from './Navbar.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

const Navbar = () => {
    const userRedux = useSelector(state => state.user)
    const navigate = useNavigate()
    const isStudent = Boolean(userRedux.groupCode)

    const exitHandler = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try{
            console.log('exited')
            localStorage.removeItem('token');
            navigate('/login')
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <header>
            <nav className={styles.navbar_wrapper}>
                <h1>Вітаємо, {userRedux.name} {userRedux.surname}</h1>
                <div className={styles.navbar_links_container}>
                    <NavLink to='/'>Головна</NavLink>
                    <NavLink to={isStudent ? '/devicesPageStudent' : '/devicesPageTeacher'}>{isStudent ? 'Бронювання' : 'Пристрої'}</NavLink>
                    <NavLink to='/login' onClick={exitHandler}>Вихід</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Navbar