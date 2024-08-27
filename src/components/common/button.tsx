import classNames from "classnames";
import React from "react";
import {IButtonType} from "@/types/component/common/i-button-type";

const Button = (props: IButtonType) => {
    return (
        <button
            key={props.index}
            onClick={props.callback}
            className={classNames(
                "border-black border-2",

                {
                    "bg-violet-200 hover:bg-violet-300 active:bg-violet-400":
                        props.color === "violet" && !props.disabled,
                },
                {
                    "bg-pink-200 hover:bg-pink-300 active:bg-pink-400":
                        props.color === "pink" && !props.disabled,
                },
                {
                    "bg-red-200 hover:bg-red-300 active:bg-red-400":
                        props.color === "red" && !props.disabled,
                },
                {
                    "bg-orange-200 hover:bg-orange-300 active:bg-orange-400":
                        props.color === "orange" && !props.disabled,
                },
                {
                    "bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400":
                        props.color === "yellow" && !props.disabled,
                },
                {
                    "bg-lime-200 hover:bg-lime-300 active:bg-lime-400":
                        props.color === "lime" && !props.disabled,
                },
                {
                    "bg-cyan-200 hover:bg-cyan-300 active:bg-cyan-400":
                        props.color === "cyan" && !props.disabled,
                },
                { "rounded-none": props.rounded === "none" },
                { "rounded-md": props.rounded === "md" },
                { "rounded-full": props.rounded === "full" },
                { "h-10 px-4 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]": props.size === "sm" },
                { "h-12 px-5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]": props.size === "md" },
                { "h-14 px-5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]": props.size === "lg" },
                {
                    "border-[#727272] bg-[#D4D4D4] text-[#676767] hover:bg-[#D4D4D4] hover:shadow-none active:bg-[#D4D4D4]":
                    props.disabled,
                },
                props.className
            )}
            disabled={props.disabled}
        >
            {props.buttonText}
        </button>
    );
};

export default Button;
