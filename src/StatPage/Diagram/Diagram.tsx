import React from 'react';
import './diagram.css';
import { DayDiag } from './DayDiag/DayDiag.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

function dayId(date: Date) {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    return [year, month, day].join('-');
}

function getWeek(current: Date) {
    const startOfWeek = new Date(current); // Создаем новый объект даты на основе переданной даты
    const dayOfWeek = startOfWeek.getDay(); // Получаем день недели (воскресенье = 0, понедельник = 1, ..., суббота = 6)
    
    // Считаем разницу между текущим днем недели и понедельником
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff); // Вычитаем разницу из текущей даты
  
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(currentDate.getDate() + i);
        week.push(dayId(currentDate));
    }
  
    return week;
}

interface DiagramProps {
    selectedDayWeekIndex: number | undefined;
}

export function Diagram({selectedDayWeekIndex}: DiagramProps) {
    const currentWeekItem: string = useSelector((state: RootState) => state.statistic.selectedWeekDay);
    const currentWeekDays: string[] = getWeek(new Date(currentWeekItem));
    const weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    return (
        <div className={'diagram'}>
            <div className={'diagram_content'}>
                {currentWeekDays.map((currentDay: string, i: number) => {
                    return  <DayDiag
                                key={i}
                                weekDay={weekDays[i]}
                                day={currentDay}
                                isActive={selectedDayWeekIndex === (i + 1) % 7}
                            />
                })}
            </div>
            <span className={'timeLevel firstLevel'}>25 мин</span>
            <span className={'timeLevel secondLevel'}>50 мин</span>
            <span className={'timeLevel thirdLevel'}>1 ч 15 мин</span>
            <span className={'timeLevel fourthLevel'}>1 ч 40 мин</span>
            <div className={'linesLevel top-linesLevel'}></div>
            <div className={'linesLevel bottom-linesLevel'}></div>
            <div className={'diagram_footer'}></div>
        </div>
    );
    }
