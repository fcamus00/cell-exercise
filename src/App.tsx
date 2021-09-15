import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const defaultGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,2,0,0,0,1,0,1,2,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  const [grid, setGrid] = React.useState(defaultGrid);
  const [animate, setAnimate] = React.useState(false);
  const colors: { [key: number]: string } = {
    0: '#a3a3a3',
    1: '#5daaff',
    2: '#2cb48a'
  };

  React.useEffect(() => {
    async function getData() {
      const seed = await axios.get('coding-project.imtlab.io/seed');
      if (seed.data) {
        setGrid(seed.data.data.state);
      }
    }
    getData();
  }, []);

  const getMatrixValue = (matrix: number[][], y: number, x: number) => {
    let value;
    try {
      value = matrix[y][x] !== undefined ? matrix[y][x] : null;
    } catch (error) {
      value = null;
    }
    return value;
  };

  const findNeighbors = (matrix: number[][], y: number, x: number) => {
    const neighbors = [];
    const detail = {
      dead: 0,
      sad: 0,
      happy: 0,
    };
    neighbors.push(getMatrixValue(matrix, y-1, x-1));
    neighbors.push(getMatrixValue(matrix, y-1, x));
    neighbors.push(getMatrixValue(matrix, y-1, x+1));
    neighbors.push(getMatrixValue(matrix, y, x+1));
    neighbors.push(getMatrixValue(matrix, y+1, x+1));
    neighbors.push(getMatrixValue(matrix, y+1, x));
    neighbors.push(getMatrixValue(matrix, y+1, x-1));
    neighbors.push(getMatrixValue(matrix, y, x-1));
    neighbors.forEach((item) => {
      if (item === 0) {
        detail.dead += 1;
      } else if (item === 1) {
        detail.sad += 1;
      } else if (item === 2) {
        detail.happy += 1;
      }
    });
    return detail;
  };

  const newMatrix = (matrix: number[][]) => {
    const newMatrix = JSON.parse(JSON.stringify(matrix));
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const neighbors = findNeighbors(matrix, y, x);
        const happySad = neighbors.happy + neighbors.sad;
        if (matrix[y][x] === 0) {
          if (neighbors.sad >= 3 && neighbors.sad > neighbors.happy) {
            newMatrix[y][x] = 1;
          } else if (neighbors.happy >= 3 && neighbors.happy > neighbors.sad) {
            newMatrix[y][x] = 2;
          }
        } else {
          if (happySad !== 2 && happySad !== 3) {
            newMatrix[y][x] = 0;
          }
        }
      }
    }
    return newMatrix;
  };

  React.useEffect(() => {
    while (animate) {
      const interval = setInterval(() => {
        setGrid(newMatrix(grid));
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const handleAnimation = () => {
    setAnimate(!animate);
  };

  return (
    <div className="App">
      {grid ? grid.map((row: number[]) => (
        <div className="row">
          {row.map((cell) => (
            <div className="cell" style={{backgroundColor: colors[cell]}}></div>
          ))}
        </div>
      )): null}
      <div>
        <button onClick={() => handleAnimation()}>{animate ? 'Pause' : 'Start'}</button>
      </div>
    </div>
  );
}

export default App;
