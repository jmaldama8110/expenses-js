
const UsuariosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_USUARIOS':
            return action.usuarios
        case 'ADD_USUARIO':
            return [
                ...state,
                {
                    id: action.id,
                    nombre: action.nombre,
                    apellido_materno: action.apellido_materno,
                    apellido_paterno: action.apellido_paterno,
                    email: action.correo,
                    password: action.password,
                    renovar_password: action.renovar_password,
                    nivel_autorizacion: action.nivel_autorizacion,
                    puesto: action.puesto,
                    depto: action.depto,
                    centro_costo: action.centro_costo,
                    autorizador_a: action.autorizador_a,
                    autorizador_b: action.autorizador_b
                }
            ]
        case 'REMOVE_USUARIO':
            return state.filter( ccitem => ccitem.id !== action.id)
        default:
            return state
    }
}


export { UsuariosReducer as default};
