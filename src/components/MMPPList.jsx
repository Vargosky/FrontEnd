import React, { useEffect, useState } from 'react';
import { getAllRawMaterials } from './api/api';


const MMPPList = () => {
    const [rawMaterials, setRawMaterials] = useState([]);

    useEffect(() => {
        const fetchRawMaterials = async () => {
            const data = await getAllRawMaterials();
            setRawMaterials(data);
        };

        fetchRawMaterials();
    }, []);

    const handleUpdateValue = (event, materialId) => {
        const newValue = prompt('Ingrese el nuevo valor:');
        // Aquí puedes llamar a la función de actualización de la API con el nuevo valor y el ID de la materia prima
        // Ejemplo: updateRawMaterialValue(materialId, newValue)
    };

    return (
        <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <h2 className='text-center text-3xl font-semibold mb-10'>Inventario</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Unidad
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precio Actual
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock Critico
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rawMaterials.map((material, personIdx) => (
                                    <tr key={material.id} className={personIdx % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.nombre}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.cantidad}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.unidad}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.costoPorUnidad}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.stockCritico}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            <button onClick={(event) => handleUpdateValue(event, material.id)}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MMPPList;
