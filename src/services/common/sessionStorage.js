const usernameKey = "USERNAME";
const tokenKey = "TOKEN";

const addUser = (username, token) => {
    sessionStorage.setItem(usernameKey, username);
    sessionStorage.setItem(tokenKey, token)
};

const getUsername = () => {
    return sessionStorage.getItem(usernameKey);
};

const isLogin = () => {
    return sessionStorage.getItem(tokenKey) != null;
};

const getToken = () => {
    return sessionStorage.getItem(tokenKey);
};

const removeUser = () => {
    sessionStorage.removeItem(usernameKey);
    sessionStorage.removeItem(tokenKey);
};

export {
    addUser,
    isLogin,
    removeUser,
    getToken,
    getUsername
}