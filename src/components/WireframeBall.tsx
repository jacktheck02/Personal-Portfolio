import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

export default function WireframeBall() {
  let containerRef!: HTMLDivElement;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;

  onMount(() => {
    // Setup scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    containerRef.appendChild(renderer.domElement);

    // Create Truncated Icosahedron (Soccer ball shape)
    const geometry = new THREE.IcosahedronGeometry(1.370, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff ,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    // Interaction state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocity = { x: 0.005, y: 0.005 }; // Constant base speed
    const baseVelocity = { x: 0.005, y: 0.005 };
    const damping = 0.95;

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      // Optional: change cursor or opacity
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };

        // Apply drag directly to rotation for immediate feedback
        ball.rotation.y += deltaMove.x * 0.01;
        ball.rotation.x += deltaMove.y * 0.01;

        // Store velocity based on delta
        velocity = {
          x: deltaMove.y * 0.01,
          y: deltaMove.x * 0.01
        };

        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    containerRef.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Apply velocity to rotation
        ball.rotation.x += velocity.x;
        ball.rotation.y += velocity.y;

        // Dampen velocity back to base speed
        velocity.x = velocity.x * damping + baseVelocity.x * (1 - damping);
        velocity.y = velocity.y * damping + baseVelocity.y * (1 - damping);
      }

      renderer.render(scene, camera);
    };

    animate();

    onCleanup(() => {
      containerRef.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    });
  });

  return (
    <div 
      ref={containerRef} 
      class="w-50 h-50 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      style={{
        filter: 'drop-shadow(0 0 10px rgba(136, 192, 208, 0.3))'
      }}
    />
  );
}
