
const VariosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_VARIOS':
            return action.varios
        case 'ADD_VARIOS':
            return [
                ...state,
                {
                    _id: action._id,
                    empresa: action.empresa,
                    descripcion: action.descripcion,
                    cuenta: action.cuenta,
                    subcuenta: action.subcuenta,
                    centrocosto: action.centrocosto
                }
            ]
        case 'REMOVE_VARIOS':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { VariosReducer as default};
