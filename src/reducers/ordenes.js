
const OrdenesReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_ORDENES':
            return action.ordenes
        case 'ADD_ORDEN':
            return [
                ...state,
                {
                    folio: action.folio,
                    fecha_aplicacion: action.fecha_aplicacion,
                    empleado: action.centro_costo,
                    centro_costo: action.centro_costo,
                    mision_desde: action.mision_desde,
                    mision_hasta: action.mision_hasta,
                    via_transporte: action.via_transporte,
                    descripcion: action.descripcion,
                    anticipos: action.anticipos,
                    gastos_total: action.gastos_total,
                    saldo: action.saldo,
                    alimentos: action.alimentos,
                    transportes: action.transportes,
                    hospedajes: action.hospedajes,
                    otros: action. otros
                }
            ]
        case 'REMOVE_ORDEN':
            return state.filter( orden => orden.folio !== action.folio)

        default:
            return state
    }
}


export {OrdenesReducer as default};
