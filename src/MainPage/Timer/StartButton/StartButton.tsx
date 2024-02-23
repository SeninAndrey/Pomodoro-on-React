import React from 'react';
import './startbutton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPauseStart, setTimerState } from '../../../store/timerSlice.ts';
import { addNewTomatoDay, addPauseTime, addStop } from '../../../store/statisticSlice.ts';
import { RootState } from '../../../store/store.ts';
import { ButtonComponent } from '../../../utils/ButtonComponent.tsx';

export interface StartButtonProps {
    timerState: string
}

export function StartButton({timerState}: StartButtonProps) {
    const dispatch = useDispatch();
    const pauseStarted = useSelector((state: RootState) => state.timerState.pauseStart);
    
    function start() {
        dispatch(setTimerState('working'));
        dispatch(addNewTomatoDay());
    }

    function resume() {
        dispatch(setTimerState('working'));
        dispatch(addPauseTime((Date.now() - pauseStarted)/1000));
    }

    function pause() {
        dispatch(setTimerState('paused'));
        dispatch(addStop());
        dispatch(setPauseStart(Date.now()));
    }

    switch (timerState) {
        case 'stopped':
            return (
                <ButtonComponent
                    children={'Старт'}
                    className={'main_controls_StartBtn'}
                    onClick={start}
                />
            )
        case 'paused':
            return (
                <ButtonComponent
                    children={'Продолжить'}
                    className={'main_controls_StartBtn'}
                    onClick={resume}
                />
            )      
        case 'working':
            return (
                <ButtonComponent
                    children={'Пауза'}
                    className={'main_controls_StartBtn'}
                    onClick={pause}
                />
            ) 
    }
}
