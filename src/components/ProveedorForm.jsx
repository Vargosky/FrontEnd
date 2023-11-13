import React, { useState } from 'react';

const ProveedorForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        telefono: "",
        correoElectronico: "",
        sitioWeb: "",
        pais: "Chile",
        ciudad: "",
        contacto: "",
        observacion: "",
        nota: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const tailwindClasses = {
        container: "p-6 w-full max-w-2xl mx-auto mt-10 bg-white border border-green-400  rounded-xl shadow-md transition-transform transform hover:scale-105",
        title: "text-2xl font-bold mb-5 text-center",
        form: "space-y-4",
        label: "font-medium",
        input: "p-2 border rounded-md",
        textarea: "p-2 border rounded-md",
        button: "w-full mt-5 p-2 text-white bg-gray-500 hover:bg-green-400 rounded-md"
    };

    return (
        <div className={tailwindClasses.container}>
            <h2 className={tailwindClasses.title}>Formulario de Proveedor</h2>
            <form onSubmit={handleSubmit} className={tailwindClasses.form}>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required 
                        className={tailwindClasses.input} placeholder="Ej: Juan Perez" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: Calle Principal 123" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: +562 12345678" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Correo Electrónico:</label>
                    <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: proveedor@example.com" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Sitio Web:</label>
                    <input type="url" name="sitioWeb" value={formData.sitioWeb} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: www.example.com" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>País:</label>
                    <input type="text" name="pais" value={formData.pais} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: Chile" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Ciudad:</label>
                    <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: Santiago" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Contacto:</label>
                    <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} 
                        className={tailwindClasses.input} placeholder="Ej: Roberto" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Observación:</label>
                    <textarea name="observacion" value={formData.observacion} onChange={handleChange} 
                        className={tailwindClasses.textarea} placeholder="Escribe aquí las observaciones..."></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className={tailwindClasses.label}>Nota:</label>
                    <textarea name="nota" value={formData.nota} onChange={handleChange} 
                        className={tailwindClasses.textarea} placeholder="Escribe aquí las notas..."></textarea>
                </div>
                <button type="submit" className={tailwindClasses.button}>Guardar Proveedor</button>
            </form>
        </div>
    );
    
};

export default ProveedorForm;
