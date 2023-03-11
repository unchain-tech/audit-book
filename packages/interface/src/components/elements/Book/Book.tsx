/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */
import clsx from "clsx";
import { Canvas, useFrame } from "@react-three/fiber";
import { BaseProps } from "src/types/BaseProps";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";

export type BookProps = BaseProps;

/**
 * 本
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const Book = ({ className }: BookProps) => {
  return (
    <div className={clsx(className)}>
      <Canvas
        className={clsx(
          "w-[100%]",
          "h-[100%]",
          // "bg-primary-50",
          "rounded-full"
        )}
        camera={{
          position: [100, 100 * 0.8, 100],
          fov: 25,
          near: 1,
          far: 200,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, -20]} />
        <Scene />
      </Canvas>
    </div>
  );
};

function Scene() {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  const gltf = useLoader(GLTFLoader, "/assets/faun_book.glb");
  useFrame((state, delta) => {
    if (meshRef.current === undefined) return;
    meshRef.current!.rotation.y += delta;
  });
  return (
    <mesh ref={meshRef} position={[0, -20, 0]}>
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
    </mesh>
  );
}
