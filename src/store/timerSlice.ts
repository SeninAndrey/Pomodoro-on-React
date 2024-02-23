import {createSlice} from '@reduxjs/toolkit';

export interface ITimer {
    timerMode: string,      //  work / break
    timerState: string,    //  stopped / paused / working
    pauseStart: number,
    tomatos: number,
    workMinutes: number,
    breakMinutes: number,
    longBreakMinutes: number,
    longBreakRate: number,
    isNotificationsOn: boolean
} 

const initialState: ITimer = {
    timerMode: 'work',
    timerState: 'stopped',
    pauseStart: 0,
    tomatos: 0,
    workMinutes: 2,
    breakMinutes: 1,
    longBreakMinutes: 4,
    longBreakRate: 4,
    isNotificationsOn: false
}

const timerSlice = createSlice( {
    name: 'timerState',
    initialState, 
    reducers: {
        setTimerState: (state, action) => {state.timerState = action.payload},
        setTimerMode: (state, action) => {state.timerMode = action.payload},
        setPauseStart: (state, action) => {state.pauseStart = action.payload},
        setTomatos: (state) => {state.tomatos = state.tomatos + 1},
        setSettings: (state, action) => {
            state.workMinutes = action.payload.workInputValue;
            state.breakMinutes = action.payload.breakInputValue;
            state.longBreakMinutes = action.payload.longBreakTimeInputValue;
            state.longBreakRate = action.payload.longBreakRateInputValue;
            state.isNotificationsOn = action.payload.notificationValue;
        }
    }
})

export const {
    setTimerMode, 
    setTimerState,
    setPauseStart,
    setTomatos,
    setSettings,
} = timerSlice.actions;

export default timerSlice.reducer;