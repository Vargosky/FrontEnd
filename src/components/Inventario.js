import React, { useState, useEffect } from "react";
import { getRawMaterialsPaginated } from "./api/api";

function Inventario() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rawMaterials, setRawMaterials] = useState([]);

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

    return (
        <div className="shadow-2xl p-5 rounded-2xl">
            <h2 className="text-center font-black my-10 text-2xl md:text-3xl">Listado de Materias Primas</h2>
            
            <div className="overflow-x-auto"> {/* Makes table scrollable on smaller screens */}
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Stock Crítico</th>
                            <th>costoPorUnidad</th>
                            {/* Agrega más columnas aquí según necesites */}
                        </tr>
                    </thead>
                    <tbody>
                        {console.log({rawMaterials})}
                        {rawMaterials.map((material) => (
                            <tr
                                key={material._id}
                                className={`${
                                    material.cantidad <= material.stockCritico
                                        ? "bg-red-300"
                                        : "bg-green-300"
                                } text-center text-lg md:text-xl`} // Adjust font size
                            >
                                <td>{material.nombre}</td>
                                <td>{material.cantidad}</td>
                                <td>{material.stockCritico}</td>
                                <td>{material.costoPorUnidad}</td>
                                {/* Agrega más celdas aquí según necesites */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div className="mt-4 text-xl flex flex-wrap"> {/* Flex wrap allows buttons to wrap */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                        <button
                            key={pageNum}
                            className={`mr-2 mb-2 ${
                                pageNum === page ? "text-blue-500 font-bold bg-white rounded-full px-3 py-1 border border-black" : ""
                            }`}
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    )
                )}
            </div>
        </div>
    );
    
}

export default Inventario;
