import React, { useState, useEffect } from "react";
import { getRawMaterialsPaginated } from "./api/api";



const updateRawMaterial = async (id, data) => {
    console.log({ id: id, data: data })
    try {
        // Convertir los datos a formato x-www-form-urlencoded
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const response = await fetch(`https://apii-bay.vercel.app/api/mmpp/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
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



// Componente Modal
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/2">
                {children}
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
            </div>
        </div>
    );
}

function convertirTexto(texto) {
    if (texto === "gramos") {
        return "[g]";
    } else if (texto === "unidad") {
        return "un";
    } else {
        return " ";
    }
}

function Inventario() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    useEffect(() => {
        async function fetchRawMaterials() {
            const result = await getRawMaterialsPaginated(page);
            if (result) {
                setTotalPages(result.totalPages);
                setRawMaterials(result.rawMaterials);
            }
        }
        fetchRawMaterials();
    }, [page]);

    const handleRowClick = (material) => {
        setSelectedMaterial(material);
        setIsModalOpen(true);
    };


    const handleSave = async () => {
        try {
            const updatedData = {
                nombre: selectedMaterial.nombre,
                costoPorUnidad: selectedMaterial.costoPorUnidad,
                cantidad: selectedMaterial.cantidad,
                stockCritico: selectedMaterial.stockCritico
            };

            const updatedMaterial = await updateRawMaterial(selectedMaterial._id, updatedData);
            console.log("Materia prima actualizada:", updatedMaterial);

            // Actualizar la lista rawMaterials con la materia prima actualizada
            const updatedMaterials = rawMaterials.map(mat =>
                mat._id === updatedMaterial._id ? updatedMaterial : mat
            );
            setRawMaterials(updatedMaterials);

        // Cerrar el modal
        setIsModalOpen(false);

        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <div className="shadow-2xl p-5 rounded-2xl">
            <h2 className="text-center font-black my-10 text-2xl md:text-3xl">Listado de Materias Primas</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="uppercase">
                            <th className="py-2 w-1/3">Nombre</th>
                            <th className="py-2">Stock</th>
                            <th className="py-2 hidden md:table-cell px-3">Stock Crítico</th>
                            <th className="py-2 px-3">CPU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rawMaterials.map((material) => (
                            <tr
                                key={material._id}
                                onClick={() => handleRowClick(material)}
                                className={`${material.cantidad <= material.stockCritico
                                    ? "bg-red-300"
                                    : "bg-green-300"
                                    } text-center text-lg md:text-xl`}
                            >
                                <td className="p-2 w-1/3">{material.nombre}</td>
                                <td className="py-3">{material.cantidad} {convertirTexto(material.unidad)}</td>
                                <td className="py-3 hidden md:table-cell px-3">{material.stockCritico}</td>
                                <td className="py-3 px-3">$ {material.costoPorUnidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-xl flex flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                        <button
                            key={pageNum}
                            className={`mr-2 mb-2 ${pageNum === page ? "text-blue-500 font-bold bg-white rounded-full px-3 py-1 border border-black" : ""}`}
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    )
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    {selectedMaterial && (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Editar {selectedMaterial.nombre}</h2>
            <form className="w-full max-w-md">
                {/* Nombre */}
                <div className="mb-4">
                    <label className="block mb-2">Nombre</label>
                    <input 
                        type="text" 
                        value={selectedMaterial.nombre} 
                        onChange={(e) => setSelectedMaterial(prev => ({ ...prev, nombre: e.target.value }))}
                        className="border p-2 w-full" 
                    />
                </div>

                {/* Precio por Unidad */}
                <div className="mb-4">
                    <label className="block mb-2">Precio por Unidad</label>
                    <input 
                        type="number" 
                        value={selectedMaterial.costoPorUnidad} 
                        onChange={(e) => setSelectedMaterial(prev => ({ ...prev, costoPorUnidad: e.target.value }))}
                        className="border p-2 w-full" 
                    />
                </div>

                {/* Cantidad */}
                <div className="mb-4">
                    <label className="block mb-2">Inventario</label>
                    <input 
                        type="number" 
                        value={selectedMaterial.cantidad} 
                        onChange={(e) => setSelectedMaterial(prev => ({ ...prev, cantidad: e.target.value }))}
                        className="border p-2 w-full" 
                    />
                </div>

                {/* Stock Crítico */}
                <div className="mb-4">
                    <label className="block mb-2">Stock Crítico</label>
                    <input 
                        type="number" 
                        value={selectedMaterial.stockCritico} 
                        onChange={(e) => setSelectedMaterial(prev => ({ ...prev, stockCritico: e.target.value }))}
                        className="border p-2 w-full" 
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-between">
                    <button type="button" onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Guardar</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 p-2 rounded">Cancelar</button>
                    <button type="button" className="bg-red-500 text-white p-2 rounded">Borrar</button>
                </div>
            </form>
        </div>
    )}
</Modal>



        </div>
    );
}

export default Inventario;
