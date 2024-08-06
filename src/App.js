import './App.css';
import Canvas from './Canvas/Canvas.js';
import RadioButtons from './radio/RadioButtons.js';
import Setter from './setter/Setter.js';
import Symbols from './Symbols/Symbols.js';
import Submit from './Submit/Submit.js';
import { Rules, functionMap } from './Canvas/Rules.js';
import { compose } from './Canvas/Utils.js';
import { useState } from 'react'

function App() {
  const [preset, setPreset] = useState('fractalTree');
  const [shapeLength, setShapeLength] = useState(5);
  const [shapeSize, setShapeSize] = useState(0);

  const [customRule, setCustomRule] = useState(new Rules());
  const [symbols, setSymbols] = useState('');
  const [axiom, setAxiom] = useState('');
  const [expansion, setExpansion] = useState('');
  const [mapping, setMapping] = useState('');

  var letterMap = new Map()

  function parseSymbols(raw) {
    var parsed = raw.split(/[, ]+/).filter(Boolean);
    return parsed;
  }

  function parseExpansion(raw) {
    var mp = new Map();
    var parsed = raw.split(/[|]+/).filter(Boolean);
    for (let i = 0; i < parsed.length; i++) {
      var cur = parsed[i].split(/[, ]+/).filter(Boolean);
      console.log("cur", cur);
      mp.set(cur[0], cur[1]);
    }
    return mp;
  }

  function parseMapping(raw) {
    var mp = new Map();
    var parsed = raw.split(/[|]+/).filter(Boolean);
    for (let i = 0; i < parsed.length; i++) {
      var cur = parsed[i].split(/[, ]+/).filter(Boolean);
      var rt = cur[1].split(/[.]+/).filter(Boolean);
      var tot = [];
      for (let j = 0; j < rt.length; j++) {
        switch (rt[j]) {
          case 'T':
            if (j + 1 == rt.length) {
              console.log('turn must be followed by angle');
              break;
            }
            j++;
            var angle = Number(rt[j]);
            tot.push(functionMap.get('turn')(angle));
            break;
          case 'L':
            tot.push(functionMap.get('line'));
            break;
          case 'P':
            tot.push(functionMap.get('push'));
            break;
          case 'R':
            tot.push(functionMap.get('restore'));
            break;
          case 'N':
            tot.push(functionMap.get('nothing'));
            break;
          default:
            console.log(`symbol ${rt[j]} not found parsing mapping`);
        }
      }
      var func = compose(...tot);
      mp.set(cur[0], func);
    }
    return mp;
  }

  function createRule(sym, ax, exp, mp) {
    var symbols = parseSymbols(sym);
    var expansion = parseExpansion(exp);
    var mapping = parseMapping(mp);
    var rs = new Rules(
      symbols, [], ax, expansion, mapping
    );
    console.log(rs);
    return rs;
  }

  return (
    <div style={{fontSize:'10px'}}>
      <div className='Setter1'>
        <Setter labelName={'Length: '} minValue={"1"} defValue={shapeLength} setValue={setShapeLength}/>
      </div>
      <div className='Setter2'>
        <Setter labelName={'Size(n): '} minValue={"0"} defValue={shapeSize} setValue={setShapeSize}/>
      </div>
      <RadioButtons defaultValue={preset} setValue={setPreset}/>
      <div className='Symbols1'>
        <Symbols numRows={1} labelName={'Symbols (X, F, G, [, ], A)'} setValue={setSymbols}/>
      </div>
      <div className='Symbols2'>
        <Symbols numRows={1} labelName={'Axiom (XF)'} setValue={setAxiom}/>
      </div>
      <div className='Symbols3'>
        <Symbols numRows={1} labelName={'Expansion Rules (X, XX | F, [XF])'} setValue={setExpansion}/>
      </div>
      <div className='Symbols4'>
        <b>Function Mapping</b><br/>
        T45, T-120 = turn (45, -120 in degrees)<br/>
        L = move forward<br/>
        P = push current state<br/>
        R = pop current state, restore previous state<br/>
        N = do nothing<br/>
        Functions are automatically composed from left to right<br></br><br></br>
      <Symbols numRows={2} labelName={'Incomplete Example (X, T.45 | F, P.T.-45 | G, L)'} setValue={setMapping}/>
      <br></br>
      <Submit labelName={'submit custom rule'} createRule={() => createRule(symbols, axiom, expansion, mapping)}/>
      </div>
      <Canvas presetChoice={preset} shapeLength={shapeLength} shapeSize={shapeSize}/>
  </div>
  );
}

export default App;
