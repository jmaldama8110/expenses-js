import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AnticiposForm from "./AnticiposForm";

const AnticiposEdit = ( { anticipo, setEditar } ) => {

    const { dispatchAnticipos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{

        dispatchAnticipos( {
            type: 'EDIT_ANTICIPO',
            _id: anticipo._id,
            edit_object: data
        });

        setEditar(false);

    }

    return (
        <div>
            <AnticiposForm anticipo={anticipo} onSubmit={onSubmit} />
        </div>
    );
}

export { AnticiposEdit as default };