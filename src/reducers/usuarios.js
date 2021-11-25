
const UsuariosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_USUARIOS':
            return action.usuarios
        case 'ADD_USUARIO':
            return [
                ...state,
                {
                    _id: action._id,
                    nombre: action.nombre,
                    apellido_materno: action.apellido_materno,
                    apellido_paterno: action.apellido_paterno,
                    email: action.correo,
                    password: action.password,
                    renovar_password: action.renovar_password,
                    nivel_autorizacion: action.nivel_autorizacion
                }
            ]
        case 'REMOVE_USUARIO':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { UsuariosReducer as default};
