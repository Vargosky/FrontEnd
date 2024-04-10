import React, { useState, useEffect } from "react";
import { getAllRawMaterials } from "./api/api";

const updateRawMaterial = async (id, data) => {
    console.log({ id: id, data: data })
    try {
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

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-5">
                <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
                {children}
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

function BuyList() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [percentage, setPercentage] = useState(10);


    // Función para generar el mensaje
    function generateMessage() {
        // Encabezado de la "tabla"
        let message = 'Nombre       | Stock | Stock Crítico | CPU\n';
        message += '------------------------------------------\n';

        // Iterar sobre cada material y agregarlo al mensaje
        materialsAboveCritical.forEach(mat => {
            // Asegurarse de que cada columna tenga un ancho fijo para alinear los datos
            const nombre = mat.nombre.padEnd(12, ' '); // Asume un máximo de 12 caracteres para el nombre
            const stock = mat.cantidad.toString().padEnd(6, ' ') + convertirTexto(mat.unidad).padEnd(4, ' ');
            const stockCritico = mat.stockCritico.toString().padEnd(10, ' ');
            const costoPorUnidad = `$${mat.costoPorUnidad.toString().padStart(3, ' ')}`;

            message += `${nombre}| ${stock}| ${stockCritico}| ${costoPorUnidad}\n`;
        });

        return `Lista de Materias Primas sobre el Stock Crítico:\n${message}`;
    }

    // Función para enviar por WhatsApp
    const sendWhatsAppMessage = () => {
        const message = generateMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank'); // Abre WhatsApp Web o la app de WhatsApp con el mensaje predefinido
    };


    useEffect(() => {
        async function fetchRawMaterials() {
            const result = await getAllRawMaterials();
            setRawMaterials(result)
            console.log(result);
        }
        fetchRawMaterials();

    }, []);

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

            const updatedMaterials = rawMaterials.map(mat =>
                mat._id === updatedMaterial._id ? updatedMaterial : mat
            );
            setRawMaterials(updatedMaterials);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const materialsAboveCritical = rawMaterials.filter(material => {
        const criticalIncrease = (material.stockCritico * percentage) / 100;
        return material.cantidad <= material.stockCritico + criticalIncrease;
    });

    return (
        <div className="shadow-lg p-5 rounded-lg bg-gray-100">
            <h2 className="text-center font-bold my-10 text-2xl md:text-3xl">Listado de Materias Primas</h2>

            {/* Selector de porcentaje */}
            <div className="mb-4">
                <label htmlFor="percentage" className="block mb-2">Porcentaje sobre el stock crítico:</label>
                <select
                    id="percentage"
                    value={percentage}
                    onChange={e => setPercentage(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                >
                    {[0, ...Array.from({ length: 10 }, (_, i) => (i + 1) * 10)].map(value => (
                        <option key={value} value={value}>
                            {value}%
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={sendWhatsAppMessage} className="mt-4 p-2 bg-green-500 text-white rounded">
                    Enviar Lista por WhatsApp
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-white shadow-md rounded-md">
                    <thead>
                        <tr className="text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 md:px-6 text-left">Nombre</th>
                            <th className="py-3 px-4 md:px-6 text-center">Stock</th>
                            <th className="hidden md:table-cell py-3 px-4 md:px-6 text-center">Stock Crítico</th>
                            <th className="hidden md:table-cell py-3 px-4 md:px-6 text-center">CPU</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {materialsAboveCritical.map((material) => (
                            <tr key={material._id} onClick={() => handleRowClick(material)}
                                className={`${material.cantidad <= material.stockCritico ? "bg-red-200" : "bg-green-200"} border-b border-gray-200 hover:bg-gray-100`}>
                                <td className="py-3 px-4 md:px-6 text-left whitespace-nowrap">{material.nombre}</td>
                                <td className="py-3 px-4 md:px-6 text-center">{material.cantidad} {convertirTexto(material.unidad)}</td>
                                <td className="hidden md:table-cell py-3 px-4 md:px-6 text-center">{material.stockCritico}</td>
                                <td className="hidden md:table-cell py-3 px-4 md:px-6 text-center">$ {material.costoPorUnidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                            <div className="flex justify-between mt-6">
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

export default BuyList;