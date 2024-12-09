import {HttpMethod} from "@/service/common/http-request";

interface Endpoint {
    Uri: string;
    Method: HttpMethod;
}

export const dStudioEndpoints = {
    GetManifests: {
        Uri: `${process.env.NEXT_PUBLIC_DSTUDIO_API_ENDPOINT}api/manifest/get-all`,
        Method: HttpMethod.GET,
    } as Endpoint,
    GetManifest: (Id: string, PartitionKey: string): Endpoint => ({
        Uri: `${process.env.NEXT_PUBLIC_DSTUDIO_API_ENDPOINT}api/manifest?id=${Id}&partitionKey=${PartitionKey}`,
        Method: HttpMethod.GET,
    }) as Endpoint
};
