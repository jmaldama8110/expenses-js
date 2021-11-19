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

// export { AxiosExpenseApi  as default };