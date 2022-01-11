import React, {useState,  useContext } from "react";
import VariosGastosLista from "./VariosGastosLista";
import VariosGastosAdd from "./VariosGastosAdd";
import ExpensesContext from "../../../context/ExpensesContext";

const VariosGastosHome = () => {

    const [registrar, setRegistrar] = useState(false);

    const { estatusId } = useContext(ExpensesContext);

    const onRegistrar = (e) => {
        e.preventDefault();
        setRegistrar( !registrar );
    }
    
    return (
        <div>
            <h3>Gastos Varios</h3>
            <VariosGastosLista />
            { (estatusId === 'A') && <button onClick={onRegistrar}>+</button>}
            {registrar && <VariosGastosAdd />}
        </div>
    );
}

export { VariosGastosHome as default };