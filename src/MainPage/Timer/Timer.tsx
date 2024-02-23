import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TimerNoData } from '../TimerNoData/TimerNoData.tsx';
import { addTomato, addWorkTime } from '../../store/statisticSlice.ts';
import './timer.css';
import { notifyMe } from '../../utils/notification.ts';
import { setTimerMode, setTomatos } from '../../store/timerSlice.ts';
import { StartButton } from './StartButton/StartButton.tsx';
import { StopButton } from './StopButton/StopButton.tsx';
import { ITasksListItem } from '../TasksList/TasksList.tsx';
import { markTaskDone } from '../../store/tasksListSlice.ts';
import { EIcon, Icon } from '../../Icons/Icon.tsx';
import { ButtonComponent } from '../../utils/ButtonComponent.tsx';

export function Timer() {
    const dispatch = useDispatch();
    const list: ITasksListItem[] = useSelector((state: RootState) => state.taskslist.list);
    const filteredList: ITasksListItem[] = list.filter(task => task.taskDone === false);
    
    const {timerMode, timerState, tomatos, workMinutes, breakMinutes, longBreakMinutes, longBreakRate, isNotificationsOn} = useSelector((state: RootState) => state.timerState);

    const isWorking: boolean = (timerState === 'working');
    const [taskNumber, setTaskNumber] = useState<number>(0);
    const [tomatoNumber, setTomatoNumber] = useState<number>(1);
    const [workTime, setWorkTime] = useState<number>(workMinutes * 60);
    const [secondsLeft, setSecondsLeft] = useState<number>( (timerMode === 'work' ? workMinutes : breakMinutes) * 60);
    const secondsLeftRef = useRef(secondsLeft);

    useEffect(() => {
        setTaskNumber(0);
    }, [filteredList]);

    useEffect(() => {
        setWorkTime(workMinutes * 60);
        setSecondsLeft((timerMode === 'work' ? workMinutes : breakMinutes) * 60);
    },[breakMinutes, timerMode, workMinutes]);

    useEffect(() => {
        secondsLeftRef.current = secondsLeft;
    }, [secondsLeft]);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function handleResetTimer() {
        if (timerMode === 'work') {
            setWorkTime(workTime - secondsLeft);
        }
        setSecondsLeft(secondsLeftRef.current);
        secondsLeftRef.current = 0;
    }

    useEffect(() => {
        function switchMode() {
            const nextMode: string = timerMode === 'work' ? 'break' : 'work';
            const breakDuration: number = (tomatos + 1) % longBreakRate === 0 ? longBreakMinutes : breakMinutes;
            const nextSeconds: number = (nextMode === 'work' ? workMinutes : breakDuration) * 60;
            dispatch(setTimerMode(nextMode));
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        const interval = setInterval(() => {
            if (!isWorking || taskNumber === filteredList.length) return
            if (secondsLeftRef.current === 0) {
                if (timerMode === 'work') {
                    if (filteredList[taskNumber].taskTomato === tomatoNumber) {
                        dispatch(markTaskDone(filteredList[taskNumber].taskId));
                        setTaskNumber(taskNumber + 1);
                        setTomatoNumber(1);
                    } else {
                        setTomatoNumber(tomatoNumber + 1);
                    }
                    dispatch(addTomato());
                    dispatch(setTomatos());
                    dispatch(addWorkTime(workTime));
                    setWorkTime(workMinutes*60);
                }
                if (isNotificationsOn) {
                    timerMode === 'work' ? notifyMe('Время "помидора" закончилось!') : notifyMe('Время перерыва закончилось!');
                }
                return switchMode();
            }
            tick();
        },1000); // <-------------------------------------------- СКОРОСТЬ ТАЙМЕРА
    
        return () => clearInterval(interval);

    }, [breakMinutes, dispatch, filteredList, isNotificationsOn, isWorking, longBreakMinutes, longBreakRate, taskNumber, timerMode, tomatoNumber, tomatos, workMinutes, workTime])
    
    const minutes: number = Math.floor(secondsLeft / 60);
    const seconds: number = secondsLeft % 60;

    function handleAddMinutesClick() {
        if (timerMode === 'work') {
            setWorkTime(workTime + 60);
        }
        secondsLeftRef.current = secondsLeftRef.current + 60;
        setSecondsLeft(secondsLeftRef.current);
    }
    
    if (filteredList.length === 0 || taskNumber > filteredList.length) {
        return <TimerNoData/>
    }
    
    return ( 
        <div className={'timerComponent'}>  
            <div className={`timerComponent_header ${timerMode === 'work' ? 'timerComponent_header-work' : 'timerComponent_header-break'}`}>
                <div className={'timerComponent_currentTask'}>
                    {timerMode === 'work' ? filteredList[taskNumber].taskText : 'Перерыв'}
                </div>   
                <div className={'timerComponent_currentPomidor'}>
                    {timerMode === 'work' ? `Помидор ${tomatoNumber}` : ''}
                </div>
            </div>
            <div className={'timerComponent_main'}>
                <div className={'main_timer'}>
                    <div className={`main_time ${isWorking ? `animation ${timerMode === 'work' ? 'main_time-work' : 'main_time-break'}` : ''}`}>
                        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                    </div>
                    <ButtonComponent
                        children={<Icon name={EIcon.addMinutes}/>}
                        className={'timer_addMinute'}
                        onClick={handleAddMinutesClick}
                    />
                </div>
                <div className={'main_current'}>
                    <span className={'current_taskNumber'}>
                        {timerMode === 'work' ? `Задача ${list.length - filteredList.length + 1} - ` : `следующая задача ${list.length - filteredList.length + 1} - `}
                    </span>
                    <span className={'current_currentTask'}>
                        {filteredList[taskNumber].taskText}
                    </span>
                </div>
                <div className={'main_controls'}>
                    <StartButton timerState={timerState}/>
                    <StopButton timerState={timerState} timerMode={timerMode} resetTimer={handleResetTimer}/>
                </div>
            </div>
        </div>
    );
}

