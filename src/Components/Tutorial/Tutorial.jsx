import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Box from "./Box";
import Plane from "./Plane";

const Tutorial = () => {
  return (
    <div className="tutorial">
      <Suspense fallback={null}>
        <Canvas>
          <Physics>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1, 2, 0]} mass={100} />
            <Box position={[2, 3, 0]} />
            <Box position={[1.3, 3, 0]} />
            <Plane />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Tutorial;
