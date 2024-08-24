import {v4 as uuidv4} from "uuid";
import {IObjectOptions} from "fabric/fabric-impl";

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

export class CustomImage{
    public readonly id: string;
    public readonly name: string;
    public readonly data: any;
    public properties: CustomImageProperty

    constructor(canvasModel: CanvasModelType, data: DataType) {
        this.id = uuidv4();
        this.name = data.name;
        this.data = data.data;
        this.properties = new CustomImageProperty(canvasModel, data);
    }

    getData(){
        return this.data;
    }

    getName(){
        return this.name;
    }

    getProperties(){
        return this.properties;
    }
}

interface CustomImageProperty extends IObjectOptions{}
class CustomImageProperty{
    constructor(canvasModel: CanvasModelType, data: DataType){
        this.left = canvasModel.width * canvasModel.scaleFactor / 2;
        this.top = canvasModel.height * canvasModel.scaleFactor / 2;
        this.originX = 'center';
        this.originY = 'center';
        this.scaleX = data.scaleFactor;
        this.scaleY = data.scaleFactor;
    }
}
