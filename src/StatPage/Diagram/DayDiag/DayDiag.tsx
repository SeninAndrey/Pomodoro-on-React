import React from 'react';
import './daydiag.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../../../store/statisticSlice.ts';
import { RootState } from '../../../store/store.ts';

export interface DayDiagProps {
    weekDay: string,
    day: string,
    isActive: boolean
}

export function DayDiag({weekDay, day, isActive}: DayDiagProps) {
    const dispatch = useDispatch();
    const dayData= useSelector((state: RootState) => state.statistic.dataList.find(dataListItem => dataListItem.dayId === day));
    
    const heightItem = {
        height: dayData ? (dayData.workTime * 3.34) + 40 : 0
    }

    if (dayData) {
        return (
            <div 
                className={`day ${isActive ? 'day-active' : ''}`} 
                style={heightItem} 
                onClick={() => {
                    dispatch(setSelectedDay(dayData.dayId))}}
            >
                <div className={'day_stat'} ></div>
                <span className={'day_weekDay'}>{weekDay}</span>
            </div>
        )
    } else {
        return (
            <div 
                className={`noData_day ${isActive ? 'day-active' : ''}`} 
                onClick={() => dispatch(setSelectedDay(day))}    
            >
                <div className={'noData_day_stat'}></div>
                <span className={'day_weekDay'}>{weekDay}</span>
            </div>
        )
       
    }
}
