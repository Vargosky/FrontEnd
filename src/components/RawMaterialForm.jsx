import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createRawMaterial } from './api/api';

const units = ['gramos', 'unidad', 'litros', 'cc', 'Kilogramo'];

const CreateRawMaterialForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formData, setFormData] = useState({
        nombre: '',
        unidad: '',
        stockCritico: 0,
        costoPorUnidad: 0
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stockCritico' || name === 'costoPorUnidad' ? parseFloat(value) : value
        }));
    };

    const onSubmit = async () => {
        console.log("submit");
        try {
            const newRawMaterial = await createRawMaterial(formData);
            console.log('Materia Prima creada:', newRawMaterial);
            alert("Materia Prima Creada")
            reset();
        } catch (error) {
            console.error('Error al crear la Materia Prima:', error);
        }
    };


    // const onSubmit =  () => {

    //     console.log("submit");

    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-green-300">
            <h3 className="text-2xl uppercase text-center">Agregar Nueva MMPP</h3>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="mb-4">
                    <label {...register(key, { required: 'Este campo es requerido' })} className="block text-gray-600 text-sm font-semibold mb-2">
                        {key === 'nombre' ? 'Nombre de la Materia Prima:' : 
                         key === 'unidad' ? 'Unidad:' : 
                         key === 'stockCritico' ? 'Stock Crítico:' : 
                         'Costo por Unidad:'}
                    </label>
                    {key === 'unidad' ? (
                        <select
                            name={key}
                            value={value}
                            onChange={onChange}
                            className="text-2xl text-center block appearance-none w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 pr-8 rounded focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        >
                            <option value="">Selecciona una unidad</option>
                            {units.map((unit, index) => (
                                <option key={index} value={unit}>{unit}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={key === 'stockCritico' || key === 'costoPorUnidad' ? 'number' : 'text'}
                            name={key}
                            value={value}
                            onChange={onChange}
                            className="form-control text-center text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        />
                    )}
                </div>
            ))}
            <div className="mt-4">
                <button onClick={onSubmit} className="w-full uppercase mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    Crear Materia Prima
                </button>
            </div>
        </form>
    );
};

export default CreateRawMaterialForm;
