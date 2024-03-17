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
    readonly type: SceneNavigationItemType.Scene,
    readonly value: Scene,
  }
  | {
    readonly type: SceneNavigationItemType.Solid,
    readonly value: Solid,
  }
  | {
    readonly type: SceneNavigationItemType.ConcaveSolid,
    readonly value: ConcaveSolid,
  }
  | {
    readonly type: SceneNavigationItemType.ConvexSolid,
    readonly value: ConvexSolid,
    readonly subtraction: boolean,
  }
  | {
    readonly type: SceneNavigationItemType.Plane,
    readonly value: Plane,
  };
