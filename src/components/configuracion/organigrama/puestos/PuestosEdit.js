
import React, { useEffect, useState } from "react";
import { history } from "../../../../router/AppRouter";
import PuestosForm from './PuestosForm';

const PuestosEdit = ({ match })=> {

    const [puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('puestos'))
        if( localData ) {
            setPuestos(localData);
            setLoading(false);
        }
        //////

    },[]);

    const OnSubmit = (data) => {
        
        const new_puestos = puestos.map( p =>{
            if( p.id === data.id) {
                return {
                    ...p,
                    ...data
                }
            }
            else{
                return p;
            }
        });

        localStorage.setItem('puestos', JSON.stringify(new_puestos));
        history.push('/organigrama');

    }

    return (
        <div>
            <h1>Editar Puesto</h1>
            
            {
                !loading &&
                <PuestosForm
                puesto={puestos.find( p => p.id === match.params.id ) }
                onSubmit={OnSubmit}
            />}
        </div>
    );
}

export { PuestosEdit as default };