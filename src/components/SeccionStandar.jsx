import React, { useEffect, useState } from 'react';
import { FaPaw } from 'react-icons/fa';


const SeccionStandar = ({titulo,uno,dos,tres}) => {
    
    return (
        <div className="w-full px-4 h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 h-full">
                <div className="w-full md:w-1/3 bg-green-200 p-5 rounded-md flex flex-col items-center justify-center">
                    <div className=' w-full text-3xl font-semibold flex justify-center'>{titulo ? titulo : "Titulo"}</div>
                    <div className='w-full h-full flex justify-center items-center'>
                        {uno ? uno : "uno"}
                    </div>
                </div>
                <div className="w-full md:w-1/3 bg-blue-300 p-5 rounded-md flex flex-col">
                {dos ? dos : "dos"}
                </div>
                <div className="w-full md:w-1/3 bg-red-300 p-5 rounded-md flex items-center justify-center">
                {tres ? tres : "tres"}
                </div>
            </div>
        </div>
    );
};

export default SeccionStandar;
