
const AutorizacionesReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_AUTORIZACIONES':
            return action.autorizaciones;
        case 'ADD_AUTORIZACION':
            return [
                ...state,
                {
                    _id: action._id,
                    fecha_aplicacion: action.fecha_aplicacion,
                    usuario_id: action.usuario_id,
                    nombre_autorizador: action.nombre_autorizador,
                    nivel_autorizacion: action.nivel_autorizacion,
                    estatus: action.estatus,
                    orden_estatus: action.orden_estatus
                }
            ]
        case 'EDIT_AUTORIZACION':
            
            return state.map( (item) => {
                if (item._id === action._id) {
                    return {
                            ...item,
                            ...action.edit_object   
                        };
                    } else {
                        return item;
                    }
                });

        case 'REMOVE_AUTORIZACION':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { AutorizacionesReducer as default};
