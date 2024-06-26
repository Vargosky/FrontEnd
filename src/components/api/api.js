import axios from 'axios';
const API_URL = 'https://apii-bay.vercel.app/api/mmpp/';
const API_URL_S = 'https://apii-bay.vercel.app/api/'

// const API_URL ='http://127.0.0.1:3001/api/mmpp/'
// const API_URL_S ='http://127.0.0.1:3001/api/'

export const buscarMateriaPrimaPorNombre = async (nombre) => {
    try {
        const response = await axios.get(`${API_URL}buscar/${nombre}`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar la Materia Prima:', error);
        throw error;
    }
};

export const getAllRawMaterials = async () => {
    const response = await fetch(`${API_URL}all`);
    const data = await response.json();
    return data;
};

//`${API_URL}/${id}`

export const getRawMaterialById = async (id) => {
    console.log(API_URL + id)
    const response = await fetch(API_URL +  id);
    const data = await response.json();
    return data;
};

export const createRawMaterial = async (rawMaterial) => {
    const response = await fetch(API_URL_S+'mmpp/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawMaterial),
    });

    if (!response.ok) {
        throw new Error('Error al crear la Materia Prima');
    }

    const data = await response.json();
    return data;
};



export const deleteRawMaterial = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
};

export const searchRawMaterialByName = async (name) => {
    try {
        const response = await fetch(API_URL_S+`/mmpp/buscar/${name}`);
        console.log({ response });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawMaterial = await response.json();
        return rawMaterial;
    } catch (error) {
        throw new Error(`Error searching raw material: ${error.message}`);
    }
};

// api.js (o donde sea que estés manteniendo tus funciones de API en el frontend)

export const updateRawMaterial = async (id, data) => {
    try {
        const response = await fetch(`https://apii-bay.vercel.app/api/mmpp/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la materia prima');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating raw material:", error);
        throw error;
    }
};



export const saveRecipe = async (recipeData) => {
    console.log(recipeData)
    try {
        const response = await axios.post(API_URL_S+'subproducto/create', recipeData);
        return response.data;
    } catch (error) {
        console.error('Error al guardar la receta:', error);
    }
};

export async function getValorizedRecipes(page = 1) {
    const url = API_URL_S+`subproducto/all/values/${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET', // opcional, 'GET' es el método predeterminado
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error fetching valorized recipes:', error);
        return null;
    }
}

export async function getRawMaterialsPaginated(page = 1) {
    const url = API_URL_S+`mmpp/list/${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { totalPages, data } = await response.json();
        return { totalPages, rawMaterials: data };
    } catch (error) {
        console.error('Error fetching paginated raw materials:', error);
        return null;
    }
}

export const descontarCantidad = async (id, cantidad) => {
    try {
        const response = await fetch(API_URL_S+`mmpp/descontar/${id}/${cantidad}`, {
            method: 'PUT', // porque estoy actualizando
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.mensaje || 'Ocurrió un error en la solicitud');
        // }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllSubproductos = async () => {
    try {
        const response = await fetch(API_URL_S+`subproducto/all/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Ocurrió un error al obtener los subproductos');
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getRecipe(id) {
    try {//API_URL_S
        const response = await fetch(API_URL_S+`subproducto/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the recipe:", error);
        throw error;  // Puedes manejar el error de la forma que prefieras
    }
}









