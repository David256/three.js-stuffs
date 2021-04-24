import * as THREE from 'three';
import { FirstPersonControls } from './controls/first-person-controls';
import { ControlsHandler } from './controls/controls-handler';

/** @type { THREE.Clock } */
let clock;
/** @type { THREE.Scene } */
let worldScene;
/** @type { THREE.AmbientLight } */
let ambientLight;
/** @type { THREE.HemisphereLight } */
let hemisphereLight;
/** @type { THREE.DirectionalLight } */
let directionalLight;
/** @type { THREE.PerspectiveCamera } */
let camera;
/** @type { THREE.Mesh } */
let ground;
/** @type { FirstPersonControls } */
let controls;
/** @type { THREE.WebGLRenderer } */
let renderer;

const controlsHandler = new ControlsHandler();
controlsHandler.enable = false;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 2;

  clock = new THREE.Clock();
  
  worldScene = new THREE.Scene();
  worldScene.background = new THREE.Color(0x606060);
  worldScene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  ambientLight.position.z = 10;
  worldScene.add(ambientLight);

  hemisphereLight = new THREE.HemisphereLight(0xff0000, 0xf0f000, 0.6);
  // hemisphereLight.position.y = 3;
  hemisphereLight.color.setHSL( 0.6, 1, 0.6 );
  hemisphereLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemisphereLight.position.set( 0, 50, 0 );
  worldScene.add(hemisphereLight);

  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 10);
  worldScene.add( hemisphereLightHelper );

  directionalLight = new THREE.DirectionalLight( 0xff0000, 1 );
  directionalLight.color.setHSL( 0.1, 1, 0.95 );
  directionalLight.position.set( - 1, 1.75, 1 );
  directionalLight.position.multiplyScalar( 10 );

  directionalLight.castShadow = true;
  
  worldScene.add( directionalLight );

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
  worldScene.add( directionalLightHelper );

  // Add objects
  const objects = createObjects();
  objects.forEach(object => worldScene.add(object));

  // Add ground
  ground = createGround();
  worldScene.add(ground);

  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  // Add controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.2;

}

/**
 * Create a ground.
 * @returns { THREE.Mesh }
 */
function createGround() {

  // 0xa0adaf
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xa000af, shininess: 158 }),
  );

  ground.rotation.x = - Math.PI / 2;
  ground.receiveShadow = true;

  return ground;

}

/**
 * Create objects to add to scene.
 * @returns { [THREE.Mesh] }
 */
function createObjects() {

  const geometry = new THREE.BoxGeometry(1,2,2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.y = 1.5;

  return [cube];

}

function animate() {

  requestAnimationFrame(animate);
  render();

}

/**
 * Update render according of controls delta.
 */
function render() {

  if (controlsHandler.enable) {
    controls.update(clock.getDelta());
  }

  renderer.render(worldScene, camera);

}

window.addEventListener('resize', () => {
  
  if (!camera || !renderer) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});