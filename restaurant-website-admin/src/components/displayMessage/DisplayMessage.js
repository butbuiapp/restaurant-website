import './DisplayMessage.css';

function DisplayMessage({ message, type }) {
  return (
    <div className="display-message">
      <div className={type}>
        {message}
      </div>
    </div>
  );
}

export default DisplayMessage;