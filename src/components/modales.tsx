import React, { ReactNode,useState } from 'react';
import '../assets/css/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSearchPlus, faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';

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
                {children}
                <div className="modal-buttons">
          <button className="form-button-erase">
            Borrar <FontAwesomeIcon icon={faEraser} className="form-icon" />
          </button>
          <button className="form-button-cancel" onClick={handleCloseModal}>
            Cancelar <FontAwesomeIcon icon={faTimes} className="form-icon" />
          </button>
        </div>
            </div>
        </div>
    );
};

export default Modal;