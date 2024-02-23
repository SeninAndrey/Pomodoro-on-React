import React, { useEffect } from 'react';
import './timernodata.css';
import { useDispatch } from 'react-redux';
import { setTimerMode, setTimerState } from '../../store/timerSlice.ts';
import { ButtonComponent } from '../../utils/ButtonComponent.tsx';

export function TimerNoData() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTimerMode('work'));
        dispatch(setTimerState('stopped'));
    }, [dispatch])
    return (  
        <div className={'timerComponent'}>  
            <div className={`timerComponent_header`}>
                <div className={'timerComponent_currentTask'}>
                    {`Текущая задача отсутствует`}
                </div>   
            </div>
            <div className={'timerComponent_main'}>
                <div className={'main_timer'}>
                    <div className={`main_time`}>
                        {`00:00`}
                    </div>
                    <ButtonComponent
                        className={'timer_addMinute disabled'}
                    />
                </div>
                <div className={'main_current'}>
                    <span className={'current_taskNumber'}>
                        {`Текущая задача отсутствует`}
                    </span>
                </div>
                <div className={'main_controls'}>
                    <ButtonComponent
                        children={'Старт'}
                        className={'main_controls_leftBtn disabled'}
                    />
                    <ButtonComponent
                        children={'Стоп'}
                        className={`main_controls_rightBtn disabled`}
                    />
                </div>
            </div>
        </div>
    );
}
