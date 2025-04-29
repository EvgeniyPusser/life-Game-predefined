class LifeMatrix {
  rows: number;
  columns: number;
  matrix: number[][];



  constructor(rows: number, columns: number, initialMatrix?: number[][]) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = initialMatrix ?? this.createRandomMatrix();
  }

  // Create a matrix with random 0s and 1s
  createRandomMatrix(): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(Math.random() > 0.5 ? 1 : 0); // Random 1s and 0s
      }
      matrix.push(row);
    }
    return matrix;
  }

 
  countLiveNeighbors(row: number, col: number): number {
  return [-1, 0, 1].flatMap(i =>
    [-1, 0, 1].map(j => [i, j])
  )
  .filter(([i, j]) => !(i === 0 && j === 0)) // exclude the cell itself
  .map(([i, j]) => [row + i, col + j])
  .filter(([r, c]) => 
    r >= 0 && r < this.rows && c >= 0 && c < this.columns
  )
  .reduce((sum, [r, c]) => sum + this.matrix[r][c], 0);
}


  
  evolve(): number[][] {
    const newMatrix = this.matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = this.countLiveNeighbors(rowIndex, colIndex);
        const isAlive = cell === 1;
        return isAlive
          ? (neighbors === 2 || neighbors === 3 ? 1 : 0)
          : (neighbors === 3 ? 1 : 0);
      })
    );

    this.matrix = newMatrix;
    return newMatrix;
  }
}


export default LifeMatrix;

