import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

function init() {



}









// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const particleGeometry = new THREE.BufferGeometry;
const particleCount = 10;
const posArray = new Float32Array(particleCount * 3);

console.log(posArray);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = Math.random() - 0.5
}

//
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.005
})

const sphere = new THREE.Points(particleGeometry, material)
const particlesMesh = new THREE.Points(particleGeometry, material)
scene.add(sphere, particlesMesh)

// Light1
const pointLight = new THREE.PointLight(0xffffff, 0.6)
pointLight.position.set(-.65, .45, .95)
scene.add(pointLight)

// Control Centre
const light1 = gui.addFolder('Light 1')

light1.add(pointLight.position, 'x').min(-3).max(3).step(0.05)
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.05)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.05)
light1.add(pointLight, 'intensity').min(-3).max(3).step(0.05)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, .7)
// scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 * First attribute: field of view
 * Second attribute: aspect ratio
 * Last two attribute: near and far clipping plane
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height) // third argument can lower resolution
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()