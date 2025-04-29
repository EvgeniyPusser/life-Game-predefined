
import React, { useEffect, useState } from "react";
import "./../../index.css";

interface MatrixProps {
  matrix: number[][];
}

const Matrix: React.FC<MatrixProps> = ({ matrix }) => {
  const [cellSize, setCellSize] = useState(20);

  useEffect(() => {
    const updateCellSize = () => {
      const screenWidth = window.innerWidth * 0.7; // 90% of screen width
      const screenHeight = window.innerHeight * 0.7; // 90% of screen height

      const cols = matrix[0].length;
      const rows = matrix.length;

      const maxWidthPerCell = screenWidth / cols;
      const maxHeightPerCell = screenHeight / rows;

      const size = Math.floor(Math.min(maxWidthPerCell, maxHeightPerCell));
      setCellSize(size);
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [matrix]);

  return (
    
    <div
      className="matrix-container"
      style={{
        gridTemplateColumns: `repeat(${matrix[0].length}, ${cellSize}px)`,
      }}
    >
      {matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell === 1 ? "alive" : ""}`}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Matrix;




