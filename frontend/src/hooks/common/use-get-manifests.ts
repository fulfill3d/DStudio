import {useEffect, useState} from "react";
import {Manifest} from "@/models/manifest/manifest";
import {getManifests} from "@/service/feature/get-manifests";

export const useGetManifests = () => {
    const [manifests, setManifests] = useState<Manifest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getManifests()
            .then(m => setManifests(m))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { manifests, loading, error };
}
