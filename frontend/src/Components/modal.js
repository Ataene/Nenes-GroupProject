import React from "react";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 classname="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">This is modal content</div>
        <div className="modal-footer">
          <button className="buttin">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
