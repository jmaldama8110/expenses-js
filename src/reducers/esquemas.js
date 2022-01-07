
const EsquemasReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_ESQUEMAS':
            return action.esquemas;
        case 'ADD_ESQUEMA':
            return [
                ...state,
                {
                    _id: action._id,
                    empresa: action.empresa,
                    anticipos_banco: action.anticipos_banco,
                    descripcion: action.descripcion,
                    anticipos_cuenta: action.anticipos_cuenta,
                    anticipos_subcuenta: action.anticipos_subcuenta,
                    anticipos_tope: action.anticipos_tope,
                    anticipos_desc: action.anticipos_desc,
                
                    transporte_cuenta: action.transporte_cuenta,
                    transporte_subcuenta: action.transporte_subcuenta,
                    transporte_tope: action.transporte_tope,
                    transporte_desc: action.transporte_desc,
                
                    recepcion_cuenta: action.recepcion_cuenta,
                    recepcion_subcuenta: action.recepcion_subcuenta,
                    recepcion_tope: action.recepcion_tope,
                    recepcion_desc: action.recepcion_desc,
                
                    hospedaje_cuenta: action.hospedaje_cuenta,
                    hospedaje_subcuenta: action.hospedaje_subcuenta,
                    hospedaje_tope: action.hospedaje_tope,
                    hospedaje_desc: action.hospedaje_desc,
                
                    alimentos_cuenta: action.alimentos_cuenta,
                    alimentos_subcuenta: action.alimentos_subcuenta,
                    alimentos_tope: action.alimentos_tope,
                    alimentos_desc: action.alimentos_desc,
                    
                    nodeducibles_cuenta: action.nodeducibles_cuenta,
                    nodeducibles_subcuenta: action.nodeducibles_subcuenta,
                    nodeducibles_tope: action.nodeducibles_tope,
                    nodeducibles_desc: action.recepcion_desc,
                
                    mtto_vehiculos_cuenta: action.mtto_vehiculos_cuenta,
                    mtto_vehiculos_subcuenta: action.mtto_vehiculos_subcuenta,
                    mtto_vehiculos_tope: action.mtto_vehiculos_tope,
                    mtto_vehiculos_desc: action.mtto_vehiculos_desc,
                
                    iva_cuenta: action.iva_cuenta,
                    iva_subcuenta: action.iva_subcuenta,
                    iva_desc: action.iva_desc
        
                }
            ]
        

        case 'EDIT_ESQUEMA':
            
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

        case 'REMOVE_ESQUEMA':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { EsquemasReducer as default};
