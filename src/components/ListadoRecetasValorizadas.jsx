import React, { useEffect, useState } from 'react';
import { getValorizedRecipes } from './api/api'
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'

function RecipeCard({ recipe }) {
    return (
        <div className="border-2 rounded-md p-5 m-2 shadow-md my-5">
            <h2 className="text-center text-xl font-semibold capitalize tracking-wide">{recipe.name}</h2>
            <p className="text-center text-sm text-gray-500">{recipe.category}</p>
            <hr className="border-gray-300 mx-auto w-3/4 my-4" />
            <div className="mt-4">
                <h3 className="text-center font-semibold">Ingredientes:</h3>
                <table className="table-auto w-full mt-2 shadow-xl">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-center font-bold">Ingrediente</th>
                            <th className="border px-4 py-2 text-center font-bold">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe && recipe.valorizado && recipe.valorizado.ingredientes && Object.entries(recipe.valorizado.ingredientes).map(([name, details]) => (
                            details && details.valor != null ? (
                                <tr key={name}>
                                    <td className="border px-4 py-2 text-center">{name}</td>
                                    <td className="border px-4 py-2 text-center">{Math.round(details.valor, 2)} {'pesos'}</td>
                                </tr>
                            ) : null
                        ))}
                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null ? (
                            <tr>
                                <td className="border px-4 py-2 text-center font-bold">Total valor:</td>
                                <td className="border px-4 py-2 text-center">{Math.round(recipe.valorizado.total.valor, 3)}</td>
                            </tr>
                        ) : null}
                        {recipe && recipe.valorizado && recipe.valorizado.totalCantidad != null ? (
                            <tr>
                                <td className="border px-4 py-2 text-center font-bold">Peso Antes Horno:</td>
                                <td className="border px-4 py-2 text-center">{recipe.valorizado.totalCantidad}</td>
                            </tr>
                        ) : null}
                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null && recipe.valorizado.totalCantidad != null ? (
                            <tr>
                                <td className="border px-4 py-2 text-center font-bold">Peso/Precio</td>
                                <td className="border px-4 py-2 text-center">{(recipe.valorizado.total.valor / recipe.valorizado.totalCantidad).toFixed(2)}</td>
                            </tr>
                        ) : null}
                    </tbody>

                </table>
            </div>
        </div>
    );
}



function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        async function fetchRecipes() {
            const fetchedRecipes = await getValorizedRecipes(pagina);
            setRecipes(fetchedRecipes);
        }

        fetchRecipes();
    }, []);

    useEffect(() => {
        async function fetchRecipes() {
            const fetchedRecipes = await getValorizedRecipes(pagina);
            setRecipes(fetchedRecipes);
        }

        fetchRecipes();
    }, [pagina]);

    return (
        <div className="p-4">
    
            <div className="p-4">
                <h1 className="text-4xl mb-20 font-bold capitalize tracking-widest">Recetas valorizadas</h1>
                
                <div className="overflow-x-auto">
                    <table className="table-auto w-full mt-2 shadow-xl">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 text-center font-bold">Nombre</th>
                                <th className="border px-4 py-2 text-center font-bold">Categoría</th>
                                <th className="border px-4 py-2 text-center font-bold">Valor Total</th>
                                <th className="border px-4 py-2 text-center font-bold">Peso Antes Horno</th>
                                <th className="border px-4 py-2 text-center font-bold">Precio por Gramo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(recipes) ? recipes.map((recipe, index) => (
                                <tr key={recipe ? recipe._id : index}>
                                    <td className="border px-4 py-2 text-center">{recipe ? recipe.name : 'N/A'}</td>
                                    <td className="border px-4 py-2 text-center">{recipe ? recipe.category : 'N/A'}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null ?
                                            Math.round(recipe.valorizado.total.valor, 2) :
                                            'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.totalCantidad != null ?
                                            recipe.valorizado.totalCantidad :
                                            'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null && recipe.valorizado.totalCantidad != null ?
                                            (recipe.valorizado.total.valor / recipe.valorizado.totalCantidad).toFixed(2) :
                                            'N/A'}
                                    </td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </div>
                
                <div className='flex w-full justify-between my-10'>
                    <BsArrowLeftCircleFill
                        className='text-6xl cursor-pointer'
                        onClick={() => {
                            setPagina(pagina - 1);
                        }}
                    />
                    <BsArrowRightCircleFill
                        className='text-6xl cursor-pointer'
                        onClick={() => {
                            setPagina(pagina + 1);
                        }}
                    />
                </div>
            </div>
    
            <h1 className="text-4xl mb-20 font-bold capitalize tracking-widest">Detalle Recetas valorizadas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(recipes) ? recipes.map((recipe, index) =>
                    recipe && recipe._id ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                ) : null}
            </div>
    
            <div className='flex w-full justify-end'>
                <BsArrowRightCircleFill className='text-6xl cursor-pointer' onClick={() => {
                    setPagina(pagina + 1)
                    alert(pagina);
                }} />
            </div>
        </div>
    );
    
}

export default Recipes;
