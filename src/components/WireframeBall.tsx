import { onMount, onCleanup } from "solid-js";
import * as THREE from "three";

export default function WireframeBall() {
  let wireframeCanvas!: HTMLCanvasElement;

  onMount(() => {
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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: wireframeCanvas });
    renderer.setSize(200, 200);

    const geometry = new THREE.IcosahedronGeometry(1.37, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const ball = new THREE.Mesh(geometry, material);
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

        state.velocity.x = state.velocity.x * damping + baseVelocity.x * (1 - damping);
        state.velocity.y = state.velocity.y * damping + baseVelocity.y * (1 - damping);
      }

      renderer.render(scene, camera);
    };

    animate();

    onCleanup(() => {
      wireframeCanvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.remove(ball);
    });
  });

  return (
    <canvas
      ref={wireframeCanvas}
      class="w-50 h-50 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
    />
  );
}
