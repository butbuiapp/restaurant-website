import classes from './Modal.module.css';

function Modal(props) {
    
    return <div className={classes.backdrop}>
        <div className={classes.modal}>
            {props.children}
        </div>
    </div>
}

export default Modal;