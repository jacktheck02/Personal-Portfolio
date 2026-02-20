import { Component } from "solid-js";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  Plane,
  Vector3,
  Group,
  PlaneHelper,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  AlwaysStencilFunc,
  FrontSide,
  BackSide,
  DoubleSide,
  IncrementWrapStencilOp,
  DecrementWrapStencilOp,
  NotEqualStencilFunc,
  ReplaceStencilOp,
  PlaneGeometry,
  Clock,
  AmbientLight,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const About: Component = () => {
  const t = (1 + Math.sqrt(5)) / 2;

  const vertices = [
    -1,
    t,
    0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    0,
    0,
    -1,
    t,
    0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    t,
    0,
    -1,
    t,
    0,
    1,
    -t,
    0,
    -1,
    -t,
    0,
    1,
  ];

  const clipPlanes = () => {
    const c = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const normal = new Vector3(
        vertices[i],
        vertices[i + 1],
        vertices[i + 2],
      ).normalize();
      c.push(new Plane(normal, 0.325));
    }
    return c;
  };

  let camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
    object: Group;
  let planes: Plane[], planeObjects: Mesh[], planeHelpers: PlaneHelper[];
  let clock: Clock;

  const params = {
    animate: false,
    planeX: {
      constant: 0,
      negated: false,
      displayHelper: false,
    },
    planeY: {
      constant: 0,
      negated: false,
      displayHelper: false,
    },
    planeZ: {
      constant: 0,
      negated: false,
      displayHelper: false,
    },
  };

  init();

  function createPlaneStencilGroup(
    geometry: IcosahedronGeometry,
    plane: Plane,
    renderOrder: number,
  ) {
    const group = new Group();
    const baseMat = new MeshBasicMaterial();
    baseMat.depthWrite = false;
    baseMat.depthTest = false;
    baseMat.colorWrite = false;
    baseMat.stencilWrite = true;
    baseMat.stencilFunc = AlwaysStencilFunc;

    const mat0 = baseMat.clone();
    mat0.side = BackSide;
    mat0.clippingPlanes = [plane];
    mat0.stencilFail = IncrementWrapStencilOp;
    mat0.stencilZFail = IncrementWrapStencilOp;
    mat0.stencilZPass = IncrementWrapStencilOp;

    const mesh0 = new Mesh(geometry, mat0);
    mesh0.renderOrder = renderOrder;
    group.add(mesh0);

    const mat1 = baseMat.clone();
    mat1.side = FrontSide;
    mat1.clippingPlanes = [plane];
    mat1.stencilFail = DecrementWrapStencilOp;
    mat1.stencilZFail = DecrementWrapStencilOp;
    mat1.stencilZPass = DecrementWrapStencilOp;

    const mesh1 = new Mesh(geometry, mat1);
    mesh1.renderOrder = renderOrder;

    group.add(mesh1);

    return group;
  }

  function init() {
    clock = new Clock();

    scene = new Scene();

    camera = new PerspectiveCamera(
      36,
      window.innerWidth / window.innerHeight,
      1,
      100,
    );
    camera.position.set(2, 2, 2);

    scene.add(new AmbientLight(0xffffff, 4.5));

    planes = clipPlanes();

    planeHelpers = planes.map((p) => new PlaneHelper(p, 1, 0xffffff));
    planeHelpers.forEach((ph) => {
      ph.visible = false;
      scene.add(ph);
    });

    const geometry = new IcosahedronGeometry(0.4, 0);
    object = new Group();
    scene.add(object);

    planeObjects = [];
    const planeGeom = new PlaneGeometry(4, 4);

    for (let i = 0; i < planes.length; i++) {
      const poGroup = new Group();
      const plane = planes[i];
      const stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1);

      const planeMat = new MeshStandardMaterial({
        color: 0xe91e63,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: planes.filter((p) => p !== plane),

        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: NotEqualStencilFunc,
        stencilFail: ReplaceStencilOp,
        stencilZFail: ReplaceStencilOp,
        stencilZPass: ReplaceStencilOp,
      });
      const po = new Mesh(planeGeom, planeMat);
      po.onAfterRender = function (renderer) {
        renderer.clearStencil();
      };

      po.renderOrder = i + 1.1;

      object.add(stencilGroup);
      poGroup.add(po);
      planeObjects.push(po);
      scene.add(poGroup);
    }

    const material = new MeshStandardMaterial({
      color: 0xffc107,
      metalness: 0.1,
      roughness: 0.75,
      clippingPlanes: planes,
      clipShadows: true,
      shadowSide: DoubleSide,
    });

    // add the color
    const clippedColorFront = new Mesh(geometry, material);
    clippedColorFront.renderOrder = 6;
    object.add(clippedColorFront);

    // Renderer
    renderer = new WebGLRenderer({ antialias: true, stencil: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.setAnimationLoop(animate);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 2;
    controls.update();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    const delta = clock.getDelta();
    if (params.animate) {
      object.rotation.x += delta * 0.5;
      object.rotation.y += delta * 0.2;
    }
    for (let i = 0; i < planeObjects.length; i++) {
      const plane = planes[i];
      const po = planeObjects[i];
      plane.coplanarPoint(po.position);
      po.lookAt(
        po.position.x - plane.normal.x,
        po.position.y - plane.normal.y,
        po.position.z - plane.normal.z,
      );
    }
    renderer.render(scene, camera);
  }

  return (
    <section
      class="pt-32 pb-8"
      id="about"
      style={"background: var(--second-bg-color);"}
    >
      <div class="about-area flex flex-col md:flex-row items-center justify-center gap-8">
        <div class="ml-20 mr-60">
          <h4 class="pb-2 font-bold text-2xl">Hello, I'm</h4>
          <h1 class="pb-2 font-bold text-5xl">Jack Heckenlaible</h1>
          <h6 class="text-xl">
            claude code cuck, sam altman dick rider, and typescript developer
          </h6>
        </div>
        {/*TODO: Add Three.js component here*/}
      </div>
    </section>
  );
};

export default About;
