import {v4 as uuidv4} from "uuid";
import {CustomText} from "@/models/design/CustomText";
import {CustomImage} from "@/models/design/CustomImage";

//TODO: global TextType, DataType and CanvasModelType

interface TextType {
    text: string
    fontSize: number
    fontFamily: string
    fontWeight: string
    fontStyle: string
    hasControls: boolean
    splitByGrapheme: boolean
    fill: string
    controls: any
}

interface DataType {
    data: any;
    name: string;
    scaleFactor: number;
    controls: any
}

interface CanvasModelType {
    width: number
    height: number
    scaleFactor: number
}
//TODO: Factory Pattern for CustomImage and CustomText as they are both CustomDesign
export class CustomDesign {

    public readonly id: string;
    public type: 'image' | 'text' | undefined;
    public object: CustomText | CustomImage | undefined;

    constructor() {
        this.id = uuidv4();
    }

    generateCustomImage(canvasModel: CanvasModelType, data: DataType){
        this.type = 'image';
        this.object = new CustomImage(canvasModel, data);
    }

    generateCustomText(canvasModel: CanvasModelType, data: TextType){
        this.type = 'text';
        this.object = new CustomText(canvasModel, data);
    }

    getId(){
        return this.id;
    }

    getType(){
        return this.type;
    }

    getObject(){
        return this.object;
    }
}
