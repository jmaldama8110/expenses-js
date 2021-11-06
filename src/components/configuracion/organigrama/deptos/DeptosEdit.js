
import React, { useEffect, useState } from "react";
import { history } from "../../../../router/AppRouter";
import DeptosForm from './DeptosForm';

const DeptosEdit = ({ match })=> {

    const [deptos, setDeptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('deptos'))
        if( localData ) {
            setDeptos(localData);
            setLoading(false);
        }
        //////

    },[]);

    const OnSubmit = (data) => {
        
        const new_deptos = deptos.map( depto =>{
            if( depto.id === data.id) {
                return {
                    ...depto,
                    ...data
                }
            }
            else{
                return depto;
            }
        });

        localStorage.setItem('deptos', JSON.stringify(new_deptos));
        history.push('/organigrama');

    }

    return (
        <div>
            <h1>Editar Departamento</h1>
            
            {
                !loading &&
                <DeptosForm
                depto={deptos.find( p => p.id === match.params.id ) }
                onSubmit={OnSubmit}
            />}
        </div>
    );
}

export { DeptosEdit as default };