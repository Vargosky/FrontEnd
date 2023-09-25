import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchRawMaterialByName, updateRawMaterial, buscarMateriaPrimaPorNombre } from './api/api';
import ListadoMMPPStandar from './ListadoMMPPStandar';
import ListadoCambioPrecio from './ListadoCambioPrecio';

const UpdateQuantityForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [search, setSearch] = useState('');
    const [rawMaterial, setRawMaterial] = useState(null);

    const [materiales, setMateriales] = useState(null);
    const [materialSeleccionado, setMaterialesSeleccionado] = useState(null);


    const onSubmit = async (data) => {
        if (rawMaterial) {
            const updatedRawMaterial = await updateRawMaterialQuantity(rawMaterial.id, { cantidad: data.cantidad });
            console.log('Raw material updated:', updatedRawMaterial);
        }
    };

    async function buscar(search) {
        const response = await buscarMateriaPrimaPorNombre(search);

        setMateriales(response);
        console.log(materiales);
    }


    useEffect(() => {

        if (search.length >= 3) {

            const busqueda = buscar(search);
            console.log(materiales);
        }

    }, [search]);


    return (
        <div className="bg-blue-400 p-4 rounded-2xl pb-10 text-center pt-10">
            <h2 className='w-full text-center text-3xl mb-5 uppercase'>Existencias de MMPP</h2>
            <form className='text-center' >
                <div className='mx-auto shadow-2xl px-10'>
                <label className="text-black text-center">
                    <div className='font-bold uppercase'>Buscar Materia Prima:</div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ml-2 p-2 rounded w-full"
                    />
                    
                </label>
                </div>
                {search.length >=3  && <ListadoCambioPrecio materiales={materiales}/>} 
            </form>
        </div>
    );
};

export default UpdateQuantityForm;
