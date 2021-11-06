
const PuestosReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_PUESTOS':
            return action.puestos
        case 'ADD_PUESTO':
            return [
                ...state,
                {
                    id: action.id,
                    titulo: action.titulo,
                    usuario: action.usuario,
                    depto: action.depto,
                    parent: action.parent,
                    isroot: action.isroot,
                    asignado: action.asignado

                }
            ]
        case 'REMOVE_PUESTO':
            return state.filter( ccitem => ccitem.id !== action.id)
        default:
            return state
    }
}


export { PuestosReducer as default};
