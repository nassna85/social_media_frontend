const ButtonWithProgress = ({ onClick, disabled, loading, text }) => {
  return (
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {loading && (
        <div className="spinner-border spinner-border-sm me-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {text}
    </button>
  );
};

export default ButtonWithProgress;
