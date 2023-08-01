import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import Modales from "./modales";
import { faSearch, faSearchPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
import imagenModal_info from '../images/modal_info.png';
import imagenModal_wrong from '../images/modal_wrong.png';
import imagenModal_done from '../images/modal_done.png';
import axios from 'axios';

interface FormularioProps {
    searchQuery: string;
}

interface Persona {
    [key: string]: string;
    tipo_documento: string;
    numero_documento: string;
    nombre: string;
    apellido_1: string;
    apellido_2: string;
}


const Formulario: React.FC<FormularioProps> = ({ searchQuery }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isImageModal, setImageModal] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Persona[]>([]);
    const [lastSearchQuery, setLastSearchQuery] = useState<string | null>(null);
    const [actionType, setActionType] = useState<"guardar" | "actualizar">("guardar");


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [formData, setFormData] = useState({
        tipo_documento: "",
        numero_documento: "",
        nombre: "",
        apellido_1: "",
        apellido_2: "",
    });

    const handleLimpiar = () => {
        setFormData({
            nombre: "",
            apellido_1: '',
            apellido_2: '',
            tipo_documento: '',
            numero_documento: '',

        });

        setModalOpen(true);
        setImageModal(imagenModal_done);
    };

    const handleCancelar = () => {
        console.log('Cancelar');
        setModalOpen(true);
        setImageModal(imagenModal_wrong);
    };

    const handleBuscar = async (parametro: string) => {
        if (parametro.trim() !== '') { // Verifica que searchQuery no esté vacío
            console.log("aqui estoy", parametro);
            try {
                const url = `http://localhost:8000/person/api/v1/person/${parametro}`;
                const response = await axios.get<Persona>(url);
                if (response.status === 200) {
                    // Actualizar el estado con los resultados de la búsqueda
                    setFormData(response.data);
                    setActionType("actualizar");

                }

            } catch (error) {
                console.error("Error en la búsqueda:", error);
            }
        }
    };




    // Función para guardar
    const handleGuardarClick = () => {
        setActionType("guardar");
        handleGuardar(formData.numero_documento);
    };

    // Función para actualizar
    const handleActualizarClick = () => {
        setActionType("actualizar");
        handleGuardar(formData.numero_documento);
    };

    const isFormDataValid = (data: Persona) => {
        return (
            data.nombre.trim() !== "" &&
            data.apellido_1.trim() !== "" &&
            data.apellido_2.trim() !== "" &&
            data.tipo_documento.trim() !== "" &&
            data.numero_documento.trim() !== ""
        );
    };


    const handleGuardar = async (parametro: string) => {
        try {
            if (actionType === "guardar") {
                if (!isFormDataValid(formData)) {
                    // Si formData no es válido, muestra el modal de error
                    setModalOpen(true);
                    setImageModal(imagenModal_info);
                    return; // Detén la ejecución de la función para que no se haga la petición
                }

                const url = "http://localhost:8000/person/api/v1/person/";

                const response = await axios.post(url, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                handleLimpiar();
                // Si la petición fue exitosa, mostramos la imagen del modal de éxito
                setModalOpen(true);
                setImageModal(imagenModal_done);


            } else if (actionType === "actualizar") {

                if (!isFormDataValid(formData)) {
                    // Si formData no es válido, muestra el modal de error
                    setModalOpen(true);
                    setImageModal(imagenModal_info);
                    return; // Detén la ejecución de la función para que no se haga la petición
                }
                
                console.log(parametro);
                const url = `http://localhost:8000/person/api/v1/person/${parametro}/`;

                const response = await axios.put(url, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                handleLimpiar();
                // Si la petición fue exitosa, mostramos la imagen del modal de éxito
                setModalOpen(true);
                setImageModal(imagenModal_done);

            }
        } catch (error) {
            console.error("Error en la petición:", (error as Error).message);
            // En caso de error, mostramos la imagen del modal de error
            setModalOpen(true);
            setImageModal(imagenModal_wrong);
        }

    };




    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    useEffect(() => {
        if (lastSearchQuery !== searchQuery) {
            setLastSearchQuery(searchQuery); // Actualizar el lastSearchQuery con el nuevo valor

            // Realizar la búsqueda solo si el valor de búsqueda ha cambiado
            handleBuscar(searchQuery);
        }
    }, [searchQuery, lastSearchQuery]);



    return (
        <div>
            {/* ...contenido del formulario... */}
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <table className='tableF'>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Primer Nombre*
                                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Primer Apellido*
                                        <input type="text" name="apellido_1" value={formData.apellido_1} onChange={handleChange} />
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
                                        Segundo Apellido*
                                        <input type="text" name="apellido_2" value={formData.apellido_2} onChange={handleChange} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Tipo de documento*
                                        <br />
                                        <select className="form-select" name='tipo_documento' value={formData.tipo_documento} onChange={handleChange}>
                                            <option value="" disabled selected>
                                                Seleccione una opción
                                            </option>
                                            <option value="cc">Cédula de ciudadanía</option>
                                            <option value="CE">Cédula de extranjería</option>
                                            <option value="Past">Pasaporte</option>
                                            <option value="nit">NIT</option>
                                        </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Número de documento*
                                        <input type="text" name="numero_documento" value={formData.numero_documento} onChange={handleChange} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', gap: "2%", justifyContent: 'flex-end', marginTop: '2%' }}>
                        <button className="form-button-erase" onClick={handleLimpiar} type="button">
                            Limpiar <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button className="form-button-cancel" onClick={handleCancelar} type="button">
                            Cancelar <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <button className="form-button-save" type="button" onClick={handleGuardarClick}>
                            Guardar <FontAwesomeIcon icon={faSave} />
                        </button>

                        <button className="form-button-upload" type="button" onClick={handleActualizarClick}>
                            Actualizar <FontAwesomeIcon icon={faUpload} />
                        </button>
                    </div>
                </div>


            </form>

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
