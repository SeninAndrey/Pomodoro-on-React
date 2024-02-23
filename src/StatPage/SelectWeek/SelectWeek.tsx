import React, { useEffect, useRef, useState } from 'react';
import './selectweek.css';
import { useDispatch } from 'react-redux';
import { dayId, setSelectedDay, setSelectedWeekDay } from '../../store/statisticSlice.ts';
import { EIcon, Icon } from '../../Icons/Icon.tsx';

export function SelectWeek() {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('Выберите неделю');
    
    const ref = useRef<HTMLUListElement>(null);
    const refOpenBtn= useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleOpen = (event: MouseEvent) => { 
            if (!refOpenBtn.current) return;
            if (event.target instanceof Node && !ref.current?.contains(event.target) && !refOpenBtn.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        }
        document.addEventListener('click', handleOpen);
        return () => {
            document.removeEventListener('click', handleOpen);
        }
    }, [isSelectOpen]);

    return (
        <div className={'selectElement'}>
            <div 
               className={'select_listItem select_control'}
               onClick={() => setIsSelectOpen(true)}
               ref={refOpenBtn}
            >
                <Icon name={EIcon.selectIcon} />
                {selectedOption}
            </div>
            {isSelectOpen && 
                <ul 
                    className={'select_list'} 
                    ref={ref}
                    onClick={() => {
                        setIsSelectOpen(false);
                        dispatch(setSelectedDay(''));
                    }}
                > 
                    <li 
                        onClick={() => {
                            dispatch(setSelectedWeekDay(dayId(new Date())));
                            setSelectedOption('Эта неделя');
                        }} 
                        className={'select_listItem select_control'}                    
                    >
                        <Icon name={EIcon.selectIcon} className={'selectIcon_reverse'}/>
                        Эта неделя
                    </li>
                    <li 
                        onClick ={() => {
                            dispatch(setSelectedWeekDay(dayId(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))));
                            setSelectedOption('Прошедшая неделя');
                        }}
                        className={'select_listItem'}
                    >
                        Прошедшая неделя
                    </li>
                    <li 
                        onClick ={() => {
                            dispatch(setSelectedWeekDay(dayId(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000))));
                            setSelectedOption('2 недели назад');
                        }}
                        className={'select_listItem'}
                    >
                        2 недели назад
                    </li>
                </ul>
            }
        </div>
    )
}
