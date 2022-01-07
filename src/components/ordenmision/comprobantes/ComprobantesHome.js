import React, {useState,  useContext } from "react";
import ComprobantesLista from "./ComprobantesLista";
import ComprobantesAdd from "./ComprobantesAdd";
import ExpensesContext from "../../../context/ExpensesContext";

const ComprobantesHome = () => {

    const [registrar, setRegistrar] = useState(false);

    const { estatusId } = useContext(ExpensesContext);

    const onRegistrar = (e) => {
        e.preventDefault();
        setRegistrar( !registrar );
    }
    
    return (
        <div>
            <h3>Comprobantes</h3>
            <ComprobantesLista />
            { (estatusId ==='P' || estatusId === 'A') && <button onClick={onRegistrar}>+</button>}
            {registrar && <ComprobantesAdd />}
        </div>
    );
}

export { ComprobantesHome as default };