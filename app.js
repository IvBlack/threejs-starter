
import * as THREE from "./three.module.js"

//отрисовка рендера, размещение на ней нескольких объектов: сцены, камеры
export default class {
    constructor() {
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.createObject();
        this.createLight();

        // this.renderer.render(this.scene, this.camera);
        this.update();
    }

    createRenderer() {
        //объект рендерера (канвас внутри)
        this.renderer = new THREE.WebGLRenderer();

        //размещение канваса как дом-элемента на страничке
        document.body.appendChild(this.renderer.domElement);

        //размер рендереру по высоте и ширине тела страницы
        this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);
    }

    //угол обзора - 45 град., начало и конец обзора - в метрах условно.
    //за этими границами объекты просто обрезаются
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            document.body.offsetWidth/document.body.offsetHeight,
            1,
            100
        );
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    //Mesh означает объект, у кот.есть форма и материал.
    createObject() {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(2,2,2,),
            new THREE.MeshStandardMaterial({color: "yellow"})
        );

        //добавим объект на сцену и сдвинем вперед (-)
        this.scene.add(this.object);
        this.object.position.z = -5;
    }

    createLight() {
        this.light1 = new THREE.DirectionalLight();
        this.scene.add(this.light1);
        this.light1.position.set(5,5,5);
    }

    //отрисовка рендера через встроенную функцию, примерно 60 раз в секунду
    //внутри нее вызывается колбек update(), тем самым процесс закольцовывается 
    update() {
        this.renderer.render(this.scene, this.camera);
        var that = this;
        requestAnimationFrame(() => {that.update();});

        //вращение по оси на 0,1 радиану каждую секунду
        this.object.rotation.y += .1
    }
}