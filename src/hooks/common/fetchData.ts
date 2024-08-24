export const fetchData = async (endpoint: string, setter: (val: string) => void) => {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            // TODO Handle network errors
            //setError('Network response was not ok');
            return;
        }
        const result = await response.json();
        setter(result);
    } catch (error: any) {
        // TODO handle error
        console.log('There was a problem with the fetch operation:', error.message);
    }
};
