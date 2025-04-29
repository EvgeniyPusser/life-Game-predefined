import React, { useState, useEffect, useRef } from "react";
import Matrix from "./components/life-matrix/Matrix";
import lifeMatrixConfig from "./config/life-matrix.config";
import LifeMatrix from "./service/LifeMatrix";

const { rows, columns, interval } = lifeMatrixConfig;

// 👇 You define your initial matrix here
const predefinedMatrix: number[][] = [
  // [1, 1, 0, 0, 0],
  // [1, 1, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],

  //   [0, 1, 0, 0, 0],
  // [0, 0, 1, 1, 1],
  // [1, 1, 1, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0]

  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0]
];



const App: React.FC = () => {
  const usePredefined = true;

  // ✅ Validate shape
  const isValidPredefined =
    usePredefined &&
    Array.isArray(predefinedMatrix) &&
    predefinedMatrix.length === rows &&
    predefinedMatrix.every(row => row.length === columns);

  // ✅ Use predefined only if valid
  const lifeRef = useRef(
    new LifeMatrix(rows, columns, isValidPredefined ? predefinedMatrix : undefined)
  );

  const [currentMatrix, setCurrentMatrix] = useState<number[][]>(
    lifeRef.current.matrix
  );
  // 👇 Evolve and update the matrix periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMatrix = lifeRef.current.evolve();
      setCurrentMatrix(newMatrix);
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Life Matrix Simulation</h1>
      <Matrix matrix={currentMatrix} />
    </div>
  );
};

export default App;


