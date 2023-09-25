import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchRawMaterialByName, updateRawMaterial, buscarMateriaPrimaPorNombre } from './api/api';
import ListadoMMPPStandar from './ListadoMMPPStandar';


const UpdatePriceForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [search, setSearch] = useState('');
    const [rawMaterial, setRawMaterial] = useState(null);

    const [materiales, setMateriales] = useState(null);
    const [materialSeleccionado, setMaterialesSeleccionado] = useState(null);

    const onSubmit = async (data) => {
        if (rawMaterial) {
            const updatedRawMaterial = await updateRawMaterial(rawMaterial.id, { costoPorUnidad: data.costoPorUnidad });
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
        <div className="bg-green-400 p-4 rounded-2xl pb-10 text-center pt-10">
            <h2 className='w-full text-center text-3xl mb-5 uppercase'>Precios MMPP</h2>
            <form className='' >
                <div className='mx-auto shadow-2xl px-10'>
                <label className="text-black text-center">
                    <div className='font-bold uppercase'>Buscar Materia Prima:</div>
                    
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ml-2 p-2 rounded w-full"
                    />
                    {/* <button
                        type="button"
                        // onClick={handleSearch}
                        className="ml-2 bg-white text-blue-400 px-4 py-2 rounded mt-5"
                    >
                        Buscar
                    </button> */}
                </label>
                </div>
                {search.length >=3  && <ListadoMMPPStandar materiales={materiales}/>} 
            </form>
        </div>
    );
};

export default UpdatePriceForm;
