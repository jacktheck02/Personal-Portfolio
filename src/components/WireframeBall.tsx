import { onMount, onCleanup } from "solid-js";
import * as THREE from "three";

function clipPolygon(
  polygon: THREE.Vector3[],
  planeNormal: THREE.Vector3,
  planeConstant: number,
): THREE.Vector3[] {
  if (polygon.length === 0) return [];
  const output: THREE.Vector3[] = [];
  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length];
    const dCurr = current.dot(planeNormal) + planeConstant;
    const dNext = next.dot(planeNormal) + planeConstant;
    const currInside = dCurr >= 0;
    const nextInside = dNext >= 0;
    if (currInside) output.push(current);
    if (currInside !== nextInside) {
      const t = dCurr / (dCurr - dNext);
      output.push(new THREE.Vector3().lerpVectors(current, next, t));
    }
  }
  return output;
}

function buildClippedGeometry(
  source: THREE.BufferGeometry,
  planes: { normal: THREE.Vector3; constant: number }[],
): THREE.BufferGeometry {
  const pos = source.getAttribute("position");
  const idx = source.getIndex();
  const vertexCount = idx ? idx.count : pos.count;
  const triCount = Math.floor(vertexCount / 3);
  const verts: number[] = [];

  for (let t = 0; t < triCount; t++) {
    const [i0, i1, i2] = idx
      ? [idx.getX(t * 3), idx.getX(t * 3 + 1), idx.getX(t * 3 + 2)]
      : [t * 3, t * 3 + 1, t * 3 + 2];

    let poly = [
      new THREE.Vector3(pos.getX(i0), pos.getY(i0), pos.getZ(i0)),
      new THREE.Vector3(pos.getX(i1), pos.getY(i1), pos.getZ(i1)),
      new THREE.Vector3(pos.getX(i2), pos.getY(i2), pos.getZ(i2)),
    ];

    for (const p of planes) {
      poly = clipPolygon(poly, p.normal, p.constant);
      if (poly.length < 3) break;
    }
    if (poly.length < 3) continue;

    for (let i = 1; i < poly.length - 1; i++) {
      verts.push(
        poly[0].x,
        poly[0].y,
        poly[0].z,
        poly[i].x,
        poly[i].y,
        poly[i].z,
        poly[i + 1].x,
        poly[i + 1].y,
        poly[i + 1].z,
      );
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  return geo;
}

export default function WireframeBall() {
  let wireframeCanvas!: HTMLCanvasElement;

  onMount(() => {
    const t = (1 + Math.sqrt(5)) / 2;

    // prettier-ignore
    const vertices = [
     -1, t, 0,   1, t, 0,   -1, -t, 0,   1, -t, 0,   
      0, -1, t,   0, 1, t,   0, -1, -t,   0, 1, -t,
      t, 0, -1,   t, 0, 1,  -t, 0, -1,  -t, 0, 1,
    ];

    const basePlanes: { normal: THREE.Vector3; constant: number }[] = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const normal = new THREE.Vector3(
        vertices[i],
        vertices[i + 1],
        vertices[i + 2],
      ).normalize();
      basePlanes.push({ normal: normal.clone(), constant: 1.31 });
    }

    const state = {
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
      velocity: { x: 0.005, y: 0.005 },
    };
    const baseVelocity = { x: 0.005, y: 0.005 };
    const damping = 0.95;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: wireframeCanvas,
    });
    renderer.setSize(200, 200);

    const sourceGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const clippedGeo = buildClippedGeometry(sourceGeo, basePlanes);
    sourceGeo.dispose();

    const edgesGeo = new THREE.EdgesGeometry(clippedGeo, 1);
    clippedGeo.dispose();

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const ball = new THREE.LineSegments(edgesGeo, material);
    scene.add(ball);

    const handlePointerDown = (event: PointerEvent) => {
      state.isDragging = true;
      state.previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (state.isDragging) {
        const deltaMove = {
          x: event.clientX - state.previousMousePosition.x,
          y: event.clientY - state.previousMousePosition.y,
        };

        ball.rotation.y += deltaMove.x * 0.01;
        ball.rotation.x += deltaMove.y * 0.01;

        state.velocity = {
          x: deltaMove.y * 0.01,
          y: deltaMove.x * 0.01,
        };

        state.previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerUp = () => {
      state.isDragging = false;
    };

    wireframeCanvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!state.isDragging) {
        ball.rotation.x += state.velocity.x;
        ball.rotation.y += state.velocity.y;

        state.velocity.x =
          state.velocity.x * damping + baseVelocity.x * (1 - damping);
        state.velocity.y =
          state.velocity.y * damping + baseVelocity.y * (1 - damping);
      }

      renderer.render(scene, camera);
    };

    animate();

    onCleanup(() => {
      wireframeCanvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animationId);
      edgesGeo.dispose();
      material.dispose();
      renderer.dispose();
      scene.remove(ball);
    });
  });

  return (
    <canvas
      ref={wireframeCanvas}
      class="w-50 h-50 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      aria-hidden="true"
    />
  );
}
