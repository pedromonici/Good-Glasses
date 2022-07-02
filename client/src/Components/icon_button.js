import "../index.css";
import { Icon } from '@iconify/react';
import { useState } from "react";

const defaultWidth = '2.5em'
const defaultHeight = '2.5em'

const IconButton = ({icon, hoverClass, callback, colorClass, width, height}) => {
    hoverClass = hoverClass? hoverClass : ''
    colorClass = colorClass? colorClass : ''
    width = width? width : defaultWidth
    height = height? height : defaultHeight
    return (
        <div className={`icon-div ${colorClass}`}>
            <Icon className={`icon ${hoverClass}`} icon={icon} width={width} height={height} onClick={callback}/>
        </div>
    )
}

export default IconButton;