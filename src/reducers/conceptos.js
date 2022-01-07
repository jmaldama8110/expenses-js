
const ConceptosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_CONCEPTOS':
            return action.conceptos
        case 'ADD_CONCEPTO':
            return [
                ...state,
                {
                    _id: action._id,
                    tipo_concepto: action.tipo_concepto,
                    tope_importe: action.tope_importe
                }
            ]

        case 'EDIT_CONCEPTO':
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
    
        case 'REMOVE_CONCEPTO':
            return state.filter( item => item._id !== action._id)

        default:
            return state
    }
}



export {ConceptosReducer as default};
