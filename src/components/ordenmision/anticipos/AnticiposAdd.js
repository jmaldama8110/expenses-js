import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AnticiposForm from "./AnticiposForm";

const AnticiposAdd = () => {

    const { dispatchAnticipos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{
        dispatchAnticipos( {
            type: 'ADD_ANTICIPO',
            ...data
        });

    }

    return (
        <div>
            <AnticiposForm onSubmit={onSubmit} />
        </div>
    );
}

export { AnticiposAdd as default };