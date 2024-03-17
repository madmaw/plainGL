import {
  type ConcaveSolid,
  type ConvexSolid,
  type Plane,
  type Scene,
  type Solid,
} from 'app/editor/model';
import { map } from 'base/graph/map';
import {
  computed,
  observable,
} from 'mobx';
import { PipeStyle } from 'ui/components/icon/tree_guide';
import {
  OpenState,
  type TreeItem,
} from 'ui/components/tree/tree';
import {
  type BaseSceneNode,
  SceneNode,
} from './graph';
import { type SceneNavigationItem } from './types';

export type ExpandableTypes =
  | Scene
  | Solid
  | ConvexSolid
  | ConcaveSolid
  | Plane;

export class SceneNavigationTreePresenter {
  toggleOpen(model: SceneNavigationTreeModel, { value }: SceneNavigationItem) {
    if (model.collapsedItems.has(value)) {
      model.collapsedItems.delete(value);
    } else {
      model.collapsedItems.add(value);
    }
  }
}

export class SceneNavigationTreeModel {
  readonly collapsedItems = observable.set<ExpandableTypes>();

  @computed.struct
  get items(): readonly TreeItem<SceneNavigationItem>[] {
    return map<SceneNavigationItem, TreeItem<SceneNavigationItem>>(
      new SceneNode(this.scene, this.collapsedItems),
      (node, path, indices) => {
        const { value } = node;
        // TODO can we avoid this cast somehow?
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const sceneNode = node as BaseSceneNode;
        const open = sceneNode.expandedConnections.length === 0
          ? OpenState.Childless
          : this.collapsedItems.has(value.value)
          ? OpenState.Closed
          : OpenState.Open;
        const parent = path.length > 0
          ? path[path.length - 1]
          : undefined;
        const pipes = indices.map((index, i) => {
          const pathNode = path[i];
          const lastChild = parent == null
            ? true
            : pathNode.connections.length === index + 1;
          return lastChild
            ? i === indices.length - 1
              ? PipeStyle.Bent
              : PipeStyle.None
            : i === indices.length - 1
            ? PipeStyle.Split
            : PipeStyle.Vertical;
        });
        return {
          key: indices.join(),
          value,
          open,
          pipes,
        };
      },
    );
  }

  constructor(private readonly scene: Scene) {
  }
}
