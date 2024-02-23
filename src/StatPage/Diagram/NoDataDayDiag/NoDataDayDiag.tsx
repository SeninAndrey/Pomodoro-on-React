import React from 'react';
import './nodatadaydiag.css';

export interface NoDataDayDiagProps {
    weekDay: string,
    isActive?: boolean
}

export function NoDataDayDiag({weekDay, isActive}: NoDataDayDiagProps) {
    return (
        <div className={`noData_day ${isActive ? 'day-active' : ''}`} >
            <div className={'noData_day_stat'} ></div>
            <span className={'day_weekDay'}>{weekDay}</span>
        </div>
    );
}
