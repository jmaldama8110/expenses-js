
const VariosGastosReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_VARIOS_GASTOS':
            return action.varios_gastos
        case 'ADD_VARIOS_GASTOS':
            return [
                ...state,
                {
                    _id: action._id,
                    varios_id: action.varios_id,
                    descripcion: action.descripcion,
                    cuenta: action.cuenta,
                    subcuenta: action.subcuenta,
                    centrocosto: action.centrocosto,
                    importe: action.importe,
                    subtotal: action.subtotal,
                    iva: action.iva,
                    fecha_comprobante: action.fecha_comprobante,
                    concepto: action.concepto
                }
            ]
            
        case 'EDIT_VARIOS_GASTOS':
            return state.map((item) => {
                if (item._id === action._id) {
                    return {
                        ...item,
                        ...action.edit_object
                    };
                } else {
                    return item;
                }
            });


        case 'REMOVE_VARIOS_GASTOS':
            return state.filter(ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { VariosGastosReducer as default };
