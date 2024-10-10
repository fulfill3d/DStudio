import React from 'react';
import {IColorCircleType} from "@/interfaces/component/common/i-color-circle-type";

export const ColorCircle = (props: IColorCircleType) => {
    const size = props.size || 50;
    const radius = size / 2;
    const circleSize = size - 10;

    return (
        <div
            className={'relative hover:cursor-pointer mb-4'}
            onClick={() => props.callback(props.color)}
        >
            <svg height={size} width={size} className="m-2">
                <circle cx={radius} cy={radius} r={circleSize / 2} fill={props.color.hex} />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 duration-300">
                <span className="text-white text-sm">{props.color.name}</span>
            </div>
        </div>
    );
};

