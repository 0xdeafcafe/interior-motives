import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,validState,rooms,fitsRoom,containsPoint,item,footprint} from '../src/model.js';
test('initial layout round-trips through JSON validation',()=>assert.ok(validState(JSON.parse(JSON.stringify(initialState())))));
test('imports reject invalid dimensions, duplicated IDs, colours and missing rooms',()=>{
 for(const corrupt of [s=>s.items[0].w=-1,s=>s.items[0].x=Infinity,s=>s.items[0].color='red;bad',s=>s.items.push(s.items[0]),s=>delete s.surfaces.kitchen]){const s=initialState();corrupt(s);assert.equal(validState(s),false);}
});
test('terrace preserves the L-shaped cutout',()=>{const r=rooms.upper.find(r=>r.id==='terrace');assert.ok(containsPoint(-1,7,r));assert.ok(containsPoint(2,4.7,r));assert.equal(containsPoint(2,7,r),false);});
test('living footprint excludes stairs and includes wider dining end',()=>{const r=rooms.living[0];assert.equal(containsPoint(-2,-4,r),false);assert.ok(containsPoint(-2,1,r));});
test('rotation checks the complete furniture footprint',()=>{const r={x:0,z:0,w:2.5,d:1};const t=item('table','living',0,0);assert.ok(fitsRoom(t,r));assert.equal(fitsRoom({...t,rotation:90},r),false);assert.ok(Math.abs(footprint({...t,rotation:90}).w-.85)<.001);});
