import React, { useState } from 'react';
import './newtaskform.css';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../../store/tasksListSlice.ts';
import { ButtonComponent } from '../../utils/ButtonComponent.tsx';
import { InputComponent } from '../../utils/InputComponent.tsx';

export function NewTaskForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>('');

    function handleSumbit(event: React.SyntheticEvent<HTMLFormElement> ) {
        event.preventDefault();
        if (text.trim().length > 0) {
           dispatch(addNewTask({text}));
        }
        setText('');
    }

    return (
        <>
            <form className={'form'} onSubmit={handleSumbit}>
                <InputComponent
                    id={'newTaskInput'}
                    type={'text'}  
                    placeholder='Название задачи' 
                    className={'form_input'} 
                    value={text}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setText(event.target.value)
                    }}
                />
                <ButtonComponent
                    children={'Добавить'}
                    className={'submit_btn'}
                    disabled={text === ''}
                    type='submit'
                />
            </form>
        </>
        
    );
}
