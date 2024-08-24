import React from "react";
import {useDesignList} from "@/hooks/controller/design/design-list/useDesignList";
import {TextDesignListItem} from "@/components/controller/design/list-item/TextDesignListItem";
import {ImageDesignListItem} from "@/components/controller/design/list-item/ImageDesignListItem";

export function DesignListItems () {

    const {
        designList,
        handleRemove
    } = useDesignList();

    return (
        <div className='w-full h-auto flex flex-col'>
            {
                designList?.map((design) => {
                    switch (design.type){
                        case 'text':
                            return TextDesignListItem({design, handleRemove});
                        case 'image':
                            return ImageDesignListItem({design, handleRemove});
                        default:
                            return null;
                    }
                })
            }
        </div>
    );
}
