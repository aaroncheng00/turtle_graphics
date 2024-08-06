import './Setter.css'

export default function Setter({ labelName, minValue, defValue, setValue }) {
    function updateValue(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }
    return (
        <div onChange={updateValue}>
            <b>{labelName}</b><input type="number" style={{backgroundColor: 'lightpink'}} defaultValue={defValue} min={minValue} max="1000" step="1"/>
        </div>
    );
  }