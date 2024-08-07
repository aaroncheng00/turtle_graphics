import './Symbols.css'

export default function Symbols({ numRows, labelName, setRef }) {
    function updateRef(e) {
        setRef.current = e.target.value;
    }
    return (
        <div>
            <b>{labelName}</b>
            <br></br>
            <textarea style={{backgroundColor: 'lightpink'}} rows={numRows} onChange={updateRef} defaultValue='' name='preset'/>
        </div>
    );
}