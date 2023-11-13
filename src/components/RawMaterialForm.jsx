import React from 'react';
import { useForm } from 'react-hook-form';
import { createRawMaterial } from './api/api';

const units = ['gramos', 'unidad', 'litros', 'cc', 'Kilogramo'];

const CreateRawMaterialForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const newRawMaterial = await createRawMaterial(data);
            console.log('Materia Prima creada:', newRawMaterial);
            reset();
        } catch (error) {
            console.error('Error al crear la Materia Prima:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-green-300">
            <h3 className="text-2xl uppercase text-center">Agregar Nueva MMPP</h3>

            <div className="mb-4">
                <label {...register('nombre', { required: 'Este campo es requerido' })} className="block text-gray-600 text-sm font-semibold mb-2">
                    Nombre de la Materia Prima:
                </label>
                <input className="text-center text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre.message}</p>}
            </div>

            <div className="mb-4">
                <label {...register('unidad', { required: 'Este campo es requerido' })} className="block text-gray-600 text-sm font-semibold mb-2">
                    Unidad:
                </label>
                <select className="text-2xl text-center block appearance-none w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 pr-8 rounded focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    <option value="">Selecciona una unidad</option>
                    {units.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                    ))}
                </select>
                {errors.unidad && <p className="text-red-500 text-xs italic">{errors.unidad.message}</p>}
            </div>

            <div className="mb-4">
                <label {...register('stockCritico', { required: 'Este campo es requerido' })} className="block text-gray-600 text-sm font-semibold mb-2">
                    Stock Crítico:
                </label>
                <input type="number" className="text-center text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                {errors.stockCritico && <p className="text-red-500 text-xs italic">{errors.stockCritico.message}</p>}
            </div>

            <div className="mb-4">
                <label {...register('costoPorUnidad', { required: 'Este campo es requerido' })} className="block text-gray-600 text-sm font-semibold mb-2">
                    Costo por Unidad:
                </label>
                <input type="number" className="text-center text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                {errors.costoPorUnidad && <p className="text-red-500 text-xs italic">{errors.costoPorUnidad.message}</p>}
            </div>

            <div className="mt-4">
                <button type="submit" className="w-full uppercase mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    Crear Materia Prima
                </button>
            </div>
        </form>
    );
};

export default CreateRawMaterialForm;
