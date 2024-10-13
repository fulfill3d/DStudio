import {useState} from "react";
import {IVariantData} from "@/interfaces/utils/i-variant-data";
import {variants} from "@/utils/variants";
import {assets} from "@/utils/assets";

export const useVariants = () => {

    const [variant_data] = useState<IVariantData[]>(variants.map(variant => {
        let count = 0;
        let name = '';
        let _asset = []
        for (let key in variant.mapping) {
            if (variant.mapping.hasOwnProperty(key)) {
                // Extract the suffix from the key
                let suffix = key.split('_').pop();

                // Check if the suffix is a number
                if (!isNaN(Number(suffix))) {
                    count += 1;
                    const asset_id = variant.mapping[key];
                    const asset = assets.find(asset => asset.id === asset_id);
                    if (asset){
                        name += name === '' ? asset.name : `/${asset.name}`;
                        _asset.push(asset);
                    }
                }
                // Check if the suffix is 'blank'
                // else if (suffix === 'blank') {
                //
                // }
            }
        }

        return(
            {
                id: variant.id,
                total_colors: count,
                name: name,
                assets: _asset
            }
        )
    }))

    return {variant_data}
}
