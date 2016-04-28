var bone_text;

function onBoneFileLoaded(){
	bone_text = this.responseText;
}


function init(){
	console.log("Initializing WebGl/three.js stuff...");

	var width = window.innerWidth;
	var height = window.innerHeight;

	// Set up renderer
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	 
	var scene = new THREE.Scene;

	// Create a cube
	var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff33cc });
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	 
	cube.rotation.y = Math.PI * 45 / 180;
	 
	scene.add(cube);

	// Create camera
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
	camera.position.y = 160;
	camera.position.z = 400;
	camera.lookAt(cube.position);

	scene.add(camera);

	// Add a light
	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	 
	scene.add(pointLight);

	// Add skybox
	var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff99cc, side: THREE.BackSide});
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

	scene.add(skybox);

	// Render the cube with animation
	var clock = new THREE.Clock; 
	render();

	console.log("Loading bone file...");
	var xml_request = new XMLHttpRequest();
	var bone_address = "resources/ogre-files/ogre-skeleton.bf";
	rawbones
	xml_request.addEventListener("load", onBoneFileLoaded);
	xml_request.open("GET", bone_address, false);
	xml_request.send();
	console.log("Bone file loaded.");

	var rawbones = parseBoneFile(bone_text);
	console.log("Returned bones length: " + rawbones.length);
	var skeleton = createSkeletonFromRawBones(rawbones);

	console.log("Created skeleton?");


	

	function render(){
		renderer.render(scene, camera);

		cube.rotation.y -= clock.getDelta();

		requestAnimationFrame(render);
	}
}


init();