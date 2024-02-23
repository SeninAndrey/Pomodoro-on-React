import React from 'react';
import './mainpage.css';
import { Header } from './Header/Header.tsx';
import { Instructions } from './Instructions/Instructions.tsx';
import { NewTaskForm } from './NewTaskForm/NewTaskForm.tsx';
import { Timer } from './Timer/Timer.tsx';
import { TasksList } from './TasksList/TasksList.tsx';

export function MainPage() {
    return (
        <>
            <div >
                <Header isStat={true}/>
                <div className={'mainPage_content container'}>
                    <div className={'content_left'}>
                        <Instructions/>
                        <NewTaskForm/>
                        <TasksList/>
                    </div>
                    <div className={'content_right'}>
                        <Timer/>
                    </div>
                </div>
            </div>
        </> 
    );
}
