import { Rules, functionMap } from '../Canvas/Rules.js';
import { compose } from '../Canvas/Utils.js';

function parseSymbols(raw) {
    console.log(raw);
    var parsed = raw.split(/[, ]+/).filter(Boolean);
    return parsed;
  }

function parseExpansion(raw) {
    console.log(raw);
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
    console.log(sym, ax, exp, mp);
    var symbols = parseSymbols(sym);
    var expansion = parseExpansion(exp);
    var mapping = parseMapping(mp);
    var rs = new Rules(
        symbols, [], ax, expansion, mapping
    );
    console.log(rs);
    return rs;
}

export { parseSymbols, parseExpansion, parseMapping, createRule }