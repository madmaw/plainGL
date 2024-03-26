import {
  type CompositeSolid,
  type Plane,
  type Scene,
  type Solid,
} from 'app/editor/model';
import { map } from 'base/graph/map';
import {
  computed,
  observable,
} from 'mobx';
import { PipeStyle } from 'ui/components/icon/internal/tree_guide';
import {
  OpenState,
  type TreeItem,
} from 'ui/components/tree/tree';
import {
  type BaseSceneNode,
  SceneNode,
} from './graph';
import {
  type SceneNavigationItem,
  SceneNavigationItemType,
} from './types';

export type ExpandableTypes =
  | Scene
  | Solid
  | Plane;

export class SceneNavigationTreePresenter {
  toggleOpen(model: SceneNavigationTreeModel, item: SceneNavigationItem) {
    const collapsed = model.isCollapsed(item);
    switch (item.type) {
      case SceneNavigationItemType.CompositeSolidAdditions:
        if (collapsed) {
          model.collapsedCompositeSolidAdditions.delete(item.value);
        } else {
          model.collapsedCompositeSolidAdditions.add(item.value);
        }
        break;
      case SceneNavigationItemType.CompositeSolidRemovals:
        if (collapsed) {
          model.collapsedCompositeSolidRemovals.delete(item.value);
        } else {
          model.collapsedCompositeSolidRemovals.add(item.value);
        }
        break;
      default:
        if (collapsed) {
          model.collapsedItems.delete(item.value);
        } else {
          model.collapsedItems.add(item.value);
        }
        break;
    }
  }
}

export class SceneNavigationTreeModel {
  readonly collapsedItems = observable.set<ExpandableTypes>();
  readonly collapsedCompositeSolidAdditions = observable.set<CompositeSolid>();
  readonly collapsedCompositeSolidRemovals = observable.set<CompositeSolid>();

  isCollapsed(item: SceneNavigationItem) {
    switch (item.type) {
      case SceneNavigationItemType.CompositeSolidAdditions:
        return this.collapsedCompositeSolidAdditions.has(item.value);
      case SceneNavigationItemType.CompositeSolidRemovals:
        return this.collapsedCompositeSolidRemovals.has(item.value);
      default:
        return this.collapsedItems.has(item.value);
    }
  }

  @computed.struct
  get items(): readonly TreeItem<SceneNavigationItem>[] {
    return map<SceneNavigationItem, TreeItem<SceneNavigationItem>>(
      new SceneNode(this.scene, this.isCollapsed.bind(this)),
      (node, path, indices) => {
        const { value } = node;
        // TODO can we avoid this cast somehow?
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const sceneNode = node as BaseSceneNode;
        const open = sceneNode.expandedConnections.length === 0
          ? OpenState.Childless
          : this.isCollapsed(value)
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
