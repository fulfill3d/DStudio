import React from "react";
import TabComponent from "@/components/common/tabs";
import {Variant} from "@/components/controller/product/variant";

export function ProductController() {
    return (
        <div className='w-full h-4/10 mb-2'>
            <TabComponent.Group>
                <TabComponent.List>
                    <TabComponent>Product</TabComponent>
                    <TabComponent>Size</TabComponent>
                    <TabComponent>Variant</TabComponent>
                </TabComponent.List>
                <TabComponent.Panels>
                    <TabComponent.Panel>
                        <div>Different products will be visible here</div>
                    </TabComponent.Panel>
                    <TabComponent.Panel>
                        <div>Different product measurements will be here</div>
                    </TabComponent.Panel>
                    <TabComponent.Panel>
                        <Variant />
                    </TabComponent.Panel>
                </TabComponent.Panels>
            </TabComponent.Group>
        </div>
    );
}
