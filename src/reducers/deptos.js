
const DeptosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_DEPTOS':
            return action.deptos
        case 'ADD_DEPTO':
            return [
                ...state,
                {
                    _id: action._id,
                    titulo: action.titulo,
                }
            ]
        case 'REMOVE_DEPTO':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { DeptosReducer as default};
