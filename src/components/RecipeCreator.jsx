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
        const userConfirmed = window.confirm('¿Estás seguro de que quieres guardar esta receta?');
        if (userConfirmed) {
            const newRecipe = { name, category, ingredients: recipes };
            console.log(newRecipe);
            try {
                const response = await saveRecipe(newRecipe);
                console.log('Receta guardada:', response);
                // Aquí puedes agregar un mensaje de éxito si lo deseas.
            } catch (error) {
                console.error('Error al guardar la receta:', error);
                // Aquí puedes agregar un mensaje de error si lo deseas.
            }
        } else {
            console.log('El usuario canceló la acción.');
            // Aquí puedes agregar un mensaje para informar que se canceló la acción si lo deseas.
        }
    };


    return (
        <div className="bg-orange-100 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-orange-500 text-center">Receta Subproducto</h1>
            <div className="mb-4 text-center rounded-2xl">
                <div className=' bg-orange-50 shadow-2xl p-10 text-center rounded-2xl my-10'>
                    <h3 className='text-center'> </h3>
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
                        className="p-2 border rounded w-2/3"
                    >
                        <option value="">Selecciona el tipo de receta</option>
                        <option value="Masa">Masa</option>
                        <option value="Relleno">Relleno</option>
                    </select>

                </div>
                <h3 className='text-2xl font-bold mb-4 text-orange-500 text-center'>Ingredientes</h3>
                <div className='bg-orange-50 my-5 shadow-2xl p-10 rounded-2xl'>
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="p-2 border rounded"
                    />


                    <select
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        className="p-2 border rounded w-2/3"
                    >
                        <option value="">Selecciona un material</option>
                        {materials.map((material) => (
                            <option key={material.id} value={material.nombre}>
                                {material.nombre}
                            </option>
                        ))}
                    </select>
                    <div className='w-full text-center'>
                        <button
                            onClick={handleAddMaterial}
                            className={`p-2 rounded my-10 ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                        >
                            {isEditing ? 'Actualizar' : 'Agregar material'}
                        </button>
                    </div>

                </div>


                {/* <button
                    onClick={handleAddMaterial}
                    className={`p-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                >
                    {isEditing ? 'Actualizar' : '+'}
                </button>    */}

            </div>

            <div className="my-10">
                <table className="min-w-full table-auto bg-orange-100 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-orange-500 bg-orange-200">
                            <th className="px-4 py-2 text-left">Material</th>
                            <th className="px-4 py-2 text-left">Cantidad</th>
                            <th className="px-4 py-2">Editar</th>
                            <th className="px-4 py-2">Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe, index) => (
                            <tr key={index} className="border-t border-orange-300">
                                <td className="px-4 py-2">{recipe.material}</td>
                                <td className="px-4 py-2">{recipe.quantity}</td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => handleEditMaterial(index)} className="text-orange-500">
                                        <FiEdit2 />
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => handleDeleteMaterial(index)} className="text-orange-500">
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
