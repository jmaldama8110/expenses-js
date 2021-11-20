
const EmpresasReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_EMPRESAS':
            return action.empresas
        case 'ADD_EMPRESA':
            return [
                ...state,
                {
                    _id: action._id,
                    titulo: action.titulo,
                }
            ]
        case 'REMOVE_EMPRESA':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { EmpresasReducer as default};
