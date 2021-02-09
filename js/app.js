import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

import { modelInformation } from './date.js';

let camera, scene, renderer, controls;

init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 50, 200 );

    const sceneBackground = "#fafafa";
    scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneBackground);

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, } );
	renderer.setSize( window.innerWidth, window.innerHeight );
    document.querySelector('main').appendChild( renderer.domElement );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = 1.50; 
    controls.rotateSpeed = 0.55; 
    controls.maxDistance = 250;
    controls.minDistance = 38;
    controls.enableDamping = true
    controls.autoRotateSpeed = 2;

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    controls.update();
    scene.add( new THREE.AmbientLight( 0x222222 ) );
}

let light = () => {
    const lights = Object.getOwnPropertyNames(modelInformation["lights"]["DirectionalLight"])
    lights.forEach(lightsValue => {
        let individualLights = modelInformation["lights"]["DirectionalLight"][lightsValue]

        let addLight = new THREE.DirectionalLight( individualLights.color, individualLights.power );
        addLight.position.x = individualLights["position_x"]
        addLight.position.y = individualLights["position_y"]
        addLight.position.z = individualLights["position_z"]

        addLight.castShadow = true;
        addLight.shadow.camera.near = 5;
        addLight.shadow.camera.far = 5;

        scene.add(addLight)
    })

    // let AmbientLight = new THREE.AmbientLight (0x404040, 4);
    // scene.add( AmbientLight )
}
light();

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

const handleResize = () => {
    const { innerWidth, innerHeight } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}
addEventListener('resize', handleResize)

let theModelThatIsBeingLoaded = []

let loader = new GLTFLoader();
const loadingModels = () => {
    Object.getOwnPropertyNames(modelInformation["models"]).forEach(modelCategory => {
        Object.getOwnPropertyNames(modelInformation["models"][modelCategory]).forEach(categoryValues => {
            const modelValues = modelInformation["models"][modelCategory][categoryValues]
            theModelThatIsBeingLoaded.push(modelValues.folderName)
            loader.load(`./models/${modelValues.folderName}/scene.gltf`, function(gltf) {
                let models = gltf.scene.children[0]
                models.name = modelValues.folderName

                models.receiveShadow = true;
                models.castShadow = true;

                models.position.x = modelValues["position_x"];
                models.position.y = modelValues["position_y"];
                models.position.z = modelValues["position_z"];

                models.scale.x = modelValues["scale_x"];
                models.scale.y = modelValues["scale_y"];
                models.scale.z = modelValues["scale_z"];

                // models.rotation.x = modelValues["rotation_x"];
                models.rotation.y = modelValues["rotation_y"];
                models.rotation.z = modelValues["rotation_z"];

                models.visible = modelValues["visible"]
                scene.add(models);
            })
        })
    })
}
loadingModels();

const checkingTheLoadingOfModels = () => {
    let numberOfModelsLoaded = 0;
    theModelThatIsBeingLoaded.forEach(folderModelName => {
        if (scene.getObjectByName(folderModelName)) {
            numberOfModelsLoaded++
            if (numberOfModelsLoaded == theModelThatIsBeingLoaded.length) {
                clearInterval(repeating)
                document.querySelector('.loading-screen').className = "loading-screen-none"
                functionAfterLoadingModels();
            }
        }
    })
    if (numberOfModelsLoaded >= 1) {
        document.querySelector('.result-loading').textContent = `Załadowano ${numberOfModelsLoaded} z ${theModelThatIsBeingLoaded.length} modeli 3D `
    }
}

let repeating = setInterval(checkingTheLoadingOfModels, 100)
if (theModelThatIsBeingLoaded.length == 0) {
    clearInterval(repeating)
}

const elementCloning = () => {
    Object.getOwnPropertyNames(modelInformation["copiedItems"]).forEach(item => {
        const nameFolderToClone = modelInformation["copiedItems"][item].nameFolderOfTheItemToBeCoopied
        let randomCharacters = Math.random().toString(36).substring(1)
        modelInformation["copiedItems"][item].cloneNameId = nameFolderToClone + randomCharacters

        const cloneElementValue = modelInformation["copiedItems"][item]

        let cloneElement = scene.getObjectByName(nameFolderToClone).clone();

        cloneElement.position.x = cloneElementValue["position_x"];
        cloneElement.position.y = cloneElementValue["position_y"];
        cloneElement.position.z = cloneElementValue["position_z"];

        cloneElement.scale.x = cloneElementValue["scale_x"];
        cloneElement.scale.y = cloneElementValue["scale_y"];
        cloneElement.scale.z = cloneElementValue["scale_z"];
        cloneElement.visible = cloneElementValue["visible"]
        scene.add(cloneElement);
    })
}

const functionAfterLoadingModels = () => {
    elementCloning(); 
    generatingModelsInTheMenu();
    generatingABackgroundInTheMenu();
    toDisplayTheMenu(); 
    activationOfTheFirstMenu(); 
    displayingTheFirstModel(); 
} 

const generatingModelsInTheMenu = () => {
    const data = modelInformation["models"]["modelsToDisplay"]
    const names = Object.getOwnPropertyNames(modelInformation["models"]["modelsToDisplay"])
    const container = document.querySelector('.models-to-choose-from-container')
    names.forEach(value => {

        const modelToChooseFrom = document.createElement('div');
        modelToChooseFrom.className = "model-to-choose-from";
        container.appendChild(modelToChooseFrom);
    
        const modelToChoseFromImg = document.createElement('div');
        modelToChoseFromImg.className = "model-to-chose-from-img";
        modelToChooseFrom.appendChild(modelToChoseFromImg)
    
        const imgInModelToChoseFromImg = document.createElement('img');
        imgInModelToChoseFromImg.dataset.folderName = data[value].folderName
        imgInModelToChoseFromImg.className = "selecting-the-model"
        // imgInModelToChoseFromImg.src = `models/${data[value].folderName}/${data[value].imgName}.png`
        modelToChoseFromImg.appendChild(imgInModelToChoseFromImg)
    
        const h3inModelToChoseFromImg = document.createElement('h3');
        h3inModelToChoseFromImg.className = "model-to-choose-from-h3"
        h3inModelToChoseFromImg.textContent = data[value].nameTheItem;
        modelToChooseFrom.appendChild(h3inModelToChoseFromImg) 
    })

    container.classList.add("left-menu-category-inactive")
}

const displayingSelectedModels = (folderName) => {
    Object.getOwnPropertyNames(modelInformation["models"]["modelsToDisplay"]).forEach(item => {
        scene.getObjectByName(item).visible = false;
    })
    scene.getObjectByName(folderName).visible = true;
}

const displayingModelsFromTheMenu = (e) => {
    document.querySelectorAll('.selecting-the-model').forEach(item => {
        item.className = "selecting-the-model"
    })
    e.target.classList.add("selecting-the-model-active")
    displayingSelectedModels(e.target.dataset.folderName);
}

const toDisplayTheMenu = () => {
    document.querySelectorAll('.selecting-the-model').forEach(item => item.addEventListener('click', displayingModelsFromTheMenu))
}

const generatingABackgroundInTheMenu = () => {
    const dataModels = modelInformation["models"]["fixedModels"]
    const names = Object.getOwnPropertyNames(modelInformation["models"]["fixedModels"])
    const container = document.querySelector('.backgrounds-of-your-choice-from-container')
    names.forEach(value => {

        const backgroundsOfYourChoice = document.createElement('div');
        backgroundsOfYourChoice.className = "backgrounds-of-your-choice"
        container.appendChild(backgroundsOfYourChoice)
    
        const backgroundOfYourChoiceImg = document.createElement('div');
        backgroundOfYourChoiceImg.className = "backgrounds-of-your-choice-img";
        backgroundsOfYourChoice.appendChild(backgroundOfYourChoiceImg)
    
        const img = document.createElement('img');
        img.src = `models/${dataModels[value].folderName}/${dataModels[value].imgName}.png`;
        img.dataset.type = "models"
        img.className = "backgrounds"
        img.dataset.folderName = dataModels[value].folderName
        backgroundOfYourChoiceImg.appendChild(img)
    
        const h3InBackgroundOfYourChoice = document.createElement('h3');
        h3InBackgroundOfYourChoice.textContent = dataModels[value].nameTheItem
        backgroundsOfYourChoice.appendChild(h3InBackgroundOfYourChoice)

    })
    const dataNamesBackgrounds = Object.getOwnPropertyNames(modelInformation["backgrounds"])

    dataNamesBackgrounds.forEach(name => {
        container.classList.add("left-menu-category-inactive")

        const backgroundsOfYourChoice = document.createElement('div');
        backgroundsOfYourChoice.className = "backgrounds-of-your-choice"
        container.appendChild(backgroundsOfYourChoice)
    
        const backgroundOfYourChoiceImg = document.createElement('div');
        backgroundOfYourChoiceImg.className = "backgrounds-of-your-choice-img";
        backgroundsOfYourChoice.appendChild(backgroundOfYourChoiceImg)
    
        const color = document.createElement('div');
        color.className = "backgrounds"
        color.style.background = modelInformation["backgrounds"][name].color
        color.dataset.type = "colors"
        color.dataset.color = modelInformation["backgrounds"][name].color
        backgroundOfYourChoiceImg.appendChild(color)
    
        const h3InBackgroundOfYourChoice = document.createElement('h3');
        h3InBackgroundOfYourChoice.textContent = modelInformation["backgrounds"][name].nameColor
        backgroundsOfYourChoice.appendChild(h3InBackgroundOfYourChoice)
    })

    document.querySelectorAll('.backgrounds').forEach(item => item.addEventListener('click', backgroundSetting))
}

const selectingACategoryFromTheMenu = (e) => {
    document.querySelectorAll('.selecting-a-category-in-the-menu').forEach(item => {
        item.classList.add("left-menu-category-inactive")
    })

    document.querySelector(`.${e.target.dataset.category}`).classList.remove(`left-menu-category-inactive`)
}

document.querySelectorAll('.main-menu-left-btn').forEach(item => item.addEventListener('click', selectingACategoryFromTheMenu))

const backgroundSetting = (e) => {
    scene.background = new THREE.Color("white");
    Object.getOwnPropertyNames(modelInformation["models"]["fixedModels"]).forEach(item => {
        scene.getObjectByName(item).visible = false;
    })

    if (e.target.dataset.type == "colors") {
        scene.background = new THREE.Color(e.target.dataset.color);
    }

    if (e.target.dataset.type == "models") {
        scene.getObjectByName(e.target.dataset.folderName).visible = true;
    }
}

const selectingButtons = (e) => {
    document.querySelectorAll('.main-menu-left-btn').forEach(item => {
        item.classList.remove('menu-left-btn-active')
    })
    e.target.classList.add('menu-left-btn-active')
}
document.querySelectorAll('.main-menu-left-btn').forEach(item => item.addEventListener('click', selectingButtons))

const autoRotate = () => {
    if (controls.autoRotate == true) {
        controls.autoRotate = false;
        document.querySelector('.auto-rotation').classList.remove('function-style-active')
    }
    else {
        controls.autoRotate = true;
        document.querySelector('.auto-rotation').classList.add('function-style-active')
    }
}
document.querySelector('.auto-rotation').addEventListener('click', autoRotate)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement &&   
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) { 
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        document.querySelector('.full-screen').classList.add('function-style-active')
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        document.querySelector('.full-screen').classList.remove('function-style-active')
      }
    }
  }
  document.querySelector('.full-screen').addEventListener('click', toggleFullScreen)

const activationOfTheFirstMenu = () => {
    document.querySelectorAll('.main-menu-left-btn')[0].classList.add('menu-left-btn-active')
    document.querySelector(`.${document.querySelectorAll('.main-menu-left-btn')[0].dataset.category}`).classList.remove(`left-menu-category-inactive`)
}

const displayingTheFirstModel = () => {
    if (document.querySelectorAll('.selecting-the-model')[0]) {
        const firstModelInCategory = document.querySelectorAll('.selecting-the-model')[0].dataset.folderName 
        scene.getObjectByName(firstModelInCategory).visible = true;
        document.querySelectorAll('.selecting-the-model')[0].classList.add("selecting-the-model-active")
    }
}
