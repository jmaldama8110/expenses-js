
const EmpresasReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_EMPRESAS':
            return action.deptos
        case 'ADD_EMPRESA':
            return [
                ...state,
                {
                    id: action.id,
                    titulo: action.titulo,
                }
            ]
        case 'REMOVE_EMPRESA':
            return state.filter( ccitem => ccitem.id !== action.id)
        default:
            return state
    }
}


export { EmpresasReducer as default};
