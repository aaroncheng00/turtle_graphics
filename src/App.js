import './App.css';
import Canvas from './Canvas/Canvas.js';
import RadioButtons from './Radio/RadioButtons.js';
import Setter from './Setter/Setter.js';
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
    <div style={{fontSize:'11px', backgroundColor:'black'}}>
      <div className='OptionsMenu'>
        <Setter labelName={'Length: '} minValue={"1"} defValue={shapeLength} setValue={setShapeLength}/>
        <Setter labelName={'Size(n): '} minValue={"0"} defValue={shapeSize} setValue={setShapeSize}/>
        <RadioButtons defaultValue={preset} setValue={setPreset}/>
        <Symbols numRows={1} labelName={'Symbols (X, F, [, ])'} setRef={symbols}/>
        <Symbols numRows={1} labelName={'Axiom (XF)'} setRef={axiom}/>
        <Symbols numRows={1} labelName={'Expansion Rules (X, XX | F, [XF])'} setRef={expansion}/>
        <br></br>
        <b>Function Mapping</b><br/>
          • T.X = turn X degrees<br/>
          • L = move forward<br/>
          • P = push current state<br/>
          • R = pop current state, restore previous state<br/>
          • N = do nothing<br/>
          Functions are automatically composed from left to right<br></br>
        <Symbols numRows={2} labelName={'Example (X, T.45 | F, T.-45 | [, P | ], R.L)'} setRef={mapping}/>
        <br></br>
        <Submit labelName={'submit custom rule'} createRule={
          () => setCustomRule(createRule(symbols.current, axiom.current, expansion.current, mapping.current))}/>
      </div>
      <Canvas presetChoice={preset} shapeLength={shapeLength} shapeSize={shapeSize} newRules={customRule}/>
  </div>
  );
}

export default App;
