import React from "react";
import {IImageDesignListItem} from "@/types/component/controller/IImageDesignListItem";

export function ImageDesignListItem({design, handleRemove}: IImageDesignListItem){
    const id = design.id;
    const name = design.name;
    const data = design.data;
    return (
        <div key={id} className='flex flex-row w-full h-full items-center justify-between'>
            <img alt={''} src={data} className='w-12 h-12' style={{objectFit: 'contain'}}/>
            <h1>{name}</h1>
            <button onClick={() => handleRemove(id)}>X</button>
        </div>
    )
}
