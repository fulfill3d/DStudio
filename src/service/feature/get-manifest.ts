import {httpRequest} from "@/service/common/http-request";
import {dStudioEndpoints} from "@/utils/endpoints";
import {Manifest} from "@/models/manifest/manifest";

export const getManifest = async (id: string, partitionKey: string) => {
    try {
        const response = await httpRequest(
            dStudioEndpoints.GetManifest(id, partitionKey).Uri,
            dStudioEndpoints.GetManifest(id, partitionKey).Method,
            null,
            undefined,
            undefined
        );
        return Manifest.fromJSON(response);
    } catch (error) {
        throw new Error("Failed to fetch product manifest.");
    }
}
