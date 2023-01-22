import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
// import img from "../../assets/1.jpeg";
// import img1 from "../../assets/2.jpeg";
// import img2 from "../../assets/3.jpeg";
// import { useSpring } from "@react-spring/web";
// import { a } from "@react-spring/three";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const ballMaterial = {
  clearcoat: 1,
  metalness: 1,
  roughness: 1,
  color: new THREE.Color(0.3, 0, 0),
  // normalScale: new THREE.Vector2(0.15, 0.15),
  // envMap: none,
};

const Figures = ({ url, mat }) => {
  const [obj, setObj] = useState();
  useMemo(() => new OBJLoader().load(url, setObj), [url]);

  if (obj) {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = mat;
      }
    });
    return <primitive object={obj} />;
  }
  return null;
};

const Scene = ({ x, y, z }) => {
  const mesh = useRef();
  const vec = new THREE.Vector3(x, y, z);

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.01;
  });
  useFrame(() => mesh.current.position.lerp(vec, 0.1));

  let mat = new THREE.MeshPhysicalMaterial(ballMaterial);

  return (
    <mesh position={[0, -30, -100]} ref={mesh}>
      {Figures({ url: "Porsche.obj", mat })}
    </mesh>
  );
};

export default function ObjLoader() {
  const groupRef = useRef();
  const [position, setPosition] = useState({ x: 1, y: 0, z: 0 });

  return (
    <div className="App">
      <div className="controls">
        <label>x</label>
        <input
          onChange={(e) => setPosition({ ...position, x: e.target.value })}
          value={position.x}
          type="number"
        />
        <label>y</label>
        <input
          onChange={(e) => setPosition({ ...position, y: e.target.value })}
          value={position.y}
          type="number"
        />
        <label>z</label>
        <input
          onChange={(e) => setPosition({ ...position, z: e.target.value })}
          value={position.z}
          type="number"
        />
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <group
            dispose={null}
            position={[-12, -20, -180]}
            rotation={[0.3, 0, 0]}
            ref={groupRef}
          >
            <Scene x={position.x} y={position.y} z={position.z} />
            <ambientLight intensity={1} />
            <spotLight
              intensity={1}
              distance={1}
              position={[0, 0, 0]}
              angle={1.2}
              color={"#fff"}
            />

            <OrbitControls />
            {/* <Shadow
              renderOrder={-1000}
              position={[0, -1, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1.5}
            /> */}

            <Environment preset="city" background />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
