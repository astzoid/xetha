import { useCallback, useState } from 'react';

export default function useAsyncError() {
    const [_, setError] = useState<any>();

    return useCallback(
        (err) => {
            setError(() => {
                throw err;
            });
        },
        [setError],
    );
}
