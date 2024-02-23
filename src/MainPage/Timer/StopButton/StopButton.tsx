import React from 'react';
import './stopbutton.css';
import { setTimerState } from '../../../store/timerSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addPauseTime } from '../../../store/statisticSlice.ts';
import { RootState } from '../../../store/store.ts';
import { ButtonComponent } from '../../../utils/ButtonComponent.tsx';

interface StopButtnProps {
    timerState: string, 
    timerMode: string,
    resetTimer: () => void
}

export function StopButton({timerState, timerMode, resetTimer}: StopButtnProps) {
    const dispatch = useDispatch();
    const pauseStarted = useSelector((state: RootState) => state.timerState.pauseStart);
    
    function done() {
        resetTimer();
        dispatch(setTimerState('working'));
        if (timerState === 'paused' ) {
            dispatch(addPauseTime((Date.now() - pauseStarted)/1000));
        }
    }
    
    if (timerMode === 'work') {
        switch (timerState) {
            case 'working':
                return (
                    <ButtonComponent
                        children={'Стоп'}
                        className={'main_controls_StopBtn'}
                        onClick={done}
                    />
                )
            case 'paused':
                return (
                    <ButtonComponent
                        children={'Сделано'}
                        className={'main_controls_StopBtn'}
                        onClick={done}
                    />
                ) 
            default: 
            return (
                <ButtonComponent
                    children={'Стоп'}
                    disabled={true}
                    className={'main_controls_StopBtn'}
                />
            )
        }
    } 
    else {
        return (
            <ButtonComponent
                children={'Пропустить'}
                className={'main_controls_StopBtn'}
                onClick={done}
            />
        )
    }
}
