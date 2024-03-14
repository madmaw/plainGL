import {
  type ConcaveSolid,
  type ConvexSolid,
  type Plane,
  type Scene,
  type Solid,
} from 'app/editor/model';

export const enum SceneNavigationItemType {
  Scene = 1,
  Solid,
  ConcaveSolid,
  ConvexSolid,
  Plane,
}

export type SceneNavigationItem =
  | {
    type: SceneNavigationItemType.Scene,
    value: Scene,
  }
  | {
    type: SceneNavigationItemType.Solid,
    value: Solid,
  }
  | {
    type: SceneNavigationItemType.ConcaveSolid,
    value: ConcaveSolid,
  }
  | {
    type: SceneNavigationItemType.ConvexSolid,
    value: ConvexSolid,
    subtraction: boolean,
  }
  | {
    type: SceneNavigationItemType.Plane,
    value: Plane,
  };
