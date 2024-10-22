import {Nullable} from "@babylonjs/core";
import {fabric} from "fabric";
import {FObject} from "@/interfaces/model/fabric/f-object";
import {CustomDesign} from "@/models/design/custom-design";
import {CustomText} from "@/models/design/custom-text";
import {CustomImage} from "@/models/design/custom-image";
import {StudioManager} from "@/models/babylon/studio-manager";
import {Canvas} from "@/models/canvas/canvas";

export class FCanvas extends fabric.Canvas {
    private static instance: fabric.Canvas;
    private static reference: Nullable<HTMLCanvasElement>;
    private static options: Nullable<Canvas>;

    private constructor() {
        super(null);
    }

    static initialize(){
        FCanvas.instance = new FCanvas();
        const ref = FCanvas.reference;
        const opt = FCanvas.options;
        if (ref && opt){
            FCanvas.instance.initialize(ref, opt);
            FCanvas.instance.setDimensions(
                {
                    width: opt.width * opt.scaleFactor,
                    height: opt.height * opt.scaleFactor
                }, {
                    cssOnly: true
                }
            );

            FCanvas.instance.setZoom(1 / opt.scaleFactor);
            FCanvas.updateStudioTexture();
        }
    }

    static getInstance(): fabric.Canvas {
        if (!FCanvas.instance){
            FCanvas.instance = new FCanvas();
        }
        return FCanvas.instance;
    }

    static getOptions(){
        return FCanvas.options;
    }

    static getReference(){
        return FCanvas.reference;
    }

    static setOptions(options: Canvas){
        FCanvas.options = options;
    }

    static setReference(ref: HTMLCanvasElement){
        FCanvas.reference = ref;
    }

    static setCustomControls(dispatch: (id: string) => void){
        FCanvas.initCustomDeleteControl(dispatch);
    }

    private static initCustomDeleteControl(dispatch: (id: string) => void){
        if (!fabric.Object.prototype.controls.deleteControl) {
            fabric.Object.prototype.controls.deleteControl = new fabric.Control({
                x: 0.5,
                y: -0.5,
                offsetY: -16,
                cursorStyle: 'pointer',
                mouseUpHandler: function (_, transformData) {
                    if (transformData && transformData.target && transformData.target.canvas) {
                        const canvas = transformData.target.canvas;
                        const objectToRemove = transformData.target as FObject
                        canvas.remove(objectToRemove);
                        canvas.renderAll();
                        dispatch(objectToRemove.id);
                        return true
                    }
                    return false
                },
                render: function (ctx, left, top) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(left - 8, top - 8, 16, 16);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(left - 6, top - 6, 12, 12);
                    ctx.fillStyle = 'red';
                    ctx.moveTo(left - 4, top - 4);
                    ctx.lineTo(left + 4, top + 4);
                    ctx.moveTo(left + 4, top - 4);
                    ctx.lineTo(left - 4, top + 4);
                    ctx.stroke();
                }
            });
        }
    }

    private static updateStudioTexture(){
        const ref = FCanvas.getReference();
        const studioInstance = StudioManager.getStudioInstance();
        const canvas = FCanvas.getInstance();
        canvas.forEachObject((obj) => obj.set({ hasControls: false, hasBorders: false }));
        canvas.renderAll();
        if (ref && studioInstance){
            ref.toBlob(
                async (blob) => {
                    if (blob) {
                        await studioInstance.updateTexture(blob);
                    }
                },
                'image/png',
                1.0);
        }
        canvas.forEachObject((obj) => obj.set({ hasControls: true, hasBorders: true }));
        canvas.renderAll();
    }

    static addDesign(design: CustomDesign){
        switch(design.type){
            case 'image':
                this.addImageDesign(design);
                break;
            case 'text':
                this.addTextDesign(design);
                break;
        }
    }

    static addTextDesign(design: CustomDesign){
        const canvas = FCanvas.getInstance();
        if (canvas){
            // Preprocess text to replace spaces with non-breaking spaces
            const object = design.object as CustomText;
            const text = object.text;
            const properties = object.properties as any; //TODO implicit type conversion
            const processedText = text.replace(/ /g, '\u00A0');
            const textBox = new fabric.Textbox(processedText, properties) as fabric.Textbox & FObject;
            textBox.set({ id: design.id }); // Set the ID on the Fabric object
            textBox.on('moving', () => FCanvas.moving.call(textBox, canvas));
            textBox.on('scaling', () => FCanvas.scaling.call(textBox, canvas));
            canvas.add(textBox);
            canvas.renderAll();
            FCanvas.updateStudioTexture();
        }
    }

    static addImageDesign(design: CustomDesign){
        const canvas = FCanvas.getInstance();
        if (canvas){
            const object = design.object as CustomImage;
            const data = object.data;
            const properties = object.properties;
            // TODO: any to CustomDesign
            fabric.Image.fromURL(data, (img ) => {
                const fObjectImg = img as fabric.Image & Partial<FObject>;
                fObjectImg.set(properties);
                fObjectImg.set({ id: design.id }); // Set the ID on the Fabric object
                canvas.add(fObjectImg);
                canvas.renderAll();
                // TODO: scale rules
                img.on('moving', () => FCanvas.moving.call(img, canvas));
                // TODO: move rules
                img.on('scaling', () => FCanvas.scaling.call(img, canvas));
                this.updateStudioTexture();
            });
        }
    }

    static removeDesign(designId: string){
        const canvas = FCanvas.getInstance();
        if (canvas){
            const objects = canvas.getObjects() as FObject[];
            const fabricObject = objects.find((obj) => {
                const object = obj as FObject
                return object.id === designId
            });
            if (fabricObject) {
                canvas.remove(fabricObject);
                canvas.renderAll();
            }
            // this.update_design_method(model);
            this.updateStudioTexture();
        }
    }

    static limitObjectMove(object: any){
        const canvasOptions = FCanvas.getOptions();
        const top = object.top;
        const left = object.left;
        if (canvasOptions && top && left){
            object.setCoords();
            const br = object.getBoundingRect();
            if (br.top < 0 || br.left < 0) {
                object.top = Math.max(top, top - br.top);
                object.left = Math.max(left, left - br.left);
            }
            if (br.top + br.height > canvasOptions.height || br.left + br.width > canvasOptions.width) {
                object.top = Math.min(top, canvasOptions.height - br.height + top - br.top);
                object.left = Math.min(left, canvasOptions.width - br.width + left - br.left);
            }
        }
    }

    static moving(this: fabric.Object, fabricCanvas: fabric.Canvas) {
        this.setCoords();
        if (!this.top || !this.left) {
            this.top = 0;
            this.left = 0;
        }
        const br = this.getBoundingRect();
        if (br.top < 0 || br.left < 0) {
            this.top = Math.max(this.top, this.top - br.top);
            this.left = Math.max(this.left, this.left - br.left);
        }
        if (br.top + br.height > fabricCanvas.height! || br.left + br.width > fabricCanvas.width!) {
            this.top = Math.min(this.top, fabricCanvas.height! - br.height + this.top - br.top);
            this.left = Math.min(this.left, fabricCanvas.width! - br.width + this.left - br.left);
        }
        FCanvas.updateStudioTexture();
    }

    static scaling(this: fabric.Object, fabricCanvas: fabric.Canvas){
        console.log('scaling...');
        FCanvas.updateStudioTexture();
    }

}
