import './RadioButtons.css'

export default function RadioButtons({ setValue }) {
    function updateValue(e) {
        setValue(e.target.value);
    }
    return (
        <div onChange={updateValue} className='RadioButtons'>
            <b>Presets</b>
            <br></br>
            <input type='radio' value='fractalTree' name='preset'/> Fractal Tree
            <br></br>
            <input type='radio' value='fractalPlant' name='preset'/> Fractal Plant
            <br></br>
            <input type='radio' value='sierpinskiTriangle' name='preset'/> Sierpinski Triangle
            <br></br>
            <input type='radio' value='dragonCurve' name='preset'/> Dragon Curve
            <br></br>
        </div>
    );
  }