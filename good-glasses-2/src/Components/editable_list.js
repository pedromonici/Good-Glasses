import { Icon } from '@iconify/react';
import { useState } from 'react';
import "../index.css";

const ThrashCanButton = ({removeCallback}) => {
    const [color, setColor] = useState("#344648");
    return (
        <div className="thrash-can" onClick={removeCallback}>
            <button onMouseEnter={() => setColor("#C34F5A")} onMouseLeave={() => setColor("#344648")}>
                <Icon icon="ri:delete-bin-5-line" color={color} width="40" height="40"/>
            </button>
        </div> 
    )
}

const EditableList = ({
    itemsProps,
    ItemsComponent,
    removeCallback,
}) => {
    return (
        <div className="editable-list-container">
            <div className="editable-list">
                {
                    Object.entries(itemsProps).map(([key, element]) => {
                        const removeElement = (event) => {
                            event.preventDefault();
                            removeCallback(key);
                        };
                        return (
                            <div className="editable-list-item" key={key}>
                                <ItemsComponent {...element}/>
                                <ThrashCanButton removeCallback={removeElement}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditableList;