import React, { useContext, useState } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AnticiposEdit from './AnticiposEdit';

const AnticiposItem = ( {item}) => {
    
    const { dispatchAnticipos } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchAnticipos({
            type: 'REMOVE_ANTICIPO',
            _id: item._id
        })
    }

    const toggleEdit = (e)=> {
        e.preventDefault();
        setEditar( !editar );
    }
    return  (
    <div>
        <p>
            <button onClick={onEliminar}>x</button>
            <button onClick={toggleEdit}>?</button>
            {item.importe} {item.concepto}
        </p>
        {editar && <AnticiposEdit anticipo={item} setEditar={setEditar} />}
    </div>

    );
}

export { AnticiposItem as default };