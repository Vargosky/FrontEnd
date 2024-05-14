import React, { useState, useEffect } from 'react';
import { getAllSubproductos } from './api/api';
import RecipeCard from './RecipeCard';
import { crearNuevaProduccion } from './api/apiProduccion'; // Actualiza con la ruta correcta
import { descontarCantidad, getRawMaterialById } from './api/api'

function DetalleReceta() {
    const [cantidad, setCantidad] = useState(1);
    const [recetas, setRecetas] = useState([]);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
    const [materiales, setMateriales] = useState(null);
    const [idRecetaSeleccionada, setIdRecetaSeleccionada] = useState(null);
    const [materialesFabricacion, setMaterialesFabricacion] = useState(null);
    const [nombreReceta, setNombreReceta] = useState(null);

    useEffect(() => {
        getAllSubproductos()
            .then(data => setRecetas(data))
            .catch(error => console.error(error.message));
    }, []);

    useEffect(() => {

        //aca hay que hacer una prefabricacion para saber si tenemos stock antes de fabricar

    }, [cantidad, recetaSeleccionada]);


    //conseguir el inventario por materia prima

    const getExistenciaProductoPorId = async (idMateriaPrima) => {

        const respuesta = await getRawMaterialById(idMateriaPrima);

        return respuesta

    }


    const handleCantidadChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 0) {
            setCantidad(value);
        }
    };


    const handleRecetaChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue !== "") {
            const selectedIndex = event.target.selectedIndex - 1;
            const receta = recetas[selectedIndex];
            console.log('Receta seleccionada:', receta);
            setIdRecetaSeleccionada(receta._id)
            console.log({ info: idRecetaSeleccionada });
            setRecetaSeleccionada(receta);
        } else {
            setRecetaSeleccionada(null);
        }
    };


    //neceito recorrer los materiales



    const getMaterialesDeProduccion = async (produccion, cantidad) => {

        if (produccion.ingredients) {
            produccion.ingredients.map(async (ingredient) => {

                await descontarCantidad(ingredient.materiaPrimaId, ingredient.quantity * cantidad);

            });
        }


        // console.log({produccion,cantidad});
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        getMaterialesDeProduccion(recetaSeleccionada, cantidad);

        if (recetaSeleccionada) {
            const fechaInput = document.getElementById("fecha").value;
            const pasteleroInput = document.getElementById("pastelero").value;


            const produccionData = {
                idReceta: idRecetaSeleccionada,
                nombre: recetaSeleccionada.name,
                cantidad: cantidad,
                fechaCreacion: fechaInput,
                maestro: pasteleroInput,
                estado: "producido"
            };



            try {
                produccionData.idReceta = idRecetaSeleccionada;
                await crearNuevaProduccion(produccionData); //aca guarda el objeto produccion data

                //aca hay que hacer el descuento 

                alert("Producción creada con éxito!");
            } catch (error) {
                console.error("Error al crear producción:", error);
                alert("Error al crear la producción. Verifica la consola para más detalles.");
            }
        } else {
            alert("Selecciona una receta antes de enviar.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-green-300">

            <h3 className='text-2xl uppercase text-center'>Fabricacion de una receta</h3>
            <div className="mb-4">
                <label htmlFor="fecha" className="block text-gray-600 text-sm font-semibold mb-2">Fecha de fabricación:</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    className="text-center text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="pastelero" className="block text-gray-600 text-sm font-semibold mb-2">Chef Pastelero:</label>
                <select
                    name="pastelero"
                    id="pastelero"
                    className="text-2xl text-center block appearance-none w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 pr-8 rounded focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                >
                    <option value="Maestro Daniel">Maestro Daniel</option>
                    <option value="Maestro Alejandro">Maestro Alejandro</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="cantidad" className="block text-gray-600 text-sm font-semibold mb-2">Cantidad de recetas:</label>
                <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    className="text-center text-4xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="receta" className="block text-gray-600 text-sm font-semibold mb-2">Seleccionar Receta:</label>
                <select
                    name="receta"
                    id="receta"
                    onChange={handleRecetaChange}
                    className="text-2xl text-center block appearance-none w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 pr-8 rounded focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                >
                    <option value="">
                        Seleccione una Receta
                    </option>
                    {recetas.sort((a, b) => a.name.localeCompare(b.name)).map((receta) => (
                        <option key={receta.id} value={receta.id}>
                            {receta.name}
                        </option>
                    ))}
                </select>

            </div>

            <RecipeCard recipe={recetaSeleccionada} cantidad={cantidad} />

            <div className="mt-4">
                <button type="submit" className=" w-full  uppercase mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    Descontar del Inventario
                </button>
            </div>
        </form>
    );

}

export default DetalleReceta;
