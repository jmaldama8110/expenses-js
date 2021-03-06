import axios from 'axios';


export const AxiosExpenseApi = () => {
    
    const usuario = JSON.parse( sessionStorage.getItem("usuario") );

    if( usuario ){
        const tokenString = `Bearer ${usuario.token}`;
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
        axios.defaults.headers.common['Authorization'] = tokenString;

        return axios;
    }

    return ;

}

export const getUsuarioSession = () => {
    const usuario = JSON.parse( sessionStorage.getItem("usuario") );
    return usuario; 
}

export const setUsuarioSession = (us,token) => {
    sessionStorage.setItem("usuario",JSON.stringify({
        info: us,
        token } ));
}

export function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
