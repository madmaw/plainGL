import {
  type CompositeSolid,
  type Plane,
  type Scene,
  type Scenery,
  type Solid,
} from 'app/editor/model';

export const enum SceneNavigationItemType {
  Scene = 1,
  Solid,
  CompositeSolidAdditions,
  CompositeSolidRemovals,
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
    readonly scenery?: Scenery,
  }
  | {
    readonly type: SceneNavigationItemType.CompositeSolidAdditions,
    readonly value: CompositeSolid,
  }
  | {
    readonly type: SceneNavigationItemType.CompositeSolidRemovals,
    readonly value: CompositeSolid,
  }
  | {
    readonly type: SceneNavigationItemType.Plane,
    readonly value: Plane,
  };
