
const DeptosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_DEPTOS':
            return action.deptos
        case 'ADD_DEPTO':
            return [
                ...state,
                {
                    id: action.id,
                    titulo: action.titulo,
                }
            ]
        case 'REMOVE_DEPTO':
            return state.filter( ccitem => ccitem.id !== action.id)
        default:
            return state
    }
}


export { DeptosReducer as default};
