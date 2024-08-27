import type {Nullable} from "@babylonjs/core/types";
import {Color3} from "@babylonjs/core/Maths/math.color";
import {IBDynamicTextureOption} from "@/types/model/babylon/i-b-dynamic-texture-option";
import {IBTextureOption} from "@/types/model/babylon/i-b-texture-option";

export interface IBMaterialOption{
    id: string;
    name: string;
    isDesignMaterial: boolean;
    /**
     * Intensity of the direct lights e.g. the four lights available in your scene.
     * This impacts both the direct diffuse and specular highlights.
     */
    directIntensity: Nullable<number>;
    /**
     * Intensity of the emissive part of the material.
     * This helps controlling the emissive effect without modifying the emissive color.
     */
    emissiveIntensity: Nullable<number>;
    /**
     * Intensity of the environment e.g. how much the environment will light the object
     * either through harmonics for rough material or through the reflection for shiny ones.
     */
    environmentIntensity: Nullable<number>;
    /**
     * This is a special control allowing the reduction of the specular highlights coming from the
     * four lights of the scene. Those highlights may not be needed in full environment lighting.
     */
    specularIntensity: Nullable<number>;
    /**
     * Specifies the metallic scalar of the metallic/roughness workflow.
     * Can also be used to scale the metalness values of the metallic texture.
     */
    metallic: Nullable<number>;
    /**
     * Specifies the roughness scalar of the metallic/roughness workflow.
     * Can also be used to scale the roughness values of the metallic texture.
     */
    roughness: Nullable<number>;
    /**
     * The color of a material in ambient lighting.
     */
    ambientColor: Nullable<Color3>;
    /**
     * AKA Diffuse Color in other nomenclature.
     */
    albedoColor: Nullable<Color3>;
    /**
     * AKA Specular Color in other nomenclature.
     */
    reflectivityColor: Nullable<Color3>;
    /**
     * The color reflected from the material.
     */
    reflectionColor: Nullable<Color3>;
    /**
     * The color emitted from the material.
     */
    emissiveColor: Nullable<Color3>;
    /**
     * AKA Glossiness in other nomenclature.
     */
    microSurface: Nullable<number>;

    textureOptions: IBDynamicTextureOption | IBTextureOption
}
