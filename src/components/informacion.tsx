import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Modales from "./modales";

const Formulario = () => {
    
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);

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
    };

    const handleCancelar = () => {
        // Lógica para cancelar (puedes implementar lo que necesites)
        console.log('Cancelar');
    };

    const handleGuardar = () => {
        // Lógica para guardar (puedes implementar lo que necesites)
        console.log('Guardar', formData);
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
            <div style={{display: 'flex',justifyContent:'flex-end',marginTop: '2%'}}>
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
        </div>
    );
};

export default Formulario;
