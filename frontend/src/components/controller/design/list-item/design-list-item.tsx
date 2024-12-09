import React from "react";
import {useDesignList} from "@/hooks/controller/design/design-list/use-design-list";
import {TextDesignListItem} from "@/components/controller/design/list-item/text-design-list-item";
import {ImageDesignListItem} from "@/components/controller/design/list-item/image-design-list-item";

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
