import './Submit.css'

export default function Submit({ labelName, createRule }) {
    return (
        <input type='submit' value={labelName} name='preset' onClick={createRule}/>
    );
}