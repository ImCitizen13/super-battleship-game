import { type Location } from './BattleshipGridLogic'
export enum BattleshipSize {
    small = 1,
    medium = 2,
    large = 3,
}

export enum ShipOrientation {
    horizontal = 1,
    vertical = 2
}


export type Battleship = {
    size: BattleshipSize,
    attack?: number,
    defence?: number,
    health?: number,
    locationOnGrid?: Location[]
}

export type BattleShipLocation = {
    locations: Location[]
}


