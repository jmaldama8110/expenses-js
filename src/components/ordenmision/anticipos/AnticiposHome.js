import React, { useContext } from "react";
import ExpenseContext from '../../../context/ExpensesContext';


const AnticiposHome = () => {
    
    const { anticipos } = useContext(ExpenseContext); 

    return (
        <div>
            <h3>Anticipos </h3>
            <div>
                {
                    anticipos.map( (ant,i) => <p key={i}>+ {ant.importe} {ant.concepto} </p>)
                }
            </div>
            <form>
                <label>Fecha Aplicacion</label>
                <input 
                    type="date"
                ></input>
                <label>Tipo</label>
                <select>
                    <option>Anticipo</option>
                    <option>Devolucion</option>
                </select>
                <label>Importe</label>
                <input 
                    type="text"
                ></input>
                <label>Concepto</label>
                <input 
                    type="text"
                ></input>
                <button>Agregar</button>
            </form>

        </div>

    );
}

export { AnticiposHome as default };