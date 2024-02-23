import React, { useEffect, useRef, useState } from 'react';
import './taskslist.css';
import { TaskListMenu } from './TaskListMenu/TaskListMenu.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setTaskEditable, setTaskText } from '../../store/tasksListSlice.ts';
import { ModalDelete } from '../Dropdown/ModalDelete/ModalDelete.tsx';
import { EIcon, Icon } from '../../Icons/Icon.tsx';
import { ButtonComponent } from '../../utils/ButtonComponent.tsx';
import { InputComponent } from '../../utils/InputComponent.tsx';

export interface ITasksListItem {
    taskId: string,
    taskTomato: number,
    taskText: string,
    taskEditable: boolean,
    taskDone: boolean
}

export interface ITasksList {
    list: ITasksListItem[]
} 

export function TasksList () {
    const list = useSelector((state: RootState) => state.taskslist.list);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    function checkEmptyValue(taskId: string, taskText: string) {
        if (taskText === '') {
            setIsModalDeleteOpen(true)
        } else {
            dispatch(setTaskEditable({taskId}))
        }
    }

    useEffect (() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [list])
    
    const totalTime = list.reduce((sum: number, elem: ITasksListItem) => {
        return sum + elem.taskTomato
    }, 0)*25;
    return (
        <>
            <ul className={'tasksList'}>
                {list.map((task: ITasksListItem) =>  (
                        <li className={`tasksList_item  ${task.taskDone ? 'taskItem_done' : ''}`} key={task.taskId}>
                            <span className={'taskItem_tomatoCount'}>{task.taskTomato}</span>
                            { task.taskEditable
                                ? <div className={'taskItem_input'}>
                                    <InputComponent
                                        type={'text'} 
                                        id={task.taskId}
                                        ref={inputRef}
                                        className={'taskItem_edit'}
                                        value={task.taskText}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            dispatch(setTaskText(event.target.value));
                                        }}
                                        // "закрываем" Input по нажатию Enter
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === 'Enter') checkEmptyValue(task.taskId, task.taskText)
                                        }}
                                    />
                                    {isModalDeleteOpen && 
                                        <ModalDelete 
                                            currentId={task.taskId} 
                                            onCloseModal={() => setIsModalDeleteOpen(false)}
                                            isModalOpen={isModalDeleteOpen}
                                        />
                                    }
                                    <ButtonComponent
                                        children={<Icon name={EIcon.accept} className={'taskItem_confirmBtn'} />}
                                        onClick={() => checkEmptyValue(task.taskId, task.taskText)}
                                    />
                                </div>
                                : <span>{task.taskText}</span>
                            }
                            <TaskListMenu id={task.taskId} />
                        </li>
                    )
                )}
            </ul>
            <span className={'tasksList_timeSum'}>
                {totalTime >= 60 ? `${Math.trunc(totalTime/60)} ч` : ''}  {`${totalTime%60} мин`}
            </span>           
        </>
    );
}


