import React from 'react';
import './instructions.css';

export function Instructions() {
    return (
        <div className={'instructions'}>
            <h2 className={'instructions_title'}>
                Ура! Теперь можно начать работать:
            </h2>
            <ul className={'instructions_list'}>
                <li className={'instriuctions_list-item'}>
                    Выберите катеория и напишите название текущей задачи
                </li>
                <li className={'instriuctions_list-item'}>
                    Запустите таймер ("Помидор")
                </li>
                <li className={'instriuctions_list-item'}>
                    Работайте пока "помидор" не позвонит
                </li>
                <li className={'instriuctions_list-item'}>
                    Сделайте короткий перерыв (3-5 минут)
                </li>
                <li className={'instriuctions_list-item'}>
                    Продолжайте работать "помидор" за "помидором", пока задача не будет выполнена. Каждые 4 "помидора" делайте длинный перерыв (15-30 минут).
                </li>
            </ul>
        </div> 
    );
}
