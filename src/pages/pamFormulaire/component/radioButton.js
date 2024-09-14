export const RadioButton = (props) => {
  const { changed, id, isSelected, label, value, name} = props;
  return (
    <div className="RadioButton">
      <input
        className="form-check-input"
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        name={name}
      />
      <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>
  );
};
