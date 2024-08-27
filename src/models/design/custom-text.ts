import {v4 as uuidv4} from "uuid";

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

interface CanvasModelType {
    width: number
    height: number
    scaleFactor: number
}

export class CustomText{

    private id: string;
    public readonly text: string;
    public properties: CustomTextProperty;

    constructor(canvasModel: CanvasModelType, text: TextType){
        this.id = uuidv4();
        this.text = text.text;
        this.properties = new CustomTextProperty(canvasModel, text);
    }

    getText(){
        return this.text;
    }

    getProperties(){
        return this.properties;
    }
}

class CustomTextProperty{

    private left: number;
    private top: number;
    private fontSize: number;
    private fontFamily: string;
    private fontWeight: string;
    private fontStyle: string;
    private hasControls: boolean;
    private splitByGrapheme: boolean;
    private fill: string;
    private controls: any;
    private originX: string;
    private originY: string;

    constructor(canvasModel: CanvasModelType, text: TextType){
        this.left = canvasModel.width * canvasModel.scaleFactor / 2;
        this.top = canvasModel.height * canvasModel.scaleFactor / 2;
        this.fontSize = text.fontSize;
        this.fontFamily = text.fontFamily;
        this.fontWeight = text.fontWeight;
        this.fontStyle = text.fontStyle;
        this.hasControls = text.hasControls;
        this.splitByGrapheme = text.splitByGrapheme;
        this.fill = text.fill;
        this.controls = text.controls;
        this.originX = 'center';
        this.originY = 'center';
    }
}

