import React, { useContext, useState } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AnticiposEdit from './AnticiposEdit';
import { formatoPesos } from '../../../utils/numberFormatter';

const AnticiposItem = ({ item }) => {

    const { dispatchAnticipos } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchAnticipos({
            type: 'REMOVE_ANTICIPO',
            _id: item._id
        })
    }

    const toggleEdit = (e) => {
        e.preventDefault();
        setEditar(!editar);
    }
    return (
        <li>

            <button onClick={onEliminar}>x</button>
            <button onClick={toggleEdit}>?</button>
            {formatoPesos( parseFloat(item.importe) )} {item.concepto}

            {editar && <AnticiposEdit anticipo={item} setEditar={setEditar} />}
        </li>

    );
}

export { AnticiposItem as default };