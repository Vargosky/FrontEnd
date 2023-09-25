import React from 'react';
import Link from 'next/link';
import { useState } from 'react';



// Aquí están tus componentes. Por ahora, son solo placeholders.
const CrearProducto = () => <h1>Crear Producto</h1>;
const MMPPMerma = () => <h1>MMPP Merma</h1>;
const SolicitudMaterial = () => <h1>Solicitud de Material</h1>;
const AyudaReceta = () => <h1>Ayuda Receta</h1>;

// Puedes poner los datos de los menus en un array de objetos para mantener el código DRY
const menus = [
    { name: 'Crear Producto', path: '/crear-producto', component: CrearProducto },
    { name: 'Crear Masa', path: '/mmp-merma', component: MMPPMerma },
    { name: 'Crear Relleno', path: '/solicitud-material', component: SolicitudMaterial },
    { name: 'Mermas', path: '/ayuda-receta', component: AyudaReceta },
];

const Produccion = () => {

    const [activeComponent, setActiveComponent] = useState(null);

    const handleClick = component => {
        setActiveComponent(() => component);
    };

    if (activeComponent) {
        const ActiveComponent = activeComponent; // Esto es necesario porque React requiere que los nombres de los componentes comiencen con una letra mayúscula
        return <ActiveComponent />;
    }
    return (
        <div className="flex flex-wrap justify-center items-center h-screen p-5 bg-gray-100">
            {menus.map((menu, index) => (
                <Link key={index} href={menu.path}>
                    <div className="w-64 h-64 m-4 flex items-center justify-center text-2xl font-bold text-white rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out"
                        style={{ background: `hsl(${index * 60}, 70%, 50%)` }}
                        onClick={() => handleClick(menu.component)}>
                        {menu.name}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Produccion;
