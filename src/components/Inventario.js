import React, { useState, useEffect } from "react";
import { getRawMaterialsPaginated } from "./api/api";


function convertirTexto(texto) {
    if (texto == "gramos") {
        return "[g]";
    } else if (texto == "unidad") {
        return "un";
    } else {
        return " ";
    }
}



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
                        <tr className="uppercase">
                            <th className="py-2 w-1/3">Nombre</th>
                            <th className="py-2">Stock</th>
                            <th className="py-2 hidden md:table-cell px-3">Stock Crítico</th>
                            <th className="py-2 px-3">CPU</th>
                            {/* Agrega más columnas aquí según necesites */}
                        </tr>
                    </thead>
                    <tbody>
                        {console.log({ rawMaterials })}
                        {rawMaterials.map((material) => (
                            <tr
                                key={material._id}
                                className={`${material.cantidad <= material.stockCritico
                                    ? "bg-red-300"
                                    : "bg-green-300"
                                    } text-center text-lg md:text-xl`} // Adjust font size
                            >
                                <td className="p-2 w-1/3">{material.nombre}</td>
                                <td className="py-3">{material.cantidad} {convertirTexto(material.unidad)} </td>
                                <td className="py-3 hidden md:table-cell px-3">{material.stockCritico}</td>
                                <td className="py-3 px-3"> $ {material.costoPorUnidad}</td>
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
                            className={`mr-2 mb-2 ${pageNum === page ? "text-blue-500 font-bold bg-white rounded-full px-3 py-1 border border-black" : ""
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
