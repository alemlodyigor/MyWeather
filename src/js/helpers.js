export const getJSON = async function (url) {
    try {
        const result = await fetch(url);
        const data = await result.json();

        return data;

    } catch (err) {
        throw err;
    }
}
