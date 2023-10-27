import classes from './ConfirmDialog.module.css';

function ConfirmDialog(props) {
    
    function cancelHandler() {
        props.onCancel();
    }

    function confirmHandler() {
        props.onConfirm();
    }

    return <div className={classes.backdrop}>
        <div className={classes.modal}>
            <p>{props.message}</p>
            <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
            <button className="btn" onClick={confirmHandler}>Confirm</button>
        </div>
    </div>
}

export default ConfirmDialog;