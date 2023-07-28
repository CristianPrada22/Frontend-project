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
            <div className="modal-alerts">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
               
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
