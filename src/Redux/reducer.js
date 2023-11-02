import {combineReducers} from "redux";
import {SET_CURRENT_WEEK, SET_USER, SET_WHOLE_SCHEDULE} from "./actions";

const initialStateUser = {

}
const userReducer = (state = initialStateUser, action) => {
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

const initialStateWholeSchedule = {

}
const wholeScheduleReducer = (state = initialStateWholeSchedule, action) => {
    switch(action.type){
        case SET_WHOLE_SCHEDULE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

const initialStateCurrentWeek = {

}
const currentWeekReducer = (state = initialStateCurrentWeek, action) => {
    switch(action.type){
        case SET_CURRENT_WEEK:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    wholeSchedule: wholeScheduleReducer,
    currentWeek: currentWeekReducer
})

export default rootReducer