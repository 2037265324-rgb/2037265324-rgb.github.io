import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

const projects=JSON.parse(readFileSync(new URL('../app/exhibition-projects.json',import.meta.url),'utf8'));
test('all 23 projects have complete, unique gallery assets',()=>{
  assert.equal(projects.length,23);
  assert.equal(new Set(projects.map(project=>project.id)).size,23);
  assert.equal(projects.reduce((total,project)=>total+project.images.length,0),162);
  for(const project of projects){
    assert.equal(project.images[0],project.cover);
    assert.equal(new Set(project.images).size,project.images.length);
    for(const src of project.images){
      assert.ok(existsSync(new URL('../public'+src,import.meta.url)),src);
      const mobile=new URL('../public/mobile'+src,import.meta.url);
      assert.ok(existsSync(mobile),'mobile '+src);
      assert.ok(statSync(mobile).size<150000,'mobile asset size '+src);
    }
    assert.ok(existsSync(new URL('../public'+project.cover.replace('.webp','-thumb.webp'),import.meta.url)));
  }
});
test('image framing preserves artwork and 3D viewer uses real geometry',()=>{
  const circular=readFileSync(new URL('../app/components/CircularCarousel.css',import.meta.url),'utf8');
  assert.match(circular,/object-fit: contain/);
  const flex=readFileSync(new URL('../app/components/FlexCarousel.jsx',import.meta.url),'utf8');
  assert.ok(!flex.includes('scale /= 1.08'));
  const viewer=readFileSync(new URL('../app/components/CharacterViewer.jsx',import.meta.url),'utf8');
  assert.match(viewer,/OrbitControls/);assert.match(viewer,/TubeGeometry/);
  assert.match(viewer,/geometry\?\.dispose/);assert.match(viewer,/IntersectionObserver/);
});
