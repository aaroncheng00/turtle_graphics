import './Setter.css'

export default function Setter({ labelName, defaultValue, setValue }) {
    const curValue = defaultValue;
    function updateValue(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }
    return (
        <div onChange={updateValue}>
            <b>{labelName}</b><input type="number" value={curValue} min="1" max="1000" step="1"/>
        </div>
    );
  }