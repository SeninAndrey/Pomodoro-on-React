import {createSlice} from '@reduxjs/toolkit';

export interface IDayData {
    dayId: string,
    workTime: number,
    tomatoCount: number,
    pauseTime: number,
    stopCount: number
}

export interface IListData {
    dataList: IDayData[],
    selectedDay: string,
    selectedWeekDay: string
}

const initialState: IListData = {
    dataList: [],
    selectedDay: '',
    selectedWeekDay: dayId(new Date())
}

export function dayId(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].join('-');
}

const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        addNewTomatoDay: (state) => {
            const currentDay = state.dataList.find(day => day.dayId === dayId(new Date()));
            if (!currentDay) {
                state.dataList.push({
                    dayId: dayId(new Date()),
                    workTime: 0,
                    tomatoCount: 0,
                    pauseTime: 0,
                    stopCount: 0
                })
            } else { return }
        },
        addWorkTime: (state, action) => {
            const currentDay = state.dataList.find(day => day.dayId === dayId(new Date()));
            if (currentDay) {
                currentDay.workTime = currentDay.workTime + action.payload/60;
            }
        },
        addTomato: (state) => {
            const currentDay = state.dataList.find(day => day.dayId === dayId(new Date()));
            if (currentDay) {
                currentDay.tomatoCount = currentDay.tomatoCount + 1;
            }
        },
        addPauseTime: (state, action) => {
            const currentDay = state.dataList.find(day => day.dayId === dayId(new Date()));
            if (currentDay) {
                currentDay.pauseTime = currentDay.pauseTime + action.payload/60;
            }},
        addStop: (state) => {
            const currentDay = state.dataList.find(day => day.dayId === dayId(new Date()));
            if (currentDay) {
                currentDay.stopCount = currentDay.stopCount + 1;
            }
        },
        setSelectedDay: (state, action) => {state.selectedDay = action.payload},
        setSelectedWeekDay: (state, action) => {state.selectedWeekDay = action.payload}
    }
})

export const {
    addNewTomatoDay, 
    addWorkTime, 
    addPauseTime,
    addTomato, 
    addStop, 
    setSelectedDay, 
    setSelectedWeekDay
} = statisticSlice.actions;

export default statisticSlice.reducer;