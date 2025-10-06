const URL = `http://localhost:3000`;
export const getAll = async () => {
    try {
        const response = await fetch(URL);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e.message);
    }
}
export const searchUsers = async (searchTerm) => {
    try {
        const response = await fetch(`${URL}?term=${encodeURIComponent(searchTerm)}`);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e.message);
    }
}