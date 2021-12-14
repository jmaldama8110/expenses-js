
const EsquemasReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_ESQUEMAS':
            return action.esquemas;
        case 'ADD_ESQUEMA':
            return [
                ...state,
                {
                    _id: action._id,
                    empresa_id: action.empresa_id,
                    descripcion: action.descripcion,
                    anticipos_cr: action.anticipos_cr,
                    anticipos_ab: action.anticipos_ab,
                    anticipos_tope: action.anticipos_tope,
                    anticipos_desc: action.anticipos_desc,
                
                    transporte_cr: action.transporte_cr,
                    transporte_ab: action.transporte_ab,
                    transporte_tope: action.transporte_tope,
                    transporte_desc: action.transporte_desc,
                
                    recepcion_cr: action.recepcion_cr,
                    recepcion_ab: action.recepcion_ab,
                    recepcion_tope: action.recepcion_tope,
                    recepcion_desc: action.recepcion_desc,
                
                    hospedaje_cr: action.hospedaje_cr,
                    hospedaje_ab: action.hospedaje_ab,
                    hospedaje_tope: action.hospedaje_tope,
                    hospedaje_desc: action.hospedaje_desc,
                
                    alimentos_cr: action.alimentos_cr,
                    alimentos_ab: action.alimentos_ab,
                    alimentos_tope: action.alimentos_tope,
                    alimentos_desc: action.alimentos_desc,
                    
                    nodeducibles_cr: action.nodeducibles_cr,
                    nodeducibles_ab: action.nodeducibles_ab,
                    nodeducibles_tope: action.nodeducibles_tope,
                    nodeducibles_desc: action.recepcion_desc,
                
                    mtto_vehiculos_cr: action.mtto_vehiculos_cr,
                    mtto_vehiculos_ab: action.mtto_vehiculos_ab,
                    mtto_vehiculos_tope: action.mtto_vehiculos_tope,
                    mtto_vehiculos_desc: action.mtto_vehiculos_desc,
                
                    iva_cr: action.iva_cr,
                    iva_ab: action.iva_ab,
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
