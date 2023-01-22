import { useBox } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Box = (props) => {
  const [img1, img2, img3] = useLoader(TextureLoader, [
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
  ]);

  const [ref] = useBox(() => ({
    position: [0, 5, 0],
    mass: 1,
    ...props,
  }));

  return (
    <mesh ref={ref}>
      {/* <sphereBufferGeometry attach="geometry" /> */}
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={img1} />
      <OrbitControls />
    </mesh>
  );
};

export default Box;
