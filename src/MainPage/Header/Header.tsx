import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher.tsx';
import { Settings } from './Settings/Settings.tsx';
import { EIcon, Icon } from '../../Icons/Icon.tsx';

interface HeaderProps {
    isStat: boolean
}

export function Header({ isStat }: HeaderProps) {
    return (
        <header className={'header'}>
            <div className={'header_container container'}>
                <a href="/">
                    <Icon name={EIcon.logo} />
                </a>
                <div className={'header_navi'}>
                    {isStat && (
                        <Link to="/stat" className={'header_link'}>
                            <Icon name={EIcon.statIcon} className={'header_icon_svg'} />
                            Статистика
                        </Link>
                    )}
                    {!isStat && (
                        <Link to="/" className={'header_link'} >
                            <Icon name={EIcon.clock} className={'header_icon_svg'} />
                            Назад к Таймеру
                        </Link>
                    )}
                    <Settings/>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>  
    );
}
