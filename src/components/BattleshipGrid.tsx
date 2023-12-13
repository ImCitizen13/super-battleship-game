import {
  CellState,
  type Location,
  type BattleshipGridProps,
} from "./BattleshipGridLogic";

export default function BattleshipGrid({
  grid,
  rows,
  cols,
}: BattleshipGridProps) {
  return (
    <div className="battleship-grid">
      <div className="grid-header">
        {[...Array<number>(rows)].map((_, i) => (
          <div key={i * rows} className="header-cell">
            {(i + 1).toString().padStart(2)}
          </div>
        ))}
      </div>

      {[...Array<number>(rows)].map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          <div className="row-label">
            {String.fromCharCode("A".charCodeAt(0) + rowIndex)}
          </div>
          {[...Array<number>(cols)].map((cell, colIndex) => (
            <GridCell
              key={rowIndex * 10 + colIndex}
              cell={grid[rowIndex * 10 + colIndex] ?? CellState.Hit}
              location={{ row: rowIndex, col: colIndex }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export interface GridCellProps {
  cell: CellState;
  location: Location;
}

export function GridCell({ cell, location }: GridCellProps) {
  return (
    <button
      className={`cell ${cell.toLowerCase()}`}
      onClick={() => {
        console.log("Cell: ", location);
      }}
    >
      {cell}
    </button>
  );
}
