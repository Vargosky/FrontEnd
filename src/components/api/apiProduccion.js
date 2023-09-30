import axios from 'axios';
import { get } from 'react-hook-form';
const API_URL = 'https://apii-bay.vercel.app/api/produccion/';



export const obtenerTodasProducciones = async () => {
    try {
        const response = await fetch(API_URL+"all/");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un error al obtener las producciones:", error);
    }
};

//https://apii-bay.vercel.app/api/produccion/
export const obtenerProduccionPorId = async (id) => {
    try {
        const response = await fetch(API_URL+ id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Hubo un error al obtener la producción con ID ${id}:`, error);
    }
};

export const crearNuevaProduccion = async (produccionData) => {
    try {
        const response = await fetch(API_URL+'create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produccionData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un error al crear la producción:", error);
    }
};


export const actualizarProduccionPorId = async (id, produccionData) => {
    try {
        const response = await fetch(API_URL+`${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produccionData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Hubo un error al actualizar la producción con ID ${id}:`, error);
    }
};

export const eliminarProduccionPorId = async (id) => {
    try {
        const response = await fetch(API_URL`${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Hubo un error al eliminar la producción con ID ${id}:`, error);
    }
};

//https://apii-bay.vercel.app/api/produccion/all/      https://apii-bay.vercel.app/api/produccion/
export const obtenerProduccionesPaginadas = async (limite, pagina) => {
    try {
      const response = await axios.get(`${API_URL}${limite}/${pagina}`, {
        method:'GET',
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Hubo un error al obtener las producciones:', error);
      throw error;
    }
  };


