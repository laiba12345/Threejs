import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const cubeGeometry=new THREE.BoxGeometry(1,1,1)
const cubeMaterial= new THREE.MeshBasicMaterial({color:"red"})
const cubeMesh=new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)

const axes = new THREE.AxesHelper(2);
      

scene.add(cubeMesh)
scene.add(axes);
const camera=new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight,
    0.1,
    30
)
camera.position.z=5

const canvas=document.querySelector("canvas.threejs")

const renderer= new THREE.WebGLRenderer({
     canvas:canvas
}
)


const controls=new OrbitControls(camera,canvas)


renderer.setSize(window.innerWidth, window.innerHeight)
const renderloop=()=>
{
    
    renderer.render(scene,camera)
    window.requestAnimationFrame(renderloop)

    //Copy camera's rotation to cubeMesh's rotation so if the camera rotates, cube copies the rotation and would face the camera as in initial position
    cubeMesh.quaternion.copy(camera.quaternion);


    //We scale the cube proportionally to its distance from camera 
    // This makes the cube looks the same size regardless of its distance from camera
    const distance = camera.position.distanceTo(cubeMesh.position);
    const theta=THREE.MathUtils.degToRad(camera.fov/2)
    const scale=2*Math.tan(theta)*distance
    cubeMesh.scale.set( scale*0.5,scale*0.5,scale*0.5)

}

window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

renderloop()