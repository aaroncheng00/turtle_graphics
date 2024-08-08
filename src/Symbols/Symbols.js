export default function Symbols({ numRows, labelName, setRef }) {
    function updateRef(e) {
        setRef.current = e.target.value;
    }
    return (
        <div style={{ position: 'relative', paddingTop: '8px'}}>
            <b>{labelName}</b>
            <br></br>
            <div style={{paddingTop: '1px'}}>
            <textarea style={{backgroundColor: 'lightpink', paddingTop: '5px'}} rows={numRows} onChange={updateRef} defaultValue='' name='preset'/>
            </div>
        </div>
    );
}