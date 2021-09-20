
const ComprobantesReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_COMPROBANTES':
            return action.comprobantes
        case 'ADD_COMPROBANTE':
            return [
                ...state,
                {
                    folio: action.folio,
                    fecha_aplicacion: action.fecha_aplicacion,
                    concepto: action.concepto,
                    fecha_comprobante: action.fecha_comprobante,
                    importe: action.importe,
                    subtotal: action.subtotal,
                    iva: action.iva
                }
            ]
        case 'REMOVE_COMPROBANTE':
            return state.filter( comprobante => comprobante.folio !== action.folio)

        default:
            return state
    }
}


export {ComprobantesReducer as default};
