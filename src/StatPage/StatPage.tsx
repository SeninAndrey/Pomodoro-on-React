import React from 'react';
import './statpage.css';
import { Header } from '../MainPage/Header/Header.tsx';
import { SelectWeek } from './SelectWeek/SelectWeek.tsx';
import { DayStat } from './DayStat/DayStat.tsx';
import { Diagram } from './Diagram/Diagram.tsx';
import { StatParam } from './DayStat/StatParam/StatParam.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { IDayData } from '../store/statisticSlice.ts';

export function StatPage() {
    const selectedDay: string = useSelector((state: RootState) => state.statistic.selectedDay)
    const selectedDayData: IDayData | undefined = useSelector((state: RootState) => state.statistic.dataList.find(day => day.dayId === selectedDay));
    const daiWeekIndex: number = new Date(selectedDay).getDay();
    console.log(daiWeekIndex);
       
    return (
        <div>
            <Header isStat={false}/>
            <div className={'statPage_header container'}>
                <h2 className={'statPage_title'}>Ваша Активность</h2>
                <SelectWeek/>
            </div>
            <div className={'statPage_diagram container'}>
                <DayStat 
                    day={daiWeekIndex} 
                    dayWorkTime={ selectedDayData ? Math.round(selectedDayData.workTime) : 0} 
                    dayTomato={ selectedDayData ? selectedDayData.tomatoCount : 0}
                    isExist={selectedDayData ? true : false}
                />
                <Diagram selectedDayWeekIndex={daiWeekIndex}/>
            </div>
            <div className={'statPage_statParams container'}>
                <StatParam 
                    statValue={selectedDayData?.workTime ? (100 * selectedDayData.pauseTime/selectedDayData.workTime) : 0} 
                    statMode={'focus'}
                    isExist={selectedDayData ? true : false}
                />
                <StatParam 
                    statValue={selectedDayData ? selectedDayData.pauseTime : 0} 
                    statMode={'pause'}
                    isExist={selectedDayData ? true : false}
                />
                <StatParam 
                    statValue={selectedDayData ? selectedDayData.stopCount : 0} 
                    statMode={'stops'}
                    isExist={selectedDayData ? true : false}
                />
            </div>
        </div>
    );
}
