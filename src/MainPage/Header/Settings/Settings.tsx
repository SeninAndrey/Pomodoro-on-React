import React, { useState } from 'react';
import './settings.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSettings } from '../../../store/timerSlice.ts';
import { ButtonComponent } from '../../../utils/ButtonComponent.tsx';
import { InputComponent } from '../../../utils/InputComponent.tsx';

export function Settings() {
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const {workMinutes, breakMinutes, longBreakMinutes, longBreakRate, isNotificationsOn} = useSelector((state: RootState) => state.timerState);
    const [workInputValue, setWorkInputValue] = useState<number>(workMinutes);
    const [breakInputValue, setBreakInputValue] = useState<number>(breakMinutes);
    const [longBreakTimeInputValue, setLongBreakTimeInputValue] = useState<number>(longBreakMinutes);
    const [longBreakRateInputValue, setLongBreakRateInputValue] = useState<number>(longBreakRate);
    const [notificationValue, setNotificationValue] = useState<boolean>(isNotificationsOn);

    return (
        <div className={'settings'}>
            <div 
                className={'settings_button'}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
                Настройки
            </div>
            {isSettingsOpen && 
                <div className={`settings_container `}>
                   <form action="#" className={'settings_form'}>
                        <InputComponent
                            id={'workInput'}
                            type={'number'}
                            label= {'Время "Помидора"'}
                            min="1"
                            max="60"
                            className={'settings_input'}
                            labelClassName={'settings_label'}
                            value={workInputValue} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setWorkInputValue(Number(event.target.value))
                            }}
                        />
                        <InputComponent
                            id={'breakInput'}
                            type={'number'}
                            label= {'Время короткого перерыва'}
                            min="1"
                            max="60"
                            className={'settings_input'}
                            labelClassName={'settings_label'}
                            value={breakInputValue} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setBreakInputValue(Number(event.target.value))
                            }}
                        />
                        <InputComponent
                            id={'longBreakTimeInput'}
                            type={'number'}
                            label= {'Время длинного перерыва'}
                            min="1"
                            max="60"
                            className={'settings_input'}
                            labelClassName={'settings_label'}
                            value={longBreakTimeInputValue} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLongBreakTimeInputValue(Number(event.target.value))
                            }}
                        />
                        <InputComponent
                            id={'longBreakTimeInput'}
                            type={'number'}
                            label= {'Частота длинных перерывов'}
                            min="1"
                            max="10"
                            className={'settings_input'}
                            labelClassName={'settings_label'}
                            value={longBreakRateInputValue} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLongBreakRateInputValue(Number(event.target.value))
                            }}
                        />
                        <InputComponent
                            id={'notification'}
                            type={'checkbox'}
                            label= {'Включить уведомления'}
                            defaultChecked={notificationValue}
                            labelClassName={'settings_label'}
                            onClick={() => {
                                setNotificationValue(state => !state);
                            }}
                        />
                        <ButtonComponent
                            children={'Сохранить'}
                            className={'settings_submitBtn'}
                            onClick={() => {
                                setIsSettingsOpen(false);
                                dispatch(setSettings({
                                    workInputValue, 
                                    breakInputValue, 
                                    longBreakTimeInputValue, 
                                    longBreakRateInputValue, 
                                    notificationValue
                                }));
                            }}
                        />
                   </form>
                </div>
            }
        </div>
    );
}




