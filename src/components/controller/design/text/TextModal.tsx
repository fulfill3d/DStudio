import React, {useCallback} from 'react';
import {ITextModalType} from "@/types/component/controller/ITextModalType";
import {Modal} from "@/components/common/Modal";
import DropDown from "@/components/common/DropDown";
import {TextModalContent} from "@/components/controller/design/text/TextModalContent";

export function TextModal(props: ITextModalType){

    const dropDownClickCallback = useCallback<(id: number) => void>((id) => {
        console.log(id);
    }, [])

    return (
        props.isOpen ? <VisibleContent/> : <InvisibleContent/>
    );

    function InvisibleContent(){
        return null;
    }

    function VisibleContent(){
        return (
            <Modal>
                <Modal.Header>
                    <p className="text-2xl font-bold">Text Settings</p>
                </Modal.Header>
                <Modal.Body>
                    <DropDown
                        title="Options"
                        list={[
                            { id: 0, name: "Account settings" },
                            { id: 1, name: "Support" },
                            { id: 2, name: "License" },
                        ]}
                        onClick={dropDownClickCallback}
                    />
                    <TextModalContent
                        onClose={props.onClose}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}
