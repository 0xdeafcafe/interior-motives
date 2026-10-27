export const STORAGE_KEY = 'interior-motives-v1';
export const rooms = {
  entry: [
    {id:'entry',name:'Entrance hall',x:.435,z:0,w:.85,d:1.07,area:'0.9 m²',photo:13,height:2.68},
    {id:'entryStairs',name:'Private staircase',x:-.505,z:.76,w:1.01,d:2.59,area:'Stairwell',photo:13,height:2.68,stairs:true},
  ],
  living: [
    {id:'living',name:'Living & dining',x:.53,z:-1.925,w:3.66,d:7.92,area:'32.1 m²',photo:3,height:2.52,polygon:[[-1.30,-5.885],[2.36,-5.885],[2.36,2.035],[-2.36,2.035],[-2.36,-.905],[-1.30,-.905]]},
    {id:'kitchen',name:'Kitchen',x:-1.295,z:4.085,w:2.13,d:4.10,area:'8.3 m²',photo:9,height:2.52},
    {id:'balcony',name:'Balcony',x:1.19,z:2.705,w:2.34,d:1.06,area:'2.5 m²',photo:11,outdoor:true},
    {id:'stairs',name:'Stairs & cupboards',x:-1.88,z:-3.295,w:.96,d:5.18,area:'Fixed structure',photo:13,stairs:true},
  ],
  upper: [
    {id:'study',name:'Bedroom / study',x:-1.42,z:2.12,w:1.88,d:3.76,area:'7.1 m²',photo:20,height:2.21},
    {id:'bedroom',name:'Main bedroom',x:.99,z:1.37,w:2.74,d:5.26,area:'14.4 m²',photo:14,height:2.38},
    {id:'bathroom',name:'Bathroom',x:.99,z:-2.37,w:2.74,d:2.02,area:'5.5 m²',photo:17,height:2.21},
    {id:'landing',name:'Landing',x:-.93,z:-.95,w:.9,d:2.38,area:'2.2 m²',photo:13,height:2.21},
    {id:'wc',name:'WC',x:-.86,z:-2.845,w:.76,d:1.21,area:'0.9 m²',photo:13,height:2.21},
    {id:'upperStairs',name:'Stairwell & utility',x:-1.85,z:-1.5,w:1.02,d:3.48,area:'Fixed structure',photo:13,stairs:true},
    {id:'terrace',name:'Roof terrace',x:0,z:6.285,w:5.13,d:4.17,area:'≈ 14 m²',photo:22,outdoor:true,polygon:[[-2.565,4.2],[2.565,4.2],[2.565,5.29],[.125,5.29],[.125,8.37],[-2.565,8.37]]},
  ],
};
export const catalog = {
  sofa: { name: 'Sofa', w: 2.3, d: .95, h: .78, color: '#9ba8ad', icon: '▰' },
  armchair: { name: 'Armchair', w: .8, d: .85, h: .78, color: '#b98d6d', icon: '▣' },
  table: { name: 'Dining table', w: 1.8, d: .85, h: .75, color: '#b18b60', icon: '▤' },
  chair: { name: 'Chair', w: .48, d: .5, h: .8, color: '#b76447', icon: '▢' },
  coffee: { name: 'Coffee table', w: 1, d: .6, h: .38, color: '#b18b60', icon: '▬' },
  rug: { name: 'Rug', w: 2.5, d: 1.7, h: .02, color: '#d3cbb8', icon: '▱' },
  bed: { name: 'Double bed', w: 1.8, d: 2.1, h: .55, color: '#e7e2d7', icon: '▥' },
  desk: { name: 'Desk', w: 1.2, d: .65, h: .75, color: '#bc9c75', icon: '▤' },
  wardrobe: { name: 'Wardrobe', w: 1.6, d: .6, h: 2.1, color: '#e6ded1', icon: '▥' },
  plant: { name: 'Plant', w: .5, d: .5, h: 1.1, color: '#55785a', icon: '♧' },
  lamp: { name: 'Floor lamp', w: .4, d: .4, h: 1.6, color: '#d3b26e', icon: '♙' },
  bench: { name: 'Bench', w: 1.7, d: .4, h: .45, color: '#9fac7d', icon: '▬' },
};
let seq = 0;
export function item(type, floor, x, z, rotation = 0, overrides = {}) {
  return { ...catalog[type], type, floor, x, z, rotation, id: `item-${Date.now()}-${seq++}`, ...overrides };
}
export function initialState() {
  return {
    version: 1,
    wallSections: {},
    surfaces: Object.fromEntries(Object.values(rooms).flat().map(r => [r.id, { wall: '#f3f0e7', floor: r.outdoor ? '#8c7964' : r.id === 'bathroom' || r.id === 'wc' ? '#818b8d' : '#b69870' }])),
    items: [item('rug','living',.5,-3.5),item('sofa','living',.5,-5.1),item('coffee','living',.5,-3.5),item('armchair','living',-.82,-2.2,90),item('table','living',.4,.8),item('chair','living',-.2,-.1),item('chair','living',1,-.1),item('chair','living',-.2,1.65,180),item('chair','living',1,1.65,180),item('plant','living',1.95,-5.4),item('lamp','living',-1,-4.8),item('bed','upper',1,2.5),item('wardrobe','upper',1,-.88,0,{w:2.4}),item('desk','upper',-1.42,2.8,0,{w:1.4}),item('chair','upper',-1.42,2),item('table','upper',-1.2,6.4,90,{color:'#a6b886'}),item('bench','upper',-2.05,6.4,90),item('bench','upper',-.35,6.4,90),item('plant','upper',-2.15,7.95),item('plant','upper',2.1,4.7)],
  };
}
export function validState(value) {
  const color = v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v);
  return value?.version === 1 && (value.wallSections === undefined || (value.wallSections && typeof value.wallSections === 'object' && !Array.isArray(value.wallSections) && Object.keys(value.wallSections).length<=500 && Object.entries(value.wallSections).every(([k,v])=>k.length<150 && color(v)))) && Array.isArray(value.items) && value.items.length <= 300 && new Set(value.items.map(i=>i.id)).size === value.items.length && value.items.every(i => Object.hasOwn(catalog,i.type) && ['entry','living','upper'].includes(i.floor) && typeof i.id === 'string' && typeof i.name === 'string' && i.name.length < 100 && color(i.color) && ['x','z','rotation','w','d','h'].every(k => Number.isFinite(i[k])) && Math.abs(i.x)<30 && Math.abs(i.z)<30 && Math.abs(i.rotation)<10000 && ['w','d','h'].every(k=>i[k]>0 && i[k]<=5)) && Object.values(rooms).flat().every(r=>color(value.surfaces?.[r.id]?.wall)&&color(value.surfaces?.[r.id]?.floor));
}
export function footprint(i) {
  const a=i.rotation*Math.PI/180;
  return {w:Math.abs(Math.cos(a))*i.w+Math.abs(Math.sin(a))*i.d,d:Math.abs(Math.sin(a))*i.w+Math.abs(Math.cos(a))*i.d};
}
export function containsPoint(x,z,r) {
  if(!r.polygon)return x>=r.x-r.w/2-.005&&x<=r.x+r.w/2+.005&&z>=r.z-r.d/2-.005&&z<=r.z+r.d/2+.005;
  let inside=false;const p=r.polygon;
  for(let i=0,j=p.length-1;i<p.length;j=i++)if(((p[i][1]>z)!==(p[j][1]>z))&&(x<(p[j][0]-p[i][0])*(z-p[i][1])/(p[j][1]-p[i][1])+p[i][0]))inside=!inside;
  return inside;
}
export function fitsRoom(i,r) {
  if(r.stairs)return false;
  const f=footprint(i);
  return [-1,1].every(a=>[-1,1].every(b=>containsPoint(i.x+a*f.w/2,i.z+b*f.d/2,r)));
}
