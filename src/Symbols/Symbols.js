import './Symbols.css'

export default function Symbols({ numRows, labelName, setValue }) {
    function updateValue(e) {
        setValue(e.target.value);
    }
    return (
        <div>
            <b>{labelName}</b>
            <br></br>
            <textarea style={{backgroundColor: 'lightpink'}} rows={numRows} defaultValue='' name='preset'onChange={updateValue}/>
        </div>
    );
}