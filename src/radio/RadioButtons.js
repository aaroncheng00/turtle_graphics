import './RadioButtons.css'

export default function RadioButtons({ defaultValue, setValue }) {
    function updateValue(e) {
        setValue(e.target.value);
    }
    return (
        <div onChange={updateValue} className='RadioButtons'>
            <b>Presets:</b>
            <br></br>
            <input type='radio' value='fractalTree' name='preset' readOnly checked={defaultValue == 'fractalTree'}/> Fractal Tree
            <br></br>
            <input type='radio' value='fractalPlant' name='preset' readOnly checked={defaultValue == 'fractalPlant'}/> Fractal Plant
            <br></br>
            <input type='radio' value='sierpinskiTriangle' name='preset' readOnly checked={defaultValue == 'sierpinskiTriangle'}/> Sierpinski Triangle
            <br></br>
            <input type='radio' value='dragonCurve' name='preset' readOnly checked={defaultValue == 'dragonCurve'}/> Dragon Curve
            <br></br>
            <input type='radio' value='Custom' name='preset' readOnly checked={defaultValue == 'Custom'}/> Custom
            <br></br>
        </div>
    );
  }