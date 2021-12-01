
const AnticiposReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_ANTICIPOS':
            return action.anticipos;
        case 'ADD_ANTICIPO':
            return [
                ...state,
                {
                    _id: action._id,
                    fecha_aplicacion: action.fecha_aplicacion,
                    tipo_mov: action.tipo_mov,
                    concepto: action.concepto,
                    importe: action.importe,
                    fecha_comprobante: action.fecha_comprobante
                }
            ]
        case 'EDIT_ANTICIPO':
            
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

        case 'REMOVE_ANTICIPO':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { AnticiposReducer as default};
