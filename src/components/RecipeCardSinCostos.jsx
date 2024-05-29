import { useEffect, useState } from 'react';
import { getRawMaterialById, buscarMateriaPrimaPorNombre } from './api/api';

function RecipeCardSinCostos({ recipe, cantidad = 1 }) {
    const [ingredients, setIngredients] = useState([]);


    const getExistenciaProductoPorId = async (idMateriaPrima) => {

        const respuesta = await getRawMaterialById(idMateriaPrima);

        return respuesta.cantidad

    }


    function convertirTexto(texto) {
        if (texto === "gramos") {
            return "[g]";
        } else if (texto === "unidad") {
            return "[u]";
        } else {
            return " ";
        }
    }

    const getExistenciaProductoPorNombre = async (nombreMaterial) => {

        const respuesta = await buscarMateriaPrimaPorNombre(nombreMaterial);

        console.log({ respuesta });

    }





    useEffect(() => {
        if (recipe && recipe.ingredients) {
            Promise.all(recipe.ingredients.map(async (ingredient) => {
                const rawMaterial = await getRawMaterialById(ingredient.materiaPrimaId);
                const existenciaMaterial = await getExistenciaProductoPorId(ingredient.materiaPrimaId);
                console.log({ existenciaMaterial });
                return {
                    name: rawMaterial.nombre,
                    quantity: ingredient.quantity,
                    unidad: rawMaterial.unidad,
                    existencia: existenciaMaterial,
                };
            }))
                .then(setIngredients);
        }
    }, [recipe]);

    return (
        <div className="border-2 rounded-md p-5 m-2 shadow-md my-5">
            <h2 className="text-center text-xl font-semibold capitalize tracking-wide">{recipe ? recipe.name : ""}</h2>
            <p className="text-center text-sm text-gray-500">{recipe ? recipe.category : ""}</p>
            <hr className="border-gray-600 mx-auto w-3/4 my-4" />
            <div className="mt-4">

                <table className="table-auto w-full mt-2 shadow-xl">
                    <thead className='border'>
                        <tr>
                            <th className="border px-4 py-2 text-center font-bold">Ingrediente</th>
                            <th className="border px-4 py-2 text-center font-bold">Cantidad</th>
                            {/* <th className="border px-4 py-2 text-center font-bold">Stock</th> */}
                            { }
                        </tr>
                    </thead>
                    {console.log(ingredients)}
                    <tbody>
                        {ingredients.map(({ name, quantity, unidad, existencia }) => (
                            <tr key={name} className={quantity * cantidad > existencia ? 'bg-red-200' : ''}>
                                <td className="border px-4 py-2 text-center">{name}</td>
                                <td className="border px-4 py-2 text-center">
                                    <div className="flex items-center justify-center">
                                        <span>{quantity * cantidad}</span>
                                        <span className="ml-1">{convertirTexto(unidad)}</span>
                                    </div>
                                </td>
                                {/* <td className="border px-4 py-2 text-center">
                                    <div className="flex items-center justify-center">
                                        <span>{existencia}</span>
                                        <span className="ml-1">{convertirTexto(unidad)}</span>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>



                </table>
            </div>
        </div>
    );
}

export default RecipeCardSinCostos;
