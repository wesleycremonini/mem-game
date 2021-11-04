import React from "react";
 
import { CardComp } from './Card.styles';

function Card({children, click, classN, key, ID}) {
    return (
        <CardComp  id={ID} key={key} className={`${classN} CLICK`} clickable onClick={(e) => click(e)}>
            <h1 className='icon'>{children}</h1>
        </CardComp>
    );
};

export default Card;