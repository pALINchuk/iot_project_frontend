export const SET_USER = 'SET_USER'
export const SET_CURRENT_WEEK = 'SET_CURRENT_WEEK'
export const SET_WHOLE_SCHEDULE = 'SET_WHOLE_SCHEDULE'

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const setCurrentWeek = (currentWeek) => ({
    type: SET_CURRENT_WEEK,
    payload: currentWeek
})

export const setWholeSchedule = (wholeSchedule) => ({
    type: SET_WHOLE_SCHEDULE,
    payload: wholeSchedule
})