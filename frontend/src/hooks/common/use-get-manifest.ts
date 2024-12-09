import {useEffect, useState} from "react";
import {Manifest} from "@/models/manifest/manifest";
import {getManifest} from "@/service/feature/get-manifest";

export const useGetManifest = (id: string, partitionKey: string) => {
    const [manifest, setManifest] = useState<Manifest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getManifest(id, partitionKey)
            .then(m => setManifest(m))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, partitionKey]);

    return { manifest, loading, error };
}
