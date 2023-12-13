import { type Battleship, ShipOrientation, BattleshipSize } from "~/components/BattleShip";
import BattleshipGrid from "~/components/BattleshipGrid";
import { createEmptyGrid, placeShip, registerHit } from "~/components/BattleshipGridLogic";

export default function BattleStation() {
  const rows = 10,
    cols = 10;
  const battleshipGrid = createEmptyGrid(rows, cols);
  const battleship1: Battleship = {size: BattleshipSize.large}
  const battleship2: Battleship = {size: BattleshipSize.small}
  
  placeShip(battleshipGrid, battleship1,{row: 0, col:2}, ShipOrientation.horizontal)
  const result = placeShip(battleshipGrid, battleship2,{row: 9, col:8}, ShipOrientation.horizontal)
  registerHit(battleshipGrid, {row: 9, col: 8})
  console.log("Could place ship: ", result)
  return (
    <div className="bg-gradient-to-r from-[#800016] to-[#00043A] flex min-h-[100vh] min-w-full flex-col items-center justify-center bg-blue-900">
      <h1>Battle station</h1>
      <BattleshipGrid grid={battleshipGrid} rows={rows} cols={cols} />
    </div>
  );
}
