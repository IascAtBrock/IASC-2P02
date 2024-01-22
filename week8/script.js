import * as THREE from "three"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

let xDistance = 1
let meshSize = 1

// Mobile
if(sizes.aspectRatio < 1){
    xDistance = 1
    meshSize = 1
}

// Resizing
window.addEventListener('resize', () =>
{
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight
    
    // Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

/***********
** MESHES **
************/
// Cube
const cubeGeometry = new THREE.BoxGeometry(meshSize, meshSize, meshSize)
const cubeMaterial = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.position.set(-xDistance, 0, -3)
scene.add(cube)

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1
}

// Part 1 click
document.querySelector('#click1').onclick = function(){
    document.querySelector('#first').classList.add('hidden')
    document.querySelector('#second').classList.remove('hidden')
    domObject.part = 2
}

// Part 2 click
document.querySelector('#click2').onclick = function(){
    document.querySelector('#second').classList.add('hidden')
    document.querySelector('#third').classList.remove('hidden')
    domObject.part = 3
}

// Part 3 click
document.querySelector('#click3').onclick = function() {
    document.querySelector('#third').classList.add('hidden')
    document.querySelector('#first').classList.remove('hidden')
    domObject.part = 1
}

/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

// Animate
const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // DOM INTERACTIONS
    // Part 2
    if(domObject.part === 2){
        //console.log('play part 2 animation')
        if(cube.rotation.y <= Math.PI * 0.5){
            cube.rotation.y += 0.02
        }
    }
    // Part 3
    if(domObject.part === 3){
        //console.log('play part 3 animation')
        if(cube.rotation.z <= Math.PI * 0.5){
            cube.rotation.z += 0.02
        }
    }

    // Reset
    if(domObject.part == 1){
        //console.log('play reset animation')
        if(cube.rotation.y >= 0 && cube.rotation.z >= 0){
            cube.rotation.y -= 0.02
            cube.rotation.z -= 0.02
        }
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()