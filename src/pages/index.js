import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import RecipeCreator from '../components/RecipeCreator';
import MMPPList from '@/components/MMPPList';
import SeccionStandar from '@/components/SeccionStandar';
import CreateRawMaterialForm from '@/components/CreateRawMaterialForm';
import UpdatePriceForm from '@/components/UpdatePriceForm';
import RawMaterialForm from '../components/RawMaterialForm';
import ListadoRecetasValorizadas from '../components/ListadoRecetasValorizadas'
import UpdateQuantityForm from '@/components/UpdateQuantityForm';
import Inventario from '@/components/Inventario';
import RecipeFinalCreator from '@/components/RecipeProductoFinal';
import FormularioRecetas from '@/components/FormularioRecetas';
import ProductionList from '@/components/ProductionList';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [recyclingAmount, setRecyclingAmount] = useState(0);
    const [isPanelControlVisible, setIsPanelControlVisible] = useState(false);
    const [recyclingAdded, setRecyclingAdded] = useState(false);
    const [isOpenContactos, setIsOpenContactos] = useState(false);
    const [cambioAvatar, setCambioAvatar] = useState(false);
    const [nombreImagen, setNombreImagen] = useState(null);


    const [showUpdateMMPP, setShowUpdateMMPP] = useState(false);
    const [showNewMMPP, setShowNewMMPP] = useState(false);
    const [showRecetasValorizadas, setShowRecetasValorizadas] = useState(false);
    const [showFormRecetaProductoFinal, setShowFormRecetaProductoFinal] = useState(false);
    const [showFabricarReceta, setShowFabricarRecetas] = useState(false);
    const [showPriceForm, setShowPriceForm] = useState(false);
    const [showListadoProduccion, setShowListadoproduccion] = useState(false)

    //falta crear 
    //receta producto final
    //produccion diaria  -->estimar las producciones de productos finales
    // por subproductos pienso que se puede crear una tabla de equivalencias de los productos con los subproductos
    return (
        <>
            <Head>
                <title>SCC</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-wrap items-start justify-center p-4">
                {/* //bptones hay que sacarlos en un componente */}
                <div className="w-full md:w-1/6 flex flex-col items-center bg-gray-50 rounded-2xl">
                    <div className="w-full flex flex-col justify-center mt-6 space-y-5 rounded-2xl shadow-2xl px-1">
                        <h3 className='text-3xl font-semibold shadow-xl text-center mb-5'>Pastelería Damascosss</h3>
                        <h4 className='text-l font-bold uppercase shadow-2xl text-center'>Materias Primas</h4>
                        <button
                            className={`transition duration-300 ease-in-out w-full mx-auto py-1 uppercase text-white rounded ${showNewMMPP ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowNewMMPP(!showNewMMPP)}
                        >
                            {showNewMMPP ? 'Cancelar' : 'Nueva MMPP'}
                        </button>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white rounded ${showUpdateMMPP ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowUpdateMMPP(!showUpdateMMPP)}
                        >
                            {showUpdateMMPP ? 'Cancelar' : 'Inventario'}
                        </button>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white rounded ${showPriceForm ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowPriceForm(!showPriceForm)}
                        >
                            {showPriceForm ? 'Cancelar' : 'Actualizar Precios'}
                        </button>

                        <h4 className='text-l font-bold uppercase shadow-2xl text-center'>Recetas</h4>

                        <button
                            className={`transition duration-300 ease-in-out w-full mx-auto shadow-2xl py-1 px-4 uppercase text-white rounded ${isFormVisible ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            {isFormVisible ? 'Cancelar' : 'Crear Subproducto'}
                        </button>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white rounded ${showRecetasValorizadas ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowRecetasValorizadas(!showRecetasValorizadas)}
                        >
                            {showRecetasValorizadas ? 'Cancelar' : 'Recetas Valorizadas'}
                        </button>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white line-through decoration-black rounded ${showFormRecetaProductoFinal ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowFormRecetaProductoFinal(!showFormRecetaProductoFinal)}
                        >
                            {showFormRecetaProductoFinal ? 'Cancelar' : 'Receta producto final'}
                        </button>

                        <h4 className='text-l font-bold uppercase shadow-2xl text-center'>Produccion</h4>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white rounded ${showFabricarReceta ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowFabricarRecetas(!showFabricarReceta)}
                        >
                            {showFabricarReceta ? 'Cancelar' : ' Fabricar Subproducto'}
                        </button>

                        <button
                            className={`transition duration-300 ease-in-out w-full py-1 px-4 uppercase text-white rounded ${showListadoProduccion ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' : 'bg-green-500 hover:bg-green-600 hover:text-black active:bg-green-700'}`}
                            onClick={() => setShowListadoproduccion(!showListadoProduccion)}
                        >
                            {showListadoProduccion ? 'Cancelar' : 'Listado Fabricacion'}
                        </button>
                    </div>



                </div>

                <div className="w-full md:w-5/6 p-4 md:pl-8">


                    {/* {isFormVisible && (
                        <div className="w-full mt-6 flex justify-center">
                            <RecipeCreator />
                        </div>
                    )} */}

                    <div className='mt-10'>

                        {isFormVisible && <div className='lg:w-2/3 mx-auto'><RecipeCreator /></div>}
                        {showPriceForm && <UpdatePriceForm />}
                        <div className='my-5'>
                            {showUpdateMMPP && <UpdateQuantityForm />}

                            {showUpdateMMPP && <Inventario />}

                            {showFabricarReceta && <FormularioRecetas />}

                            {showListadoProduccion && <ProductionList />}
                        </div>
                        {/* <MMPPList /> */}
                    </div>


                    <div className='mt-10'>
                        {isPanelControlVisible && (
                            <div className="w-full mt-6">
                                panel de control
                            </div>
                        )}
                    </div>

                    <div className='mt-10'>

                        {isOpenContactos && (
                            <div className="w-full mt-6">
                                contactos
                            </div>
                        )}
                    </div>



                    {!isPanelControlVisible && (
                        <div className="w-full mt-6 space-y-10 flex flex-col items-center">
                            <div className="w-full text-center">
                                {showNewMMPP && <RawMaterialForm />}
                                {showFormRecetaProductoFinal && <RecipeFinalCreator />}
                                {/* <SeccionStandar titulo={'Agregar Materia Prima'} uno={<RawMaterialForm/>} dos={'asdf'} tres={'Listado de Compras Necesarias'}/> */}
                                {showRecetasValorizadas && <ListadoRecetasValorizadas />}

                            </div>
                            <div className="w-full">
                                abajo
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
