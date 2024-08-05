import './App.css';
import Canvas from './canvas/Canvas.js';
import RadioButtons from './radio/RadioButtons.js';
import Setter from './setter/Setter.js';
import { useState } from 'react'

function App() {
  const [preset, setPreset] = useState('fractalTree');
  const [shapeLength, setShapeLength] = useState(5);
  const [shapeSize, setShapeSize] = useState(0);
  return (
    <div>
      <RadioButtons setValue={setPreset}/>
      <div className='Setter1'>
        <Setter labelName={'Length: '} defaultValue={shapeLength} setValue={setShapeLength}/>
      </div>
      <div className='Setter2'>
        <Setter labelName={'Size(n): '} defaultValue={shapeSize} setValue={setShapeSize}/>
      </div>
      <Canvas presetChoice={preset} shapeLength={shapeLength} shapeSize={shapeSize}/>
  </div>
  );
}

export default App;
