import React from 'react';
import './statparam.css';
import { EIcon, Icon } from '../../../Icons/Icon.tsx';

interface StatParamProps {
    statValue: number,
    statMode: 'focus' | 'pause' | 'stops',
    isExist: boolean
}

export function StatParam({statValue, statMode, isExist}: StatParamProps) {
    const roundValue: number = Math.round(statValue);
    const hours: string = roundValue >= 60 ? `${Math.trunc(roundValue/60)}ч` : '';
    const getTitle = (mode: string): string => {
        switch (mode) {
            case 'focus':
                return 'Фокус';
            case 'pause':
                return 'Время на паузе'
            case 'stops':
                return 'Остановки';
            default:
                return ''
        }
    } 
    return (
        <div className={`statParam ${isExist ? statMode : ''}`}>
            <div className={'statParam_content'}>
                <h3 className={'statParam_title'}>
                    {getTitle(statMode)}
                </h3>
                <span className={'statParam_value'}>
                    {statMode === 'focus' && `${roundValue}%`}
                    {statMode === 'pause' && `${hours}${roundValue%60}м`}
                    {statMode === 'stops' && `${roundValue}`}
                </span>
            </div>
            <div className={`${isExist ? `icon-${statMode}-active` : ''}`}>
                {statMode === 'focus' && <Icon name={EIcon.focusIcon} />}
                {statMode === 'pause' && <Icon name={EIcon.pauseIcon} />}
                {statMode === 'stops' && <Icon name={EIcon.stopIcon} />}
            </div>
        </div>
    );
}
