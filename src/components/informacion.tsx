import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Modales from "./modales";
import { faSearch, faSearchPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
import imagenModal_info from '../images/modal_info.png';
import imagenModal_wrong from '../images/modal_wrong.png';
import imagenModal_done from '../images/modal_done.png';

const Formulario = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isImageModal, setImageModal] = useState<string>('');

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaNacimiento: '',
        paisNacimiento: '',
        genero: '',
        estadoCivil: '',
    });

    const handleLimpiar = () => {
        setFormData({
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: '',
            paisNacimiento: '',
            genero: '',
            estadoCivil: '',
        });
        setModalOpen(true);
        setImageModal(imagenModal_info);
    };

    const handleCancelar = () => {
        // Lógica para cancelar (puedes implementar lo que necesites)
        console.log('Cancelar');
        setModalOpen(true);
        setImageModal(imagenModal_wrong);
    };

    const handleGuardar = () => {
        // Lógica para guardar (puedes implementar lo que necesites)
        console.log('Guardar', formData);
        setModalOpen(true);
        setImageModal(imagenModal_done);
    };

    return (
        <div>
            <div className="modal-title">Información</div>
            <br />
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <table className='tableF'>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Primer Nombre*
                                        <input type="text" name="primerNombre" value={formData.primerNombre} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Primer Apellido*
                                        <input type="text" name="primerApellido" value={formData.primerApellido} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Fecha de Nacimiento* <br /><br />
                                        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Género*
                                        <input type="text" name="genero" value={formData.genero} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Segundo Nombre*
                                        <input type="text" name="segundoNombre" value={formData.segundoNombre} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Segundo Apellido*
                                        <input type="text" name="segundoApellido" value={formData.segundoApellido} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        País de Nacimiento*
                                        <input type="text" name="paisNacimiento" value={formData.paisNacimiento} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Estado Civil*
                                        <input type="text" name="estadoCivil" value={formData.estadoCivil} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%' }}>
                <button className="form-button-erase" onClick={handleLimpiar}>
                    Limpiar <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button className="form-button-cancel" onClick={handleCancelar}>
                    Cancelar <FontAwesomeIcon icon={faTimes} />
                </button>
                <button className="form-button-save" onClick={handleGuardar}>
                    Guardar <FontAwesomeIcon icon={faSave} />
                </button>
            </div>
            <Modales show={isModalOpen} onClose={handleCloseModal}>
                <img src={isImageModal} alt="Imagen modal" />
                <div className="modal-buttons">
                    <button className="form-button-cancel" onClick={handleCloseModal}>
                        Cancelar <FontAwesomeIcon icon={faTimes} className="form-icon" />
                    </button>
                    <button className="form-button-save2" onClick={handleCloseModal}>
                        Aceptar <FontAwesomeIcon icon={faSave} className="form-icon" />
                    </button>
                </div>
            </Modales>
        </div>
    );
};

export default Formulario;
