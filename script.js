function md5(str) {
    return CryptoJS.MD5(str).toString();
}


async function fetchData(callback, character) {

    const publicKey = '856c111d88c97a2b6c16f9df2cf670c6';
    const privateKey = '6d01c54d367bed21cfa26a833591f6022b9a1f38';
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);

    const apiUrl = `${baseUrl}?name=${character}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        callback(null, data);
    } catch (error) {
        callback (error, null);
    }
}

const handleData = (error, data) => {
    const dataInfoElement = document.getElementById('character');

    if (error) {
        dataInfoElement.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    } else {
        if (data.data.results.length > 0) {
            const characterData = data.data.results[0];
            dataInfoElement.innerHTML = `<p>Name: ${characterData.name} </p>
                                        <p>Description: ${characterData.description}</p>`;
        } else {
            dataInfoElement.innerHTML = '<p>No data found for the character.</p>';
        }
    }
}

const updateData = () => {
    fetchData(handleData, 'wolverine');
}

updateData();

setInterval(updateData, 3000);