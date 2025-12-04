const baseUrl = 'http://localhost:3001';
export const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const jsonHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem("jwt");
    return token
        ? { ...jsonHeaders, Authorization: `Bearer ${token}` }
        : jsonHeaders;
};

export const register = ({ name, avatar, email, password }) => {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ name, avatar, email, password }),
    }).then(handleServerResponse);
}

export const login = ({ email, password }) => {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ email, password }),
    }).then(handleServerResponse);
};

export const getCurrentUser = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
    }).then(handleServerResponse);
};

export const getItems = () =>
    fetch(`${baseUrl}/items`, { headers: jsonHeaders }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) => {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            name,
            imageUrl,
            weather,
        }),
    }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
    return fetch(`${baseUrl}/items/${itemID}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    }).then(handleServerResponse);
};

export const editUserProfile = ({ name, avatarURL }) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, avatar: avatarURL }),
    }).then(handleServerResponse);
};
