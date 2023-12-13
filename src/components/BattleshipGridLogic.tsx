import {
  type Battleship,
  type BattleShipLocation,
  ShipOrientation,
} from "./BattleShip";

export enum CellState {
  Water = "-",
  Ship = "X",
  Hit = "O",
}

export interface BattleshipGridProps {
  grid: CellState[];
  rows: number;
  cols: number;
}

export type Location = {
  row: number;
  col: number;
};

type BattleshipGrid = CellState[];

/**
 *
 * @param rows
 * @param cols
 * @returns
 */
export function createEmptyGrid(rows: number, cols: number): BattleshipGrid {
  // Init 1-D grid with water
  // I made it as a 1-D grid to skip typescript
  // checking all the time if the cell is not undefined
  return Array<CellState>(rows * cols).fill(CellState.Water);
}

function getLocationForShip(
  battleship: Battleship,
  startLocation: Location,
  orientation: ShipOrientation,
): BattleShipLocation {
  const battleShipLocation = Array<Location>();
  battleShipLocation.push(startLocation);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  for (let i = 1; i < battleship.size; i++) {
    if (orientation == ShipOrientation.horizontal) {
      battleShipLocation.push({
        row: startLocation.row,
        col: startLocation.col + i,
      });
    } else {
      battleShipLocation.push({
        row: startLocation.row + i,
        col: startLocation.col,
      });
    }
  }
  return { locations: battleShipLocation };
}

function canPlaceOnBlock(grid: BattleshipGrid, location: Location): boolean {
  //Grid block exists
  if (!grid[location.row * 10 + location.col]) return false;
  //Block Has Ship
  if (grid[location.row * 10 + location.col] == CellState.Ship) return false;
  //Block is hit
  if (grid[location.row * 10 + location.col] == CellState.Hit) return false;
  //Grid block is available
  // grid[location.row * 10 + location.col] = CellState.Ship;
  return true;
  //
}

function canPlaceShip(
  grid: BattleshipGrid,
  battleshipLocation: BattleShipLocation,
): boolean {
  const result = battleshipLocation.locations.filter(
    (location) => !canPlaceOnBlock(grid, location),
  );
  console.log(result.length == 0);
  return true ? result.length == 0 : false;
}

/**
 *
 * @param grid
 * @param row
 * @param col
 * @returns
 */
export function placeShip(
  grid: BattleshipGrid,
  battleship: Battleship,
  location: Location,
  orientation: ShipOrientation,
): boolean {
  //Calculate all the locations that a ship should be placed
  const shipLocation = getLocationForShip(battleship, location, orientation);
  // Check if the location was valid
  if (!canPlaceShip(grid, shipLocation)) {
    console.log("Can't place Ship ");
    return false;
  }
  console.log("Ship is Successfully Placed ");
  battleship.locationOnGrid = shipLocation.locations;
  shipLocation.locations.forEach((loc) => {
    grid[loc.row * 10 + loc.col] = CellState.Ship;
  });
  return true;
}

/**
 *
 * @param grid
 * @param row
 * @param col
 * @returns
 */
export function registerHit(grid: BattleshipGrid, location: Location): boolean {
  //Grid block exists
  if (!grid[location.row * 10 + location.col]) return false;
  //Has ship
  if (grid[location.row * 10 + location.col] === CellState.Ship) {
    grid[location.row * 10 + location.col] = CellState.Hit;
    console.log("Hit!");
    return true;
  } else {
    console.log("Miss!");
    return false;
  }
}
