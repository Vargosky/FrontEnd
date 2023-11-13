import React, { useEffect, useState } from 'react';
import { getValorizedRecipes } from './api/api'
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'


function RecipeModal({ recipe, isOpen, closeModal }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Recipe Details Modal"
        >
            <h2>{recipe.name}</h2>
            <p>{recipe.category}</p>
            <div>
                <h3>Ingredientes:</h3>
                {/* Asegúrate de que la estructura de ingredientes se corresponda con esta */}
                {Object.entries(recipe.valorizado.ingredientes).map(([name, details]) => (
                    <p key={name}>
                        Ingrediente: {name}, Valor: {details.valor}
                    </p>
                ))}
                <button onClick={closeModal}>Cerrar</button>
            </div>
        </Modal>
    );
}



function RecipeCard({ recipe }) {
    return (
        <div className="border-2 rounded-md p-4 md:p-6 m-2 shadow-md my-5 bg-white">
            <h2 className="text-center text-xl md:text-2xl font-semibold capitalize tracking-wide">{recipe.name}</h2>
            <p className="text-center text-sm md:text-base text-gray-500 mb-3">{recipe.category}</p>
            <hr className="border-gray-300 mx-auto w-3/4 my-4" />
            <div className="mt-4">
                <h3 className="text-center font-semibold mb-3">Ingredientes:</h3>
                <table className="table-auto w-full mt-2 shadow-xl">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 md:px-4 py-2 text-center font-bold">Ingrediente</th>
                            <th className="border px-2 md:px-4 py-2 text-center font-bold">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe && recipe.valorizado && recipe.valorizado.ingredientes && Object.entries(recipe.valorizado.ingredientes).map(([name, details]) => (
                            details && details.valor != null ? (
                                <tr key={name}>
                                    <td className="border px-2 md:px-4 py-2 text-center">
                                        {name}
                                        {details.cantidad && details.unidad ? ` (${details.cantidad} ${details.unidad})` : ''}
                                    </td>
                                    <td className="border px-2 md:px-4 py-2 text-center">{Math.round(details.valor, 2)} {'pesos'}</td>
                                </tr>
                            ) : null
                        ))}
                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null ? (
                            <tr>
                                <td className="border px-2 md:px-4 py-2 text-center font-bold">Total valor:</td>
                                <td className="border px-2 md:px-4 py-2 text-center">{Math.round(recipe.valorizado.total.valor, 2)}</td>
                            </tr>
                        ) : null}
                        {recipe && recipe.valorizado && recipe.valorizado.totalCantidad != null ? (
                            <tr>
                                <td className="border px-2 md:px-4 py-2 text-center font-bold">Peso Antes Horno:</td>
                                <td className="border px-2 md:px-4 py-2 text-center">{recipe.valorizado.totalCantidad}</td>
                            </tr>
                        ) : null}
                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null && recipe.valorizado.totalCantidad != null ? (
                            <tr>
                                <td className="border px-2 md:px-4 py-2 text-center font-bold">Peso/Precio</td>
                                <td className="border px-2 md:px-4 py-2 text-center">{(recipe.valorizado.total.valor / recipe.valorizado.totalCantidad).toFixed(2)}</td>
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
                <h1 className="text-4xl md:text-5xl mb-10 md:mb-20 font-bold capitalize tracking-widest text-center">Recetas valorizadas</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full mt-2 shadow-lg divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                {['Nombre', 'Categoría', 'Valor Total', 'Peso Antes Horno', 'Precio por Gramo'].map((header, idx) => (
                                    <th key={idx} className="px-2 md:px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.isArray(recipes) && recipes.map((recipe, index) => (
                                <tr key={recipe ? recipe._id : index}>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">{recipe ? recipe.name : 'N/A'}</td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">{recipe ? recipe.category : 'N/A'}</td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null ?
                                            Math.round(recipe.valorizado.total.valor, 2) :
                                            'N/A'}
                                    </td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.totalCantidad != null ?
                                            recipe.valorizado.totalCantidad :
                                            'N/A'}
                                    </td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                                        {recipe && recipe.valorizado && recipe.valorizado.total && recipe.valorizado.total.valor != null && recipe.valorizado.totalCantidad != null ?
                                            (recipe.valorizado.total.valor / recipe.valorizado.totalCantidad).toFixed(2) :
                                            'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className='flex w-full justify-center my-10 items-center'>
                    <BsArrowLeftCircleFill
                        className='text-4xl md:text-6xl cursor-pointer hover:text-gray-600 mx-10'
                        onClick={() => {
                            setPagina(pagina - 1);
                        }}
                    />
                    <div className='text-2xl font-bold hover:scale-150 rounded-full px-3 py-2 '>{pagina}</div>
                    <BsArrowRightCircleFill
                        className='text-4xl md:text-6xl cursor-pointer hover:text-gray-600 mx-10'
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


        </div>
    );

}

export default Recipes;
