import React from 'react';

function RecipeList({ recipes }) {
    console.log({recipes})
    return (
        <div>
            <h1>Lista de Recetas</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <h2>{recipe.name}</h2>
                        <p><strong>Categoría:</strong> {recipe.category}</p>
                        <ul>
                            {recipe.ingredients.map(ingredient => (
                                <li key={ingredient._id}>
                                    Materia Prima ID: {ingredient.materiaPrimaId} | Cantidad: {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Fecha de Creación:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>
                        <p><strong>Última Actualización:</strong> {new Date(recipe.updatedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;
