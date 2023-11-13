import React, { useState, useEffect } from 'react';
import { getAllRawMaterials } from './api/api';

function FormularioCompras() {
    const [numeroBoleta, setNumeroBoleta] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('');
    const [materiasPrimas, setMateriasPrimas] = useState([{ materia: '', cantidad: '', valor: '' }]);
    const [opcionesMateriasPrimas, setOpcionesMateriasPrimas] = useState([]);

    useEffect(() => {
        const cargarMateriasPrimas = async () => {
            try {
                const materias = await getAllRawMaterials();
                setOpcionesMateriasPrimas(materias);
            } catch (error) {
                console.error('Error al obtener las materias primas:', error);
            }
        };
        cargarMateriasPrimas();
    }, []);

    const agregarMateriaPrima = () => {
        setMateriasPrimas([...materiasPrimas, { materia: '', cantidad: '', valor: '' }]);
    };

    const eliminarMateriaPrima = (index) => {
        setMateriasPrimas(materiasPrimas.filter((_, idx) => idx !== index));
    };

    const actualizarMateriaPrima = (index, field, value) => {
        const nuevasMateriasPrimas = materiasPrimas.map((mp, idx) =>
            index === idx ? { ...mp, [field]: value } : mp
        );
        setMateriasPrimas(nuevasMateriasPrimas);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para procesar los datos del formulario
    };

    return (
        <div className="formulario-compras bg-gray-100 p-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-6">Formulario de Compras</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Número de Boleta:</label>
                    <input
                        type="text"
                        value={numeroBoleta}
                        onChange={(e) => setNumeroBoleta(e.target.value)}
                        className="w-full p-2 border rounded focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Proveedor:</label>
                    <select
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                        className="w-full p-2 border rounded focus:border-indigo-500"
                    >
                        <option value="">Seleccione un proveedor</option>
                        {/* Aquí irían las opciones de proveedores cargadas de alguna fuente de datos */}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Fecha:</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full p-2 border rounded focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Estado:</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full p-2 border rounded focus:border-indigo-500"
                    >
                        <option value="por_pagar">Por Pagar</option>
                        <option value="pagado">Pagado</option>
                        <option value="tarjeta">Pagado con Tarjeta</option>
                        <option value="efectivo">Pagado con Efectivo</option>
                    </select>
                </div>

                <h3 className="text-lg font-medium mb-4">Materias Primas:</h3>
                <div className='lg:px-20'>
                {materiasPrimas.map((mp, index) => (
                    <div key={index} className="mb-4 grid grid-cols-4 gap-4 items-end text-center">
                        <div>
                            <label className="block mb-2 font-medium">Materia Prima:</label>
                            <select
                                value={mp.materia}
                                onChange={(e) => actualizarMateriaPrima(index, 'materia', e.target.value)}
                                className="w-full p-2 border rounded focus:border-indigo-500"
                            >
                                <option value="">Seleccione una materia prima</option>
                                {opcionesMateriasPrimas.map((opcion) => (
                                    <option key={opcion.id} value={opcion.id}>
                                        {opcion.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Cantidad:</label>
                            <input
                                type="number"
                                value={mp.cantidad}
                                onChange={(e) => actualizarMateriaPrima(index, 'cantidad', e.target.value)}
                                className="w-full p-2 border rounded focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Valor:</label>
                            <input
                                type="number"
                                value={mp.valor}
                                onChange={(e) => actualizarMateriaPrima(index, 'valor', e.target.value)}
                                className="w-full p-2 border rounded focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => eliminarMateriaPrima(index)}
                                className="bg-red-500 text-white p-2 px-4 rounded hover:bg-red-600"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
                </div>
                


                <div className="mt-6 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={agregarMateriaPrima}
                        className="bg-blue-500 text-white p-2 px-4 rounded hover:bg-blue-600"
                    >
                        Agregar Materia Prima
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 px-4 rounded hover:bg-green-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );

}

export default FormularioCompras;
