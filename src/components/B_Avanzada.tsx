import React, { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ITEMS_PER_PAGE = 5; // Número de registros por página

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (show) {
            fetchData();
        }
    }, [show]);

    const fetchData = async () => {
        try {
            const url = "http://localhost:8000/person/api/v1/person/";
            const response = await axios.get(url);

            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
    // Función para obtener los registros de la página actual
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return data.slice(startIndex, endIndex);
    };

    // Función para avanzar a la siguiente página
    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    // Función para retroceder a la página anterior
    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // Función para eliminar un registro por su id
    const handleDelete = async (id: number) => {
        try {
            const url = `http://localhost:8000/person/api/v1/person/${id}`;
            const response = await axios.delete(url);

            if (response.status === 204) {
                // Registro eliminado con éxito, volvemos a cargar los datos
                fetchData();
            }
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div style={{
                    background: 'linear-gradient(to right, #8DBB2C, #0C2D43, #39A6DC)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                }}>
                    Búsqueda Avanzada
                </div>
                <div className="modal-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo de documento</th>
                                <th>Número de documento</th>
                                <th>Primer nombre</th>
                                <th>Primer apellido</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {getCurrentPageData().map((item) => (
                                <tr key={item.id}>
                                    <td>{item.tipo_documento}</td>
                                    <td>{item.numero_documento}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido_1}</td>
                                    <td>
                                      
                                        <button onClick={() => handleDelete(item.numero_documento)}>
                                        <i className="icon-delete"></i>
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='paginador'>
                    <button onClick={goToPrevPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span>Página {currentPage}</span>
                    <button onClick={goToNextPage} disabled={currentPage * ITEMS_PER_PAGE >= data.length}>
                        Siguiente
                    </button>
                </div>
                </div>
                
                {children}
            </div>
        </div>
    );
};

export default Modal;
