
import React, { useEffect, useState } from "react";
import { history } from '../../../router/AppRouter';
import EmpresasForm from './EmpresasForm';

const EmpresasEdit = ({ match })=> {

    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('empresas'))
        if( localData ) {
            setEmpresas(localData);
            setLoading(false);
        }
        //////

    },[]);

    const OnSubmit = (data) => {
        
        const new_empresas = empresas.map( emp =>{
            if( emp.id === data.id) {
                return {
                    ...emp,
                    ...data
                }
            }
            else{
                return emp;
            }
        });

        localStorage.setItem('empresas', JSON.stringify(new_empresas));
        history.push('/empresas');

    }

    return (
        <div>
            <h1>Editar Empresa</h1>
            
            {
                !loading &&
                <EmpresasForm
                empresa={empresas.find( p => p.id === match.params.id ) }
                onSubmit={OnSubmit}
            />}
        </div>
    );
}

export { EmpresasEdit as default };