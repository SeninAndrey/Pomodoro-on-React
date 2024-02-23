import React, { useState } from 'react';
import './themeswitcher.css';
import { EIcon, Icon } from '../../../Icons/Icon.tsx';
import { InputComponent } from '../../../utils/InputComponent.tsx';

export function ThemeSwitcher() {
    const [isDark, setIsDark] = useState<boolean>(localStorage.getItem('theme') === 'dark-theme');

    const setDarkTheme = () => {
        document.documentElement.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    }
    const setLightTheme = () => {
        document.documentElement.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    }

    const selectedTheme: string | null = localStorage.getItem('theme');
    if (selectedTheme === 'dark-theme') setDarkTheme();

    const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) setDarkTheme();
        else setLightTheme();
    }
    
    return (
        <div className={'themeSwitcher'}>
            <InputComponent
                id={'themeCheckbox'}
                type={'checkbox'}
                className={'theme_input'}
                defaultChecked = {selectedTheme === 'dark-theme'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    toggleTheme(e);
                    setIsDark(!isDark);
                }}
                label={(isDark) ? <Icon name={EIcon.darkThemeIcon} /> : <Icon name={EIcon.lightThemeIcon} />}
                labelClassName={'theme_label'}
            />
        </div>
    );
}
