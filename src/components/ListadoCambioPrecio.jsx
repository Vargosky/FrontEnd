import React from 'react'
import { updateRawMaterial } from '../components/api/api'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'



// Asegúrate de que la ruta sea correcta

const testUpdateRawMaterial = async () => {
    const id = '64a8a896a4a891f54c8f3818'; // Reemplaza esto con un ID de material válido
    const data = { costoPorUnidad: '1' }; // Reemplaza esto con los datos que quieras actualizar

    try {
        const updatedMaterial = await updateRawMaterial(id, data);
        console.log('Material actualizado:', updatedMaterial);
    } catch (error) {
        console.error('Error al actualizar el material:', error);
    }
};




const ListadoMMPPStandar = (materiales) => {


    const handleUpdateValue = async (event, materialId) => {
        const newValue = prompt('Ingrese el nuevo valor (recuerde que es el valor por gramo, cc, o unidad):');

        if (newValue) {
            try {
                const updatedMaterial = await updateRawMaterial(materialId, { cantidad: newValue });
                console.log('Material actualizado:', updatedMaterial);
            } catch (error) {
                console.error('Error al actualizar el material:', error);
            }
        }
    };

    console.log({ materiales });
    return (
        <div className="flex flex-col mt-6">
            <div className='text-center'>Resultados de la Busqueda</div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Nombre</th>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Cantidad</th>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Unidad Medida</th>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Costo por Unidad</th>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Stock Crítico</th>
                                    <th className="px-2 py-4 whitespace-nowrap text-sm text-gray-600 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.isArray(materiales.materiales) && materiales.materiales.map((material, personIdx) => (
                                    <tr key={material.id} className={personIdx % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {material.nombre}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center flex justify-around">
                                            <AiOutlinePlusCircle className='text-2xl' />
                                            {material.cantidad}
                                            <AiOutlineMinusCircle className='text-2xl' />
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
                                            <button className='bg-red-200 px-5 py-3 rounded-3xl' onClick={(event) => handleUpdateValue(event, material._id)}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListadoMMPPStandar
