
import React, { useState, useEffect } from "react";
import { getRawMaterialsPaginated,getAllRawMaterials } from "./api/api";

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

    const [rawMaterials, setRawMaterials] = useState([]);
    const [selectedPercentage, setSelectedPercentage] = useState(10);

    useEffect(() => {
        async function fetchRawMaterials() {
            const result = getAllRawMaterials;
        }
        fetchRawMaterials();
    }, [selectedPercentage]);

    const exportToText = (filteredMaterials) => {
        let textContent = "Listado de Materias Primas Críticas:\n\n";
        filteredMaterials.forEach(material => {
            textContent += `Nombre: ${material.nombre}\n`;
            textContent += `Stock: ${material.cantidad} ${convertirTexto(material.unidad)}\n`;
            textContent += `Stock Crítico: ${material.stockCritico}\n`;
            textContent += `CPU: $${material.costoPorUnidad}\n\n`;
        });

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
        const textURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', textURL);
        link.setAttribute('download', 'materias_primas_criticas.txt');
        document.body.appendChild(link);

        link.click();
    };

    const filteredMaterials = rawMaterials.filter(material => {
        const stockConPorcentaje = material.stockCritico * (1 + selectedPercentage / 100);
        return material.cantidad <= stockConPorcentaje; // Captura tanto los que están por debajo como los cercanos al límite crítico
    });

    return (
        <div className="shadow-lg p-5 rounded-lg bg-gray-100">
            <h2 className="text-center font-bold my-10 text-2xl md:text-3xl">Listado de Materias Primas</h2>
            <div className="mb-4">
                <label htmlFor="percentage" className="block mb-2">Porcentaje antes del Stock Crítico</label>
                <select
                    id="percentage"
                    value={selectedPercentage}
                    onChange={(e) => setSelectedPercentage(Number(e.target.value))}
                    className="border p-2 w-full"
                >
                    {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(percentage => (
                        <option key={percentage} value={percentage}>{percentage}%</option>
                    ))}
                </select>
            </div>

            <div className="justify-around space-x-6">

            <button
                onClick={() => exportToCSV(filteredMaterials)}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Exportar a CSV
            </button>

            <button
                onClick={() => exportToText(filteredMaterials)}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Exportar a Texto
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
                        {filteredMaterials.map((material) => (
                            <tr key={material._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4 md:px-6 text-left whitespace-nowrap">{material.nombre}</td>
                                <td className="py-3 px-4 md:px-6 text-center">{material.cantidad} {convertirTexto(material.unidad)}</td>
                                <td className="hidden md:table-cell py-3 px-4 md:px-6 text-center">{material.stockCritico}</td>
                                <td className="hidden md:table-cell py-3 px-4 md:px-6 text-center">$ {material.costoPorUnidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inventario;
