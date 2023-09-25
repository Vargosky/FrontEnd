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
            reset(); // Limpia el formulario
        } catch (error) {
            console.error('Error al crear la Materia Prima:', error);
        }
    };

    return (
        <>
        <div className='text-4xl font-bold my-5'>Agregar Nueva MMPP</div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-green-400 p-6 rounded-md w-3/4 mx-auto mb-20">
            
            <div className="mb-4">
                <label className="block  text-sm font-bold uppercase mb-2">
                    Nombre:
                </label>
                <input {...register('nombre', { required: 'Este campo es requerido' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Unidad:
                </label>
                <select {...register('unidad', { required: 'Este campo es requerido' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Selecciona una unidad</option>
                    {units.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                    ))}
                </select>
                {errors.unidad && <p className="text-red-500 text-xs italic">{errors.unidad.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2">
                    Stock Crítico:
                </label>
                <input type="number" {...register('stockCritico', { required: 'Este campo es requerido' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.stockCritico && <p className="text-red-500 text-xs italic">{errors.stockCritico.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2">
                    Costo por Unidad:
                </label>
                <input type="number" {...register('costoPorUnidad', { required: 'Este campo es requerido' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.costoPorUnidad && <p className="text-red-500 text-xs italic">{errors.costoPorUnidad.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear Materia Prima
            </button>
            
        </form>
        </>
    );
};

export default CreateRawMaterialForm;
