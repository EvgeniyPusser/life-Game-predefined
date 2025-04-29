// import React, { useState, useEffect, useRef } from "react";
// import Matrix from "./components/life-matrix/Matrix";
// import lifeMatrixConfig from "./config/life-matrix.config";
// import LifeMatrix from "./service/LifeMatrix";

// const { rows, columns, interval } = lifeMatrixConfig;

// // 👇 You define your initial matrix here
// const predefinedMatrix: number[][] = [
//   // [1, 1, 0, 0, 0],
//   // [1, 1, 0, 0, 0],
//   // [0, 0, 0, 0, 0],
//   // [0, 0, 0, 0, 0],
//   // [0, 0, 0, 0, 0],

//   //   [0, 1, 0, 0, 0],
//   // [0, 0, 1, 1, 1],
//   // [1, 1, 1, 0, 0],
//   // [0, 0, 0, 0, 0],
//   // [0, 0, 0, 0, 0]

//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 0],
//   [1, 1, 0, 0, 0]
// ];



// const App: React.FC = () => {
//   const usePredefined = true;

//   // ✅ Validate shape
//   const isValidPredefined =
/

import React, { useState, useEffect, useRef } from "react";
import Matrix from "./components/life-matrix/Matrix";
import lifeMatrixConfig from "./config/life-matrix.config";
import LifeMatrix from "./service/LifeMatrix";

const { rows, columns, interval } = lifeMatrixConfig;

const predefinedMatrix: number[][] = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0],
];

const App: React.FC = () => {
  const [usePredefined, setUsePredefined] = useState(true);

  const isValidPredefined =
    usePredefined &&
    Array.isArray(predefinedMatrix) &&
    predefinedMatrix.length === rows &&
    predefinedMatrix.every(row => row.length === columns);

  const lifeRef = useRef(
    new LifeMatrix(rows, columns, isValidPredefined ? predefinedMatrix : undefined)
  );

  const [currentMatrix, setCurrentMatrix] = useState<number[][]>(
    lifeRef.current.matrix
  );

  // 👇 Recreate the matrix when toggling
  const regenerateMatrix = (usePre: boolean) => {
    const life = new LifeMatrix(
      rows,
      columns,
      usePre ? predefinedMatrix : undefined
    );
    lifeRef.current = life;
    setCurrentMatrix(life.matrix);
    setUsePredefined(usePre);
  };

  // 👇 Auto-evolve periodically
  useEffect(() => {
    const id = setInterval(() => {
      const next = lifeRef.current.evolve();
      setCurrentMatrix(next);
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>Life Matrix Simulation</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => regenerateMatrix(true)}>Predefined</button>
        <button onClick={() => regenerateMatrix(false)}>Random</button>
      </div>
      <Matrix matrix={currentMatrix} />
    </div>
  );
};

export default App;



