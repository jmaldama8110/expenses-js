
const BancosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_BANCOS':
            return action.bancos
        case 'ADD_BANCO':
            return [
                ...state,
                {
                    _id: action._id,
                    numero_cuenta: action.numero_cuenta,
                    clabe: action.clabe,
                    banco: action.banco
                }
            ]
        case 'REMOVE_BANCO':
            return state.filter( ccitem => ccitem._id !== action._id)
        default:
            return state
    }
}


export { BancosReducer as default};
