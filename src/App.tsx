import React, { useState, ChangeEvent } from 'react';
import Modal from './components/B_Avanzada';
import Info from './components/informacion';
import './assets/css/Modal.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSearchPlus, faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [searchQueryToSend, setSearchQueryToSend] = useState<string>(''); // Nuevo estado para almacenar el valor del input solo cuando se haga clic en el botón


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Obtener el valor del input del evento
    const value = event.target.value;
  
    // Verificar si el valor es diferente al valor actual
    if (value !== searchText) {
      // Actualizar el estado de searchText con el valor del input
      setSearchText(value);
    }
  };

  const handleSearchButtonClick = () => {
    setSearchQueryToSend(searchText); // Al hacer clic en el botón, actualizamos el nuevo estado con el valor del input
    setSearchText(''); // Luego, reseteamos el input estableciendo searchText como una cadena vacía

  };

  return (
    <div>
      <h1>Administrador de personas</h1>
      <div className="modal-title">Información</div>
      <br />
      <label className="form-labelT">Tipo de documento*</label>
      <label className="form-labelD">Número de documento*</label>
      <div className="form-group">

        <select className="form-select">
          <option value="cedula_ciudadania">Cédula de ciudadanía</option>
          <option value="cedula_extranjeria">Cédula de extranjería</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="nit">NIT</option>
        </select>

        <input
          type="text"
          className="form-input"
          value={searchText}
          onChange={handleSearchChange}
        />

<button className="form-button-search" onClick={handleSearchButtonClick}>
          Buscar <FontAwesomeIcon icon={faSearch} className="form-icon" />
        </button>

        <button className="form-button-advanced" onClick={handleOpenModal}>
          BUSQUEDA AVANZADA <FontAwesomeIcon icon={faSearchPlus} className="form-icon" />
        </button>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-buttons">
          <button className="form-button-cancel" onClick={handleCloseModal}>
            Cancelar <FontAwesomeIcon icon={faTimes} className="form-icon" />
          </button>
        </div>
      </Modal>
      <Info searchQuery={searchQueryToSend || ""} />
    </div>
  );
};

export default App;
