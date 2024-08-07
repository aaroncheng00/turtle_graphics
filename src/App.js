import './App.css';
import Canvas from './Canvas/Canvas.js';
import RadioButtons from './radio/RadioButtons.js';
import Setter from './setter/Setter.js';
import Symbols from './Symbols/Symbols.js';
import Submit from './Submit/Submit.js';
import { createRule } from './Parser/Parser.js';
import { useState, useRef } from 'react'

function App() {
  const [preset, setPreset] = useState('fractalTree');
  const [shapeLength, setShapeLength] = useState(5);
  const [shapeSize, setShapeSize] = useState(0);

  const [customRule, setCustomRule] = useState(null);
  const symbols = useRef('');
  const axiom = useRef('');
  const expansion = useRef('');
  const mapping = useRef('');

  return (
    <div style={{fontSize:'10px', backgroundColor:'black'}}>
      <div className='Setter1'>
        <Setter labelName={'Length: '} minValue={"1"} defValue={shapeLength} setValue={setShapeLength}/>
      </div>
      <div className='Setter2'>
        <Setter labelName={'Size(n): '} minValue={"0"} defValue={shapeSize} setValue={setShapeSize}/>
      </div>
      <RadioButtons defaultValue={preset} setValue={setPreset}/>
      <div className='Symbols1'>
        <Symbols numRows={1} labelName={'Symbols (X, F, G, [, ], A)'} setRef={symbols}/>
        <br></br>
        <Symbols numRows={1} labelName={'Axiom (XF)'} setRef={axiom}/>
        <br></br>
        <Symbols numRows={1} labelName={'Expansion Rules (X, XX | F, [XF])'} setRef={expansion}/>
        <br></br>
      </div>
      <div className='Symbols2'>
        <b>Function Mapping</b><br/>
        T45, T-120 = turn (45, -120 in degrees)<br/>
        L = move forward<br/>
        P = push current state<br/>
        R = pop current state, restore previous state<br/>
        N = do nothing<br/>
        Functions are automatically composed from left to right<br></br><br></br>
      <Symbols numRows={2} labelName={'Incomplete Example (X, T.45 | F, P.T.-45 | G, L)'} setRef={mapping}/>
      <br></br>
      <Submit labelName={'submit custom rule'} createRule={
        () => setCustomRule(createRule(symbols.current, axiom.current, expansion.current, mapping.current))}/>
      </div>
      <Canvas presetChoice={preset} shapeLength={shapeLength} shapeSize={shapeSize} newRules={customRule}/>
  </div>
  );
}

export default App;
