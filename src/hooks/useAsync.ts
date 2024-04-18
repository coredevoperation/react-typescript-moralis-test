import { useSetAtom } from "jotai";
import { loadingAtom } from "../store";
import { useCallback } from "react";

export const useAsync = () => {
    const setLoading = useSetAtom(loadingAtom);

    const call = useCallback(async (callback: () => void) => {
        setLoading(true);
        const result = await callback();
        setLoading(false);

        return result;
    }, []);

    return call;
}
