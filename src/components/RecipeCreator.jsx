import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getAllRawMaterials, saveRecipe } from './api/api';

const RecipeCreator = () => {
    const [recipes, setRecipes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchMaterials = async () => {
            const data = await getAllRawMaterials();
            setMaterials(data);
        };

        fetchMaterials();
    }, []);

    const handleAddMaterial = () => {
        if (selectedMaterial && quantity) {
            const selectedMaterialData = materials.find(material => material.nombre === selectedMaterial);
            const newRecipe = { materiaPrimaId: selectedMaterialData._id, quantity, material: selectedMaterialData.nombre };

            if (isEditing) {
                const updatedRecipes = [...recipes];
                updatedRecipes[editIndex] = newRecipe;
                setRecipes(updatedRecipes);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                setRecipes([...recipes, newRecipe]);
            }

            setQuantity('');
            setSelectedMaterial('');
        }
    };

    const handleEditMaterial = (index) => {
        setEditIndex(index);
        setIsEditing(true);
        setSelectedMaterial(recipes[index].material);
        setQuantity(recipes[index].quantity);
    };

    const handleDeleteMaterial = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
    };

    const handleSave = async () => {
        const userConfirmed = window.confirm('¿Estás seguro de que quieres guardar esta receta?');

        if (userConfirmed) {
            const newRecipe = { name, category, ingredients: recipes };
            try {
                const response = await saveRecipe(newRecipe);
                console.log('Receta guardada:', response);
                // Opcional: agregar un mensaje de éxito.
            } catch (error) {
                console.error('Error al guardar la receta:', error);
                // Opcional: agregar un mensaje de error.
            }
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:p-8">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Receta Subproducto</h1>

            {/* Bloque para el nombre y tipo de receta */}
            <div className="bg-gray-100 p-4 rounded-xl">
                <div className="mb-4 space-y-2">
                    <label className="text-md font-medium text-gray-600">Nombre de la receta</label>
                    <input
                        type="text"
                        placeholder="Nombre de la receta"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-md font-medium text-gray-600">Tipo de receta</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option key={1} value="">Selecciona el tipo de receta</option>
                        <option key={2} value="Masa">Masa</option>
                        <option key={3} value="Relleno">Relleno</option>
                    </select>
                </div>
            </div>

            {/* Bloque para agregar ingredientes */}
            <div className="bg-gray-100 p-4 rounded-xl space-y-4">
                <h3 className="text-xl font-medium text-center text-gray-700">Ingredientes</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <select
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecciona un material</option>
                            {materials.sort((a, b) => a.nombre.localeCompare(b.nombre)).map(material => (
                                <option key={material.id} value={material.nombre}>
                                    {material.nombre}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={handleAddMaterial}
                        className={`px-4 py-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white shadow-md hover:shadow-lg transition-shadow`}
                    >
                        {isEditing ? 'Actualizar' : 'Agregar material'}
                    </button>
                </div>
            </div>

            {/* Lista de ingredientes */}
            <div className="bg-gray-100 p-4 rounded-xl space-y-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-200">
                        <tr className="text-gray-600">
                            <th className="px-4 py-2 text-left">Material</th>
                            <th className="px-4 py-2 text-left">Cantidad</th>
                            <th className="px-4 py-2 text-center">Editar</th>
                            <th className="px-4 py-2 text-center">Borrar</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {recipes.map((recipe, index) => (
                            <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
                                <td className="px-4 py-2">{recipe.material}</td>
                                <td className="px-4 py-2">{recipe.quantity}</td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => handleEditMaterial(index)} className="text-blue-500 hover:text-blue-700">
                                        <FiEdit2 />
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => handleDeleteMaterial(index)} className="text-red-500 hover:text-red-700">
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botón de guardar */}
            <div className="text-center mt-4">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-500 text-white rounded shadow-md hover:shadow-lg transition-shadow"
                >
                    Crear nueva receta
                </button>
            </div>
        </div>
    );

};

export default RecipeCreator;
