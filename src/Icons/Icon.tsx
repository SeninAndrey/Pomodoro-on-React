
import * as React from 'react';
import { AcceptIcon } from './AcceptIcon.tsx';
import { AddMinuteIcon } from './AddMinutes.tsx';
import { ClockIcon } from './ClockIcon.tsx';
import { DecreaseIcon } from './DecreaseIcon.tsx';
import { DeleteIcon } from './DeleteIcon.tsx';
import { DropdownMenuIcon } from './DropdownMenuIcon.tsx';
import { EditIcon } from './EditIcon.tsx';
import { IncreaseIcon } from './IncrieaseIcon.tsx';
import { StatIcon } from './StatIcon.tsx';
import { Logo } from './Logo.tsx';
import { PauseIcon } from './PauseIcon.tsx';
import { FocusIcon } from './FocusIcon.tsx';
import { StopIcon } from './StopIcon.tsx';
import { TomatoIcon } from './TomatoIcon.tsx';
import { NoTomatoIcon } from './NoTomatoIcon.tsx';
import { SelectIcon } from './SelectIcon.tsx';
import { LightThemeIcon } from './LightThemeIcon.tsx';
import { DarkThemeIcon } from './DarkThemeIcon.tsx';
import './icon.css';

export enum EIcon {
    accept = 'AcceptIcon',
    addMinutes = 'AddMinuteIcon',
    clock = 'ClockIcon',
    decrease = 'DecreaseIcon',
    delete = 'DeleteIcon',
    dropdownMenu = 'DropdownMenuIcon',
    edit = 'EditIcon',
    increase = 'IncreaseIcon',
    logo = 'LogoIcon',
    statIcon = 'StatIcon',
    focusIcon = 'FocusIcon',
    pauseIcon = 'PauseIcon',
    stopIcon = 'StopIcon',
    tomato = 'TomatoIcon',
    noTomato = 'NoTomatoIcon',
    selectIcon = 'SlectIcon',
    lightThemeIcon = 'LightThemeIcon',
    darkThemeIcon = 'DarkThemeIcon'
 }

const icons = {
    [EIcon.accept]: <AcceptIcon />,
    [EIcon.addMinutes]: <AddMinuteIcon />,
    [EIcon.clock]: <ClockIcon />,
    [EIcon.decrease]: <DecreaseIcon />,
    [EIcon.delete]: <DeleteIcon />,
    [EIcon.dropdownMenu]: <DropdownMenuIcon />,
    [EIcon.edit]: <EditIcon />,
    [EIcon.increase]: <IncreaseIcon />,
    [EIcon.logo]: <Logo />,
    [EIcon.statIcon]: <StatIcon />,
    [EIcon.focusIcon]: <FocusIcon />,
    [EIcon.stopIcon]: <StopIcon />,
    [EIcon.pauseIcon]: <PauseIcon />,
    [EIcon.noTomato]: <NoTomatoIcon />,
    [EIcon.tomato]: <TomatoIcon />,
    [EIcon.selectIcon]: <SelectIcon />,
    [EIcon.lightThemeIcon]: <LightThemeIcon />,
    [EIcon.darkThemeIcon]: <DarkThemeIcon />
};

interface IIconProps {
    name: EIcon,
    className?: string,
    size?: number
}
 
export function Icon({ name, className, size}: IIconProps) {    
    return (
        <div 
            className={`icon_container ${className ? className : ''}`}
        > 
            {icons[name]} 
        </div>
    )
}
