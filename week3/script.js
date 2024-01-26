import * as THREE from "three"

/***********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/***********
** MESHES **
************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

//scene.add(testSphere)

// testCube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(testCube)

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    //testSphere.position.z = Math.sin(elapsedTime * 2) / 0.5

    // Animate testCube 1
    // Rotate cube
    testCube.rotation.x = elapsedTime
    testCube.rotation.y = elapsedTime
    testCube.rotation.z = elapsedTime

    // Scale cube
    testCube.scale.x = Math.sin(elapsedTime * 0.5) * 2
    testCube.scale.y = Math.sin(elapsedTime * 0.5) * 2
    testCube.scale.z = Math.sin(elapsedTime * 0.5) * 2

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()