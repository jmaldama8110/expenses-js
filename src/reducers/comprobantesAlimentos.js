
const comprobantesAlimentosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_COMPROBANTES_ALIMENTOS':
            return action.comprobantes
        case 'ADD_COMPROBANTE_ALIMENTOS':
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
        case 'REMOVE_COMPROBANTE_ALIMENTOS':
            return state.filter( comprobante => comprobante.folio !== action.folio)

        default:
            return state
    }
}


export {comprobantesAlimentosReducer as default};
