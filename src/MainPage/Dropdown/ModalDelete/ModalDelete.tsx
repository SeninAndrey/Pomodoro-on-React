import React, { useRef } from 'react';
import  ReactDOM  from 'react-dom';
import './modaldelete.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../store/tasksListSlice.ts';
import { ButtonComponent } from '../../../utils/ButtonComponent.tsx';

export interface ModalDeleteProps {
    currentId: string,
    onCloseModal: () => void,
    isModalOpen: boolean
}

export function ModalDelete({ currentId, onCloseModal, isModalOpen}: ModalDeleteProps) {
    const refModal = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const node = document.querySelector('#modal_root');

    if(!node) return null;

    return ReactDOM.createPortal((
        <div className={'modal_overlay'} onClick={onCloseModal}>
            <div className={'modal_window'} ref={refModal} onClick={(event: React.MouseEvent) => event.stopPropagation()}>
                <div className={'modal_content'}>
                    <h2 className={'modal_header'}>{'Удалить задачу?'}</h2>
                    <ButtonComponent
                        children={'Удалить'}
                        className={'modal_deleteButton'}
                        onClick={() => {
                            dispatch(deleteTask({currentId}));
                            onCloseModal();
                        }}
                    />
                    <ButtonComponent
                        children={'Отмена'}
                        className={'modal_cancelButton'}
                        onClick={() => onCloseModal()}
                    />
                </div>
            </div>
        </div>
    ), node);
}
      