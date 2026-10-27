import {chromium} from '@playwright/test';
import {PerspectiveCamera,Vector3} from 'three';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.TEST_URL||'http://127.0.0.1:5173');await page.locator('canvas').waitFor();
await page.locator('#walls').selectOption('full');await page.locator('[data-view="top"]').click();
const rect=await page.locator('canvas').boundingBox();const cam=new PerspectiveCamera(36,rect.width/rect.height,.1,150);cam.position.set(0,28,.001);cam.lookAt(0,0,0);cam.updateMatrixWorld();
async function clickWall(z){const p=new Vector3(2.36,2.52,z).project(cam);await page.mouse.click(rect.x+(p.x+1)*rect.width/2,rect.y+(1-p.y)*rect.height/2);await page.getByText('One wall, a new mood.').waitFor();}
await clickWall(0);await page.locator('#wall-color').fill('#334455');await page.locator('#wall-color').dispatchEvent('change');
const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('interior-motives-v1')));
assert.deepEqual(Object.values((await state()).wallSections),['#334455']);
await clickWall(-2);await page.locator('[data-palette="3"]').click();assert.equal(Object.keys((await state()).wallSections).length,2);assert.ok(Object.values((await state()).wallSections).includes('#dec5bd'));
await page.locator('#undo').click();assert.equal(Object.keys((await state()).wallSections).length,1);
await page.locator('#time-of-day').fill('19.5');await page.locator('#time-of-day').dispatchEvent('input');assert.equal(await page.locator('#time-label').innerText(),'19:30');await page.locator('#walls').selectOption('auto');
await page.reload();await page.locator('canvas').waitFor();assert.deepEqual(Object.values((await state()).wallSections),['#334455']);assert.deepEqual(errors,[]);await browser.close();console.log('PASS: independent wall picking and paint, section palettes, undo, persistence, time-of-day control');
