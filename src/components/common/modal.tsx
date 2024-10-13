import React from 'react';
import {IModalProps} from "@/interfaces/component/common/i-modal-props";

export function Modal({children}: IModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border-2 border-black w-96 shadow-lg rounded-md bg-white">
                {children}
            </div>
        </div>);
}

function ModalHeader({children}: IModalProps){
    return (
        <div className="flex justify-center items-center pb-3">
            {children}
        </div>
    )
}

function ModalBody({children}: IModalProps){
    return (
        <div className="my-5">
            {children}
        </div>
    )
}

function ModalFooter({children}: IModalProps){
    return (
        <div className="flex justify-end pt-2">
            {children}
        </div>
    )
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
