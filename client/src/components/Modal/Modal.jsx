import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, content, recipeCreatedMessageVisible }) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          {recipeCreatedMessageVisible ? (
            <div>
              <h1>Receta Creada</h1>
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
