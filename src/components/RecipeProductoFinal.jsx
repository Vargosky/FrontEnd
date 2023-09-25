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
    const [name, setName] = useState(''); // Nuevo estado para el nombre de la receta
    const [category, setCategory] = useState(''); // Nuevo estado para el tipo de receta

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
        const newRecipe = { name, category, ingredients: recipes };
        console.log(newRecipe);
        try {
            const response = await saveRecipe(newRecipe);
            console.log('Receta guardada:', response);
        } catch (error) {
            console.error('Error al guardar la receta:', error);
        }
    };

    return (
        <div className="p-8 bg-orange-100 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-orange-500">Receta Subproducto</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nombre de la receta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Selecciona el tipo de receta</option>
                    <option value="Masa">Masa</option>
                    <option value="Relleno">Relleno</option>
                </select>
            </div>
            <div className="mb-4">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-2 bg-orange-200 p-2 rounded"
                    >
                        <span className="font-medium">{recipe.material}:</span>
                        <span>{recipe.quantity}</span>
                        <button
                            onClick={() => handleEditMaterial(index)}
                            className="text-orange-500"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            onClick={() => handleDeleteMaterial(index)}
                            className="text-orange-500"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-4">
                <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Selecciona un material</option>
                    {materials.map((material) => (
                        <option key={material.id} value={material.nombre}>
                            {material.nombre}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleAddMaterial}
                    className={`p-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                >
                    {isEditing ? 'Actualizar' : '+'}
                </button>
            </div>
            <button
                onClick={handleSave}
                className="mt-4 p-2 bg-orange-400 text-white rounded"
            >
                Crear nueva receta
            </button>
        </div>
    );
};

export default RecipeCreator;
