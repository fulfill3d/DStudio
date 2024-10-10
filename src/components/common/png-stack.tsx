import {useVariantSelect} from "@/hooks/controller/product/use-variant-select";
import {IPngStackType} from "@/interfaces/component/common/i-png-stack-type";


export function PngStack(props: IPngStackType) {
    const size = props.size || 50;
    const height = size / props.variant.total_colors
    const width = size;
    const variantSelectCallback = useVariantSelect();

    return (
        <div
            className={'relative hover:cursor-pointer'}
            onClick={() => variantSelectCallback(props.variant.id)}
        >
            <div className='flex flex-col border border-black mr-8'>
                {props.variant.assets.map((asset, index) => (
                    <img alt={'favicon.ico'} key={index} src={asset.uri} style={ {width: width, height: height, objectFit: 'fill'}}/>
                    ))}
            </div>
        </div>
    );
}
