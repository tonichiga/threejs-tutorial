import { usePlane } from "@react-three/cannon";
import { Shadow } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Plane = () => {
  const img1 = useLoader(TextureLoader, "3.jpeg");

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [1, -2, -1],
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial map={img1} />
    </mesh>
  );
};

export default Plane;
