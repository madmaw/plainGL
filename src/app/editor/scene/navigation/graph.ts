import {
  type CompositeSolid,
  type Plane,
  type Scene,
  type Scenery,
  type Solid,
} from 'app/editor/model';
import { type Node } from 'base/graph/types';
import { computed } from 'mobx';
import {
  type SceneNavigationItem,
  SceneNavigationItemType,
} from './types';

type CheckIsCollapsed = (item: SceneNavigationItem) => boolean;

export abstract class BaseSceneNode implements Node<SceneNavigationItem> {
  constructor(protected readonly checkIsCollapsed: CheckIsCollapsed) {
  }

  protected abstract calculateValue(): SceneNavigationItem;

  protected abstract calculateExpandedConnections(): readonly Node<SceneNavigationItem>[];

  @computed
  get value(): SceneNavigationItem {
    return this.calculateValue();
  }

  // cache via mobx
  @computed
  get expandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.calculateExpandedConnections();
  }

  @computed
  get connections(): readonly Node<SceneNavigationItem>[] {
    return this.checkIsCollapsed(this.value)
      ? []
      : this.expandedConnections;
  }
}

export class SceneNode extends BaseSceneNode {
  constructor(private readonly scene: Scene, checkIsCollapsed: CheckIsCollapsed) {
    super(checkIsCollapsed);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.Scene,
      value: this.scene,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.scene.scenery.map(scenery => new SolidNode(scenery.solid, this.checkIsCollapsed, scenery));
  }
}

class SolidNode extends BaseSceneNode {
  constructor(
    private readonly solid: Solid,
    checkIsCollapsed: CheckIsCollapsed,
    private readonly scenery?: Scenery,
  ) {
    super(checkIsCollapsed);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.Solid,
      value: this.solid,
      scenery: this.scenery,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    if (this.solid.planes == null) {
      return [
        new CompositeSolidAdditionsNode(this.solid, this.checkIsCollapsed),
        new CompositeSolidRemovalsNode(this.solid, this.checkIsCollapsed),
      ];
    }

    return this.solid.planes.map(plane => new PlaneNode(plane, this.checkIsCollapsed));
  }
}

class CompositeSolidAdditionsNode extends BaseSceneNode {
  constructor(private readonly concaveSolid: CompositeSolid, checkIsCollapsed: CheckIsCollapsed) {
    super(checkIsCollapsed);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.CompositeSolidAdditions,
      value: this.concaveSolid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.concaveSolid.additions.map(addition => new SolidNode(addition, this.checkIsCollapsed));
  }
}

class CompositeSolidRemovalsNode extends BaseSceneNode {
  constructor(private readonly concaveSolid: CompositeSolid, checkIsCollapsed: CheckIsCollapsed) {
    super(checkIsCollapsed);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.CompositeSolidRemovals,
      value: this.concaveSolid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.concaveSolid.removals.map(removal => new SolidNode(removal, this.checkIsCollapsed));
  }
}

class PlaneNode extends BaseSceneNode {
  constructor(private readonly plane: Plane, checkIsCollapsed: CheckIsCollapsed) {
    super(checkIsCollapsed);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.Plane,
      value: this.plane,
    };
  }
  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return [];
  }
}
