'use client'

import React from 'react';
import { useReactToPrint } from 'react-to-print';

const ComponenteParaImprimir = ({ componenteRef}) => {
    return (
        <div ref={componenteRef} className="contenido-a-imprimir">
            <h1 style={{color: 'orange'}}>Contenido para imprimir</h1>
            <p>Este es un ejemplo de contenido que deseas imprimir.</p>
        </div>
    );
};

const ComponenteDeImpresion = () => {
    const componenteRef = React.useRef(null);

    const handleImprimir = useReactToPrint({
        content: () => componenteRef.current,
    });

    return (
        <div>
            <ComponenteParaImprimir componenteRef={componenteRef} />
            <button onClick={handleImprimir}>Imprimir</button>
        </div>
    );
};

export default ComponenteDeImpresion;

