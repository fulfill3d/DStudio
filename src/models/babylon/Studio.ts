import '@babylonjs/loaders/glTF';
import {
    Scene as BabylonScene
} from "@babylonjs/core";
import {Component, ComponentSettingsType} from "@/models/babylon/Component";
import {Scene} from "@/models/babylon/Scene";

export class Studio {

    private readonly product_manifest: any;
    private readonly scene_manifest: any;
    private readonly manifest: any;
    private readonly components: Component[];
    private readonly scene: Scene;
    private babylon_scene: BabylonScene | undefined;
    private loaded: boolean;

    constructor(product_manifest: any, scene_manifest: any) {
        this.product_manifest = product_manifest;
        this.scene_manifest = scene_manifest;
        this.manifest = this.mapper();

        this.components = this.manifest.components.map((comp: ComponentSettingsType) => {return new Component(comp)});
        this.scene = new Scene(this.manifest.scene);
        this.loaded = false;

    }

    onRender() {
        // TODO: The deleted onRender method will be here
    }

    onSceneReady(scene: BabylonScene) {
        this.babylon_scene = scene;

        this.scene.setup(this.babylon_scene);

        this.loadComponents(this.babylon_scene)
            .then(() => { this.loaded = true; })
            .catch((r) => { console.log(r); })
    }

    async loadComponents(scene: BabylonScene){
        for (const component of this.components){
            try {
                await component.loadComponentIntoScene(scene)
            }catch (error){
                //TODO error handling
                console.error("Error loading component:", component, error);
            }
        }
    }

    async updateTexture(blob: Blob){
        if (this.loaded){
            const design_component = this.components.find(component => component.isDesignComponent());
            try {
                if (design_component && this.babylon_scene){
                    await design_component.updateTexture(blob, this.babylon_scene);
                }
                return this
            } catch (error) {
                // Handle or propagate the error
                throw error; // Propagating the error to be handled in the caller function
            }
        }
    }

    findById(array: any, id: string) {
        return array.find((item: any) => item.id === id)
    }

    mapper(){
        // Destructure the data for easier access
        const { materials, textures, assets, variants, mappings, components } = this.product_manifest;

        // Use the first variant by default if available
        const defaultVariant = variants.length > 0 ? variants[0] : null;

        // Process each test component
        const product = components.map((component: any) => {
            // Find corresponding mesh, material, and texture
            const mesh = this.findById(assets.meshes, component.mesh);
            const material = this.findById(materials, component.material);
            const texture = this.findById(textures, component.texture);

            // Find the variant mapping for the component
            const variantMapping = defaultVariant.mapping;
            const key_pair = mappings.variant[component.name];
            const meshVariant = variantMapping[key_pair];

            // Construct the transformed component
            return {
                id: component.id,
                name: component.name,
                is_design_component: component.is_design_component,
                mesh: {
                    name: 'Node',
                    root_uri: mesh ? mesh.root_uri : '',
                    uri: mesh ? mesh.uri : '',
                    material: {
                        name: `mug_material_${component.id}`,
                        ...material,
                        texture: {
                            name: `mug_texture_${component.id}`,
                            uri: this.findById(assets.images, meshVariant)?.uri || '',
                            ...texture
                        }
                    }
                }
            };
        });

        return { components: product, scene: this.scene_manifest }
    }

    async updateVariant(variantId: number){
        const variant = this.product_manifest.variants.find((variant: any) => variant.id === variantId);
        for (const component of this.components) {
            if (!component.isDesignComponent()){
                const variantMapping = variant.mapping;
                const key_pair = this.product_manifest.mappings.variant[component.getName()];
                const meshVariant = variantMapping[key_pair];
                const uri = this.findById(this.product_manifest.assets.images, meshVariant)?.uri || ''
                await component.updateVariant(uri);
            }
        }
    }

}
