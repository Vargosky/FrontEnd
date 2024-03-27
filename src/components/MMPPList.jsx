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
<div className="overflow-x-auto">
    <div className="shadow sm:rounded-lg">
        <h2 className='text-center text-3xl font-semibold mb-10'>Inventario</h2>
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unidad
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio Actual
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock Critico
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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

    );
};

export default MMPPList;
