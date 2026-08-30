export default function Setter({ labelName, minValue, defValue, setValue }) {
    function updateValue(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }
    return (
        <div onChange={updateValue} >
            <b>{labelName}</b>
            <input className="input-field" type="number" defaultValue={defValue} min={minValue} max="1000" step="1"/>
        </div>
    );
  }