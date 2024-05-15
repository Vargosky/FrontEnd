import React from 'react'

const TituloCentral = () => {
    return (
        <div>
            <div className='flex flex-col text-orange-300 bg-orange-100 rounded-3xl p-10 text-center'>
                <h1 className='text-3xl font-bold mb-5'>Pastelería</h1>
                <h2 className='titulo-central'>Damasco</h2>
            </div>
            <div className='flex flex-col rounded-3xl p-10 text-center'>
                <h2 className='text-3xl text-orange-800 uppercase'>Sistema de Control de costos e inventario</h2>
            </div>
        </div>
    )
}

export default TituloCentral
