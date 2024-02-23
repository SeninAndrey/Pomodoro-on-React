import React, { useRef, useState } from 'react';
import './tasklistmenu.css';
import { Dropdown } from '../../Dropdown/Dropdown.tsx';
import { ModalDelete } from '../../Dropdown/ModalDelete/ModalDelete.tsx';
import { EIcon, Icon } from '../../../Icons/Icon.tsx';
import { ButtonComponent } from '../../../utils/ButtonComponent.tsx';

interface TaskListMenuProps {
    id: string
}

export function TaskListMenu({id}: TaskListMenuProps) {
    const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const refButton = useRef<HTMLButtonElement>(null);
    if(!refButton) return null;

    return (
        <div className={'dropdownMenu'}>
            <ButtonComponent
                children={<Icon name={EIcon.dropdownMenu} />}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                ref={refButton} 
            />
            {isDropdownOpened && (
                <Dropdown
                    currentId = {id}
                    // isOpen = {isDropdownOpened}
                    onClose = {() => setIsDropdownOpened(false)}
                    openBtn = {refButton}
                    modalOpen = {() => setIsModalDeleteOpen(true)}
                />
            )}
            {isModalDeleteOpen && 
                <ModalDelete 
                    currentId={id} 
                    onCloseModal={() => setIsModalDeleteOpen(false)}
                    isModalOpen={isModalDeleteOpen}
                />}
        </div>
    )
}
