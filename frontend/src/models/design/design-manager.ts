import {fabric} from "fabric";
import {IDesignBlueprint} from "@/interfaces/design/i-design-blueprint";
import {CustomDesign} from "@/models/design/custom-design";
import {CustomText} from "@/models/design/custom-text";
import {CustomImage} from "@/models/design/custom-image";
import {Canvas} from "@/models/canvas/canvas";

export class DesignManager{

    private static design_list: CustomDesign[]

    static initializeDesignList(){
        this.design_list = [];
    }

    static addDesign(design: CustomDesign){
        this.design_list.push(design);

        return this.createDesignBlueprint(design);
    }

    static removeDesign(designId: string){
        this.design_list = this.design_list.filter(_design => _design.id !== designId);
    }

    static getDesign(id: string): CustomDesign | undefined {
        return this.design_list.find(design => design.id === id);
    }

    static loadText(textObject: any, canvasModel: Canvas): Promise<CustomDesign>{
        // TODO: handle rejection
        return new Promise((resolve, reject) => {
            if (textObject){
                const customDesign = new CustomDesign();
                customDesign.generateCustomText(canvasModel, textObject);
                resolve(customDesign);
            }else {
                reject(new Error("No file provided"))
            }
        })
    }

    static loadImage(file: any, canvasModel: Canvas): Promise<CustomDesign> {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.loadImageMethod(file, reader, canvasModel)
                        .then(customDesign => resolve(customDesign))
                        .catch(error => reject(error));
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            } else {
                reject(new Error("No file provided"));
            }
        });
    }

    static getScaleFactor (img: HTMLImageElement, canvasModel: Canvas){

        const imgWidth = img.width;
        const imgHeight= img.height;

        if (canvasModel){
            const maxScaledWidth = canvasModel.width * canvasModel.scaleFactor;
            const maxScaledHeight = canvasModel.height * canvasModel.scaleFactor;

            if (imgWidth <= maxScaledWidth && imgHeight <= maxScaledHeight) {
                return 1;
            }

            const widthRatio = maxScaledWidth / imgWidth;
            const heightRatio = maxScaledHeight / imgHeight;

            return Math.min(widthRatio, heightRatio);
        }

        return 1;
    }

    static loadImageMethod (file: any, reader: FileReader, canvasModel: Canvas): Promise<CustomDesign> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                // Ensure reader.result is treated as a string.
                if (typeof reader.result === 'string') {
                    const scaleFactor = this.getScaleFactor(img, canvasModel);
                    const customDesign = new CustomDesign();

                    customDesign.generateCustomImage(canvasModel, {
                        data: reader.result,
                        name: file.name,
                        scaleFactor: scaleFactor,
                        controls: {
                            ...fabric.Textbox.prototype.controls,
                            deleteControl: fabric.Object.prototype.controls.deleteControl
                        }
                    });

                    resolve(customDesign);
                } else {
                    // Handle the case where reader.result is not a string.
                    reject(new Error("FileReader result is not a string."));
                }
            };
            img.onerror = reject;
            if (typeof reader.result === 'string') {
                img.src = reader.result;
            } else {
                // Handle the case where reader.result is not a string.
                reject(new Error("FileReader result is not a string."));
            }
        });
    }

    static createDesignBlueprint(design: CustomDesign): IDesignBlueprint {
        const blueprint: IDesignBlueprint = {
            id: design.id,
            type: design.type,
        };

        switch (blueprint.type) {
            case 'text':
                const object = design.object as CustomText;
                blueprint.text = object.text;
                break;
            case 'image':
                const _object = design.object as CustomImage;
                blueprint.name = _object.name;
                blueprint.data = _object.data; // Consider serializing this if it's non-serializable.
                break;
        }

        return blueprint;
    }

}
