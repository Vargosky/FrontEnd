import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { getAllSubproductos } from '../components/api/api'
import styles from '@/styles/Home.module.css';

// Component imports
import RawMaterialForm from '../components/RawMaterialForm';
//import RecipeFinalCreator from '../components/RecipeFinalCreator';
import ListadoRecetasValorizadas from '../components/ListadoRecetasValorizadas';
import RecipeCreator from '../components/RecipeCreator';
import UpdatePriceForm from '../components/UpdatePriceForm';
import Inventario from '../components/Inventario';
import FormularioRecetas from '../components/FormularioRecetas';
import ProductionList from '../components/ProductionList';
import FormularioCompras from '@/components/FormularioCompras';
import ProveedorForm from '@/components/ProveedorForm';
import RecipeCreatorFinal from '@/components/RecipeProductoFinal';





export default function Home() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(null);
    const [showComponent, setShowComponent] = useState(false);
    const [listadoRecetas, setListadoRecetas] = useState(null);

    //dinamica navbar
    const [mostrarBtnsMMPP, setMostrarBtnsMMPP] = useState(false);
    const [mostrarBtnsReceta, setMostrarBtnsReceta] = useState(false);
    const [mostrarBtnsProduccion, setMostrarBtnsProduccion] = useState(false);
    const [mostrarBtnsCompras, setMostrarBtnsCompra] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleComponentChange = (componentName) => {
        setShowComponent(false);
        setCurrentComponent(componentName);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 20); // pequeño delay para reiniciar la animación
        return () => clearTimeout(timer);
    }, [currentComponent]);






    const fadeInClass = showComponent ? 'opacity-100 transition-opacity duration-600' : 'opacity-0';

    return (
        <>
            <Head>
                <title>SCC</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-wrap items-start justify-center p-4 h-screen">

                {/* Sidebar Menu */}
                <div className={`w-full md:w-1/6 flex flex-col items-center bg-gray-50 rounded-2xl transition-all duration-300 ease-in-out ${isMenuVisible ? 'h-auto' : 'h-0'}`}>
                    <button
                        className="transition duration-300 ease-in-out w-full py-1 uppercase text-white rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 z-50"
                        onClick={toggleMenu}
                    >
                        {isMenuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
                    </button>

                    {isMenuVisible &&
                        <div className="w-full flex flex-col justify-center mt-6 space-y-6 rounded-2xl shadow-2xl px-1">
                            <h3 className='text-3xl font-semibold shadow-xl text-center mb-5'>Pastelería Damasco</h3>
                            <button onClick={() => { setMostrarBtnsMMPP(!mostrarBtnsMMPP) }} className='text-xl font-semibold shadow-xl text-center mb-5'>Materias Primas</button>
                            {mostrarBtnsMMPP &&
                                <>
                                    <button onClick={() => handleComponentChange('RawMaterialForm')}>Nueva </button>
                                    <button onClick={() => handleComponentChange('Inventario')}>Inventario</button>
                                </>
                            }
                            <button onClick={() => { setMostrarBtnsReceta(!mostrarBtnsReceta) }} className='text-xl font-semibold shadow-xl text-center mb-5'> Recetas</button>
                            {mostrarBtnsReceta &&
                                <>
                                    <button onClick={() => handleComponentChange('RecipeCreator')}>Nuevo Subproducto</button>
                                    <button onClick={() => handleComponentChange('RecipeCreatorFinal')}>Nuevo Producto</button>
                                    <button onClick={() => handleComponentChange('ListadoRecetasValorizadas')}>Valorizadas</button>
                                    
                                </>
                            }
                            <button onClick={() => { setMostrarBtnsProduccion(!mostrarBtnsProduccion) }} className='text-xl font-semibold shadow-xl text-center mb-5'> Produccion</button>
                            {mostrarBtnsProduccion &&
                                <>
                                    <button onClick={() => handleComponentChange('FormularioRecetas')}>Fabricar Subproducto</button>
                                    <button onClick={() => handleComponentChange('ProductionList')}>Historial Producción</button>
                                </>
                            }
                            <button onClick={() => { setMostrarBtnsCompra(!mostrarBtnsCompras) }} className='text-xl font-semibold shadow-xl text-center mb-5'> Compras</button>
                            {mostrarBtnsCompras &&
                                <>
                                    <button onClick={() => handleComponentChange('FormularioCompras')}>Ingresar Compra</button>
                                    <button onClick={() => handleComponentChange('ProveedorForm')}>Ingresar Proveedor</button>
                                </>
                            }
                            <h4 className='text-xl font-semibold shadow-xl text-center mb-5'> Ventas</h4>
                        </div>
                    }
                </div>

                {/* Main Content Area */}
                <div className="w-full md:w-5/6 p-4 md:pl-8">
                    <div className={`w-full mt-6 space-y-10 flex flex-col items-center ${fadeInClass}`}>
                        {/* Conditional Component Rendering */}
                        {currentComponent === 'RawMaterialForm' && <RawMaterialForm />}
                        {/* {currentComponent === 'RecipeFinalCreator' && <RecipeFinalCreator />} */}
                        {currentComponent === 'ListadoRecetasValorizadas' && <><ListadoRecetasValorizadas /></>}
                        {currentComponent === 'RecipeCreator' && <RecipeCreator />}
                        {currentComponent === 'UpdatePriceForm' && <UpdatePriceForm />}
                        {currentComponent === 'Inventario' && <Inventario />}
                        {currentComponent === 'FormularioRecetas' && <FormularioRecetas />}
                        {currentComponent === 'ProductionList' && <ProductionList />}
                        {currentComponent === 'FormularioCompras' && <FormularioCompras />}
                        {currentComponent === 'ProveedorForm' && <ProveedorForm />}
                        {currentComponent === 'RecipeCreatorFinal' && <RecipeCreatorFinal/>}
                    </div>
                </div>
            </div>
        </>
    )
}
