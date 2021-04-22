import * as THREE from 'three';
import { FirstPersonControls } from './controls/first-person-controls';
import { ControlsHandler } from './controls/controls-handler';

/** @type { THREE.Clock } */
let clock;
/** @type { THREE.Scene } */
let worldScene;
/** @type { THREE.AmbientLight } */
let ambientLight;
/** @type { THREE.PerspectiveCamera } */
let camera;
/** @type { THREE.Mesh } */
let ground;
/** @type { FirstPersonControls } */
let controls;
/** @type { THREE.WebGLRenderer } */
let renderer;

const controlsHandler = new ControlsHandler();

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

  ambientLight = new THREE.AmbientLight(0x404040);
  // scene.add(ambientLight);

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
    new THREE.PlaneGeometry(9, 9, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xa000af, shininess: 158 }),
  );
  ground.rotation.x = - Math.PI / 2;
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
    renderer.render(worldScene, camera);
  }
}
