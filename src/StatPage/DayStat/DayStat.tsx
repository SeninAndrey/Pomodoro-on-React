import React from 'react';
import './daystat.css';
import { EIcon, Icon } from '../../Icons/Icon.tsx';

interface DayStatProps {
    day: number,
    dayWorkTime: number,
    dayTomato: number,
    isExist: boolean
}

const weekDays: string[] = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]

const unitsWords = (unitsValue: number, unitsName: string): string => {
    if (unitsValue === 11 || unitsValue === 12 || unitsValue === 13 || unitsValue === 14) {
        return `${unitsName}`
    }
    const remainder: number = unitsValue%10;
    switch (remainder) {
        case 1:
            return `${unitsName}а`
        case 2:    
        case 3:
        case 4: 
            return `${unitsName}ы`
        case 0:
        case 5: 
        case 6:
        case 7: 
        case 8: 
        case 9:
            return `${unitsName}`
        default:
            return `${unitsName}`
    }
}

export function DayStat({day, dayWorkTime, dayTomato, isExist}: DayStatProps) {
  return (
    <div className={'dayStat'}>
        <div className={'dayStat_current'}>
            <span className={'dayStat_day'}>
                {weekDays[day]}
            </span>
            <div className={'dayStat_description'}>
                {isExist ? 'Вы работали над задачами в течении ' : 'Нет данных'}
                {isExist && 
                    <span className={'dayStat_value'}>
                        {`${dayWorkTime} ${unitsWords(dayWorkTime, 'минут')}`}
                    </span>
                }
            </div>
        </div>
       
        <div className={'dayStat_currentDay-tomato'}>
        {isExist &&
            <>
                <div className={'currentDay_tomatoImg'}>
                    <Icon name={EIcon.tomato} className={'tomatoImg'}/>
                    {`x ${dayTomato}`}
                </div>
                <div className={'currentDay_tomatoText'}>
                    {`${dayTomato} ${unitsWords(dayTomato, 'помидор')}`}
                </div>
            </>
        } 
        {!isExist &&
            <Icon name={EIcon.noTomato} className={'noTomatoImg'}/>
        }  
        </div>
    </div>
  );
}
