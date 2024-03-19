import {
  type CompositeSolid,
  type Plane,
  type Scene,
  type Solid,
} from 'app/editor/model';
import { type Node } from 'base/graph/types';
import { computed } from 'mobx';
import { type ExpandableTypes } from './presenter';
import {
  type SceneNavigationItem,
  SceneNavigationItemType,
} from './types';

export abstract class BaseSceneNode implements Node<SceneNavigationItem> {
  constructor(protected readonly collapsedNodes: ReadonlySet<ExpandableTypes>) {
  }

  protected abstract calculateValue(): SceneNavigationItem;

  protected abstract calculateExpandedConnections(): readonly Node<SceneNavigationItem>[];

  @computed
  get value(): SceneNavigationItem {
    return this.calculateValue();
  }

  @computed
  get expandedConnections(): readonly Node<SceneNavigationItem>[] {
    // cache via mobx
    return this.calculateExpandedConnections();
  }

  @computed
  get connections(): readonly Node<SceneNavigationItem>[] {
    return this.collapsedNodes.has(this.value.value)
      ? []
      : this.expandedConnections;
  }
}

export class SceneNode extends BaseSceneNode {
  constructor(private readonly scene: Scene, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.Scene,
      value: this.scene,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.scene.solids.map(solid => new SolidNode(solid, this.collapsedNodes));
  }
}

class SolidNode extends BaseSceneNode {
  constructor(private readonly solid: Solid, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.Solid,
      value: this.solid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    if (this.solid.planes == null) {
      return [
        new CompositeSolidAdditionsNode(this.solid, this.collapsedNodes),
        new CompositeSolidRemovalsNode(this.solid, this.collapsedNodes),
      ];
    }

    return this.solid.planes.map(plane => new PlaneNode(plane, this.collapsedNodes));
  }
}

class CompositeSolidAdditionsNode extends BaseSceneNode {
  constructor(private readonly concaveSolid: CompositeSolid, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.CompositeSolidAdditions,
      value: this.concaveSolid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.concaveSolid.additions.map(addition => new SolidNode(addition, this.collapsedNodes));
  }
}

class CompositeSolidRemovalsNode extends BaseSceneNode {
  constructor(private readonly concaveSolid: CompositeSolid, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.CompositeSolidRemovals,
      value: this.concaveSolid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.concaveSolid.removals.map(removal => new SolidNode(removal, this.collapsedNodes));
  }
}

class PlaneNode extends BaseSceneNode {
  constructor(private readonly plane: Plane, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
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
