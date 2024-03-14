import {
  type ConcaveSolid,
  type ConvexSolid,
  type Plane,
  type Scene,
  type Solid,
} from 'app/editor/model';
import {
  computed,
  observable,
} from 'mobx';
import { type TreeItem } from 'ui/components/tree/tree';
import {
  type SceneNavigationItem,
  SceneNavigationItemType,
} from './types';

export class SceneNavigationTreePresenter {
  toggleOpen(model: SceneNavigationTreeModel, { value }: SceneNavigationItem) {
    if (model.collapsedItems.has(value)) {
      model.collapsedItems.delete(value);
    } else {
      model.collapsedItems.add(value);
    }
  }
}

type SceneNavigationItemWithIndices = SceneNavigationItem & {
  readonly indices: readonly number[],
  readonly lengths: readonly number[],
};

export class SceneNavigationTreeModel {
  @observable.shallow
  readonly collapsedItems = new Set<Scene | Solid | ConvexSolid | ConcaveSolid | Plane>();

  @computed.struct
  get items(): readonly TreeItem<SceneNavigationItem>[] {
    return this.walkScenes([this.scene], []).map(
      (item): TreeItem<SceneNavigationItem> => {
        return {
          key: item.indices.join(),
          value: item,
          open: !this.collapsedItems.has(item.value),
          depth: item.indices.length,
          lastChild: false,
        };
      },
    );
  }

  private walkScenes(
    scenes: readonly Scene[],
    parentIndices: readonly number[],
  ): readonly SceneNavigationItemWithIndices[] {
    return scenes.flatMap((scene, index) => {
      const open = !this.collapsedItems.has(scene);
      const indices = [
        ...parentIndices,
        index,
      ];
      return [
        {
          type: SceneNavigationItemType.Scene,
          value: scene,
        },
        ...this.walkSolids(scene.solids, indices),
      ];
    });
  }

  private walkSolids(solids: readonly Solid[], parentIndices: number[]): readonly TreeItem<SceneNavigationItem>[] {
    return solids.flatMap((solid, index) => {
      const indices = [
        ...parentIndices,
        index,
      ];
      return [
        {
          type: SceneNavigationItemType.Solid,
          value: solid,
          indices,
        },
        ...this.walkConcaveSolids(solid.parts, indices),
      ];
    });
  }

  private walkConcaveSolids(solids: readonly ConcaveSolid[], parentIndices: number[]): readonly SceneNavigationRow[] {
    return solids.flatMap((solid, index) => {
      const indices = [
        ...parentIndices,
        index,
      ];
      return [
        {
          type: SceneNavigationItemType.ConcaveSolid,
          value: solid,
          indices,
        },
        ...this.walkConvexSolids([solid.base], indices, false, 0),
        ...this.walkConvexSolids(solid.subtractions, indices, true, 1),
      ];
    });
  }

  private walkConvexSolids(
    solids: readonly ConvexSolid[],
    parentIndices: readonly number[],
    subtraction: boolean,
    indexOffset: number,
  ): readonly SceneNavigationItem[] {
    return solids.flatMap((solid, index) => {
      const indices = [
        ...parentIndices,
        index + indexOffset,
      ];
      return [
        {
          type: SceneNavigationItemType.ConvexSolid,
          value: solid,
          subtraction,
          indices,
        },
        ...this.walkPlanes(solid.planes, indices),
      ];
    });
  }

  private walkPlanes(planes: readonly Plane[], parentIndices: readonly number[]): readonly SceneNavigationItem[] {
    return planes.map((plane, index) => {
      const indices = [
        ...parentIndices,
        index,
      ];
      return {
        type: SceneNavigationItemType.Plane,
        value: plane,
        indices,
      };
    });
  }

  constructor(private readonly scene: Scene) {
  }
}
