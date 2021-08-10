import React from 'react';


const Comprobante = ({ comprobante, removeComprobante }) => {
    return (
        <div>
            <div className="gridcontent">
                <p>{comprobante.folio}</p>
                <p>{comprobante.fecha_aplicacion}</p>
                <p>{comprobante.concepto}</p>
                <p>{comprobante.fecha_comprobante}</p>
                <p>{comprobante.importe}</p>
                <p>{comprobante.subtotal}</p>
                <p>{comprobante.iva}</p>
            </div>
                <button onClick={() => removeComprobante(comprobante.folio)}>X</button>
        </div>
    );
}

export default Comprobante;
