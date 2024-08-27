import React from "react";
import {ITextModalContentType} from "@/types/component/controller/i-text-modal-content-type";
import {useCustomTextModal} from "@/hooks/controller/design/custom-text/use-custom-text-modal";
import {color_list} from "@/utils/colors";
import {ColorCircle} from "@/components/common/color-circle";
import {font_family_list} from "@/utils/fonts";
import Button from "@/components/common/button";

export function TextModalContent(props: ITextModalContentType) {

    const {
        textObject,
        visibleFontSize,
        handleInputChange,
        colorClickCallback,
        fontFamilyClickCallback,
        handleFontSizeChange,
        handleFontStyleChange,
        handleFontWeightChange,
        addDesignTextCallback
    } = useCustomTextModal(props.onClose);

    return (
        <div className="my-5">
            <div className={'flex flex-col w-full h-auto items-center justify-center'}>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Text Colors</h1>
                    <div className="flex overflow-x-auto w-full max-w-full"
                         style={{scrollbarWidth: 'none'}}>
                        {color_list.map((color, index) => (
                            <ColorCircle key={index} color={color} size={35} callback={colorClickCallback}/>
                        ))}
                    </div>
                </div>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Font Family</h1>
                    <div
                        className="flex overflow-x-auto w-full max-w-full"
                        style={{scrollbarWidth: 'none'}}
                    >
                        {font_family_list.map((font_family, index) => (
                            <Button
                                key = {index}
                                index={index}
                                callback={() => fontFamilyClickCallback(font_family.name)}
                                rounded='md'
                                size='sm'
                                color='cyan'
                                className='m-2'
                                buttonText={
                                (
                                    <div
                                        className="min-w-max flex items-center justify-center whitespace-nowrap">
                                        <h1 style={{fontFamily: font_family.name}}>{font_family.name}</h1>
                                    </div>
                                )
                            }
                            />
                        ))}
                    </div>
                </div>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Font Style</h1>
                    <div className="flex">
                        {["normal", "italic", "oblique"].map(style => (
                            <button
                                key={style}
                                className={`px-4 py-2 m-1 ${textObject.fontStyle === style ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleFontStyleChange(style)}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Font Weight</h1>
                    <select value={textObject.fontWeight} onChange={handleFontWeightChange}
                            className="w-full mt-2">
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        {/* ... Add other weight options as needed */}
                    </select>
                </div>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Font Size: {visibleFontSize}px</h1>
                    <input
                        type="range"
                        min="10"
                        max="72"
                        value={visibleFontSize}
                        onChange={handleFontSizeChange}
                        className="w-full mt-2"
                    />
                </div>
                <div className={"w-full h-auto flex flex-col items-start justify-center"}>
                    <h1>Text Input</h1>
                    <textarea
                        value={textObject.text}
                        onChange={handleInputChange}
                        className='w-full outline-none overflow-y-auto'
                        style={{
                            resize: 'none',
                            color: textObject.fill,
                            fontFamily: textObject.fontFamily,
                            fontSize: `${visibleFontSize}px`,
                            fontWeight: textObject.fontWeight,
                            fontStyle: textObject.fontStyle,
                            height: '6rem'
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button
                    buttonText="Add"
                    rounded="md"
                    size="sm"
                    color="yellow"
                    callback={addDesignTextCallback}
                    className='mr-2'
                    index={0}
                />
                <Button
                    buttonText="Close"
                    rounded="md"
                    size="sm"
                    color="yellow"
                    callback={props.onClose}
                    index={1}
                />
            </div>
        </div>
    );
}
