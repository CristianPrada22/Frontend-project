import React, { ReactNode } from 'react';
import '../assets/css/Modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div style={{
                    background: 'linear-gradient(to right, #8DBB2C, #0C2D43, #39A6DC)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                }}>
                    Búsqueda Avanzada
                </div>
                <div className="modal-table">
                    <input type="text" placeholder="Buscar" />
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
                            <tr>
                                <td>Cedula de ciudadanía</td>
                                <td>12345678</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>
                                    <button>
                                        <i className="icon-edit"></i>
                                    </button>
                                    <button>
                                        <i className="icon-delete"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="paginador">Paginador aquí</div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
