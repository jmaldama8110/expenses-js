
const ComprobantesReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_COMPROBANTES':
            return action.comprobantes
        case 'ADD_COMPROBANTE':
            return [
                ...state,
                {
                    tipo: action.tipo,
                    fecha_aplicacion: action.fecha_aplicacion,
                    concepto: action.concepto,
                    fecha_comprobante: action.fecha_comprobante,
                    importe: action.importe,
                    subtotal: action.subtotal,
                    iva: action.iva
                }
            ]

        case 'EDIT_COMPROBANTE':
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
    
        case 'REMOVE_COMPROBANTE':
            return state.filter( comprobante => comprobante._id !== action._id)

        default:
            return state
    }
}



export {ComprobantesReducer as default};
