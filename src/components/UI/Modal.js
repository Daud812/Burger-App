import React from 'react'
import PortalReactDOM from 'react-dom'
import classes from "./Modal.module.css";

const Backdrop = (props) => {

  return <div className={classes.backdrop} onClick={props.onClickBackdrop}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

export const Modal = (props) => {
  return (
    <>
      {PortalReactDOM.createPortal(<Backdrop onClickBackdrop={props.onBackdropClick}/>, portalElement)}
      {PortalReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
