import React, {useCallback, useState} from "react";
import Button from "@/components/common/button";
import {TextModal} from "@/components/controller/design/text/text-modal";

export function TextController() {
    const [isAddCustomTextModalOpen, setIfAddCustomTextModalOpen] = useState(false);
    const toggleAddCustomTextModal = useCallback(() => {
        setIfAddCustomTextModalOpen(prevIsOpen => !prevIsOpen);
    }, []);

    return (
        <div className='w-auto h-auto'>
            <Button
                buttonText="Text"
                rounded='md'
                size='sm'
                color='cyan'
                className='m-2'
                callback={toggleAddCustomTextModal}
            />
            <TextModal
                isOpen={isAddCustomTextModalOpen}
                onClose={toggleAddCustomTextModal}
            />
        </div>
    );
}
