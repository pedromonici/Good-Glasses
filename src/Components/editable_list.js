import { Icon } from '@iconify/react';
import { useState } from 'react';
import "../index.css";
import IconButton from './icon_button';

const EditableList = ({
    items,
    ItemsComponent,
    removeCallback,
}) => {
    return (
        <div className="editable-list">
            {
                Object
                .entries(items)
                .map(([key, element]) => {
                    const removeElement = (event) => {
                        event.preventDefault();
                        removeCallback(key);
                    };
                    return <ItemsComponent key={key} removeElement={removeElement} {...element}/>
                })
            }
        </div>
    )
}

export default EditableList;
