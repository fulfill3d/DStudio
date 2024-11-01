import {httpRequest} from "@/service/common/http-request";
import {dStudioEndpoints} from "@/utils/endpoints";
import {Manifest} from "@/models/manifest/manifest";

export const getManifests = async () => {
    try {
        const response = await httpRequest(
            dStudioEndpoints.GetManifests.Uri,
            dStudioEndpoints.GetManifests.Method,
            null,
            undefined,
            undefined
        );
        return response.map((manifest: Manifest) => Manifest.fromJSON(manifest));
    } catch (error) {
        throw new Error("Failed to fetch active product manifests.");
    }
}
