const InputField = ({
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  hasError,
  errorMessage,
}) => {
  let inputClassName = "form-control";
  if (hasError !== undefined) {
    inputClassName += hasError ? " is-invalid" : " is-valid";
  }
  return (
    <div className="mb-3">
      {label && <label>{label}</label>}
      <input
        className={inputClassName}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {hasError && <span className="invalid-feedback">{errorMessage}</span>}
    </div>
  );
};

InputField.defaultProps = {
  onChange: () => {},
};

export default InputField;
