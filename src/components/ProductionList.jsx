import { useState, useEffect } from 'react';
import { obtenerTodasProducciones, obtenerProduccionesPaginadas } from './api/apiProduccion';
import { getAllSubproductos } from './api/api';
import moment from 'moment';
import 'moment/locale/es'; 

function ProduccionesList() {
  const [producciones, setProducciones] = useState([]);
  const [subproductos, setSubproductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10);
  const [numPagina, setNumPagina] = useState(1);

  useEffect(() => {
    const fetchProduccionesPaginadas = async () => {
      const respuesta = await obtenerProduccionesPaginadas(cantidadPorPagina, numPagina);
      setProducciones(respuesta.producciones);
    };

    const fetchSubproductos = async () => {
      const data = await getAllSubproductos();
      setSubproductos(data);
    };

    fetchProduccionesPaginadas();
    fetchSubproductos();
  }, [numPagina]);

  const handleFechaDesdeChange = (event) => {
    setFechaDesde(event.target.value);
  };
  
  const handleFechaHastaChange = (event) => {
    setFechaHasta(event.target.value);
  };

  const handleNextPage = () => {
    setNumPagina(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setNumPagina(prevPage => Math.max(prevPage - 1, 1));
  };

  const filteredProducciones = producciones.filter((produccion) => {
    const fechaCreacion = moment(produccion.fechaCreacion);
    return (
      (!filtroNombre || produccion.nombre.includes(filtroNombre)) &&
      (!fechaDesde || fechaCreacion.isSameOrAfter(fechaDesde, 'day')) &&
      (!fechaHasta || fechaCreacion.isSameOrBefore(fechaHasta, 'day'))
    );
  });

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-10 uppercase text-center">Sala de Produccion</h1>
      <div className="flex mb-10 items-center justify-around">
        <select 
          className="border-gray-300 border-2 rounded-md p-2 mr-2"
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
        >
          <option value="">Todos los Productos</option>
          {subproductos.map(subproducto => (
            <option value={subproducto.name} key={subproducto._id}>
              {subproducto.name}
            </option>
          ))}
        </select>
        Desde
        <input
          type="date"
          className="border-gray-300 border-2 rounded-md p-2 mr-2"
          value={fechaDesde}
          onChange={handleFechaDesdeChange}
        />
        Hasta
        <input
          type="date"
          className="border-gray-300 border-2 rounded-md p-2"
          value={fechaHasta}
          onChange={handleFechaHastaChange}
        />
      </div>
      <table className="border-2 shadow-2xl mx-auto mt-10 border-green-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Receta</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Fecha de creación</th>
            <th className="border border-gray-300 px-4 py-2">Maestro</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Ingreso al Sistema</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducciones.map((produccion) => (
            <tr key={produccion._id}>
              <td className="border border-gray-300 px-4 py-2">{produccion.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{produccion.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">{moment(produccion.fechaCreacion).format('LL')}</td>
              <td className="border border-gray-300 px-4 py-2">{produccion.maestro}</td>
              <td className="border border-gray-300 px-4 py-2">{produccion.estado}</td>
              <td className="border border-gray-300 px-4 py-2">{moment(produccion.fechaIngreso).format('LLL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-around mt-10">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handlePreviousPage}>
          Anterior
        </button>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ProduccionesList;
