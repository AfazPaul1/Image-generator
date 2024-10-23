import React, { useRef } from 'react';
import './Model.css';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// Model Component
function Model() {
  const { scene } = useGLTF('C:/Users/afazp/Downloads/yoga/tkinter-ai-image-generator-main/Image generator/src/assets/dude.glb'); // Import your 3D model
  const modelRef = useRef();

  // Function to trigger animation (optional)
  const handleAnimate = () => {
    if (modelRef.current) {
      // Example: Rotate the model around the Y axis
      modelRef.current.rotation.y += Math.PI / 4;
    }
  };

  return (
    <div className="model-container">
      <Canvas>
        <primitive ref={modelRef} object={scene} scale={0.5} /> {/* Adjust scale if needed */}
      </Canvas>
      <button className="model-animate-btn" onClick={handleAnimate}>
        Animate Model
      </button>
    </div>
  );
}

export default Model;
