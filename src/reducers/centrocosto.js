
const CentroCostoReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_CC':
            return action.centroscosto
        case 'ADD_CC':
            return [
                ...state,
                {
                    _id: action._id,
                    nombre: action.nombre,
                    codigo: action.codigo,
                    activo: action.activo
                }
            ]
        case 'REMOVE_CC':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { CentroCostoReducer as default};
