import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { increaseTomato, decreaseTomato, setTaskEditable } from '../../store/tasksListSlice.ts'
import './dropdown.css';
import ReactDOM from 'react-dom';
import { EIcon, Icon } from '../../Icons/Icon.tsx';

interface IDropdownProps {
    currentId: string,
    isOpen?: boolean,
    onClose?: () => void,
    openBtn: React.RefObject<HTMLButtonElement>
    modalOpen: () => void,
}

const NOOP = () => {}; // функция - заглушка

export function Dropdown({ currentId, isOpen, onClose = NOOP, openBtn, modalOpen = NOOP}: IDropdownProps) {
    const ref = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleOpen = (event: MouseEvent) => {   
            if (!openBtn.current) return;
            if (event.target instanceof Node && !ref.current?.contains(event.target) && !openBtn.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener('click', handleOpen);
        return () => {
            document.removeEventListener('click', handleOpen);
        }
    }, [onClose, openBtn]);

    const nodeDropdown = document.querySelector('#dropdown_root');
    
    if(!nodeDropdown) return null
    else 
    
    if (!openBtn.current) return
   
    return ReactDOM.createPortal((
        <ul 
            className={'dropdown_list'} 
            style={{
                top: openBtn.current?.getBoundingClientRect().y + 30,
                left: openBtn.current?.getBoundingClientRect().x - 70
            }}
            ref={ref} 
        >
            <li 
                className={'dropdown_listItem'}
                onClick={() => dispatch(increaseTomato({currentId}))}
            >
                <Icon name={EIcon.increase}/>
                {'Увеличить'}
            </li>
            <li 
                className={'dropdown_listItem'} 
                onClick={() => dispatch(decreaseTomato({currentId}))}
            >
                <Icon name={EIcon.decrease} />
                {'Уменьшить'}
            </li>
            <li 
                className={'dropdown_listItem'} 
                onClick={()=> {
                    dispatch(setTaskEditable({currentId}));
                    onClose();
                }}
            >
                <Icon name={EIcon.edit} />
                {'Редактировать'}
            </li>
            <li 
                className={'dropdown_listItem'} 
                onClick={() => {
                    modalOpen();
                    onClose();
                }}
            >
                <Icon name={EIcon.delete} />
                {'Удалить'}
            </li>
        </ul>
    ), nodeDropdown)
}

    

