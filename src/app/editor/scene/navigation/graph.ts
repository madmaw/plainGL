import {
  type ConcaveSolid,
  type ConvexSolid,
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
    return this.solid.parts.map(part => new ConcaveSolidNode(part, this.collapsedNodes));
  }
}

class ConcaveSolidNode extends BaseSceneNode {
  constructor(private readonly concaveSolid: ConcaveSolid, collapsedNodes: ReadonlySet<ExpandableTypes>) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.ConcaveSolid,
      value: this.concaveSolid,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return [
      new ConvexSolidNode(this.concaveSolid.base, false, this.collapsedNodes),
      ...this.concaveSolid.subtractions.map(subtraction => new ConvexSolidNode(subtraction, true, this.collapsedNodes)),
    ];
  }
}

class ConvexSolidNode extends BaseSceneNode {
  constructor(
    private readonly convexSolid: ConvexSolid,
    private readonly subtraction: boolean,
    collapsedNodes: ReadonlySet<ExpandableTypes>,
  ) {
    super(collapsedNodes);
  }

  protected override calculateValue(): SceneNavigationItem {
    return {
      type: SceneNavigationItemType.ConvexSolid,
      value: this.convexSolid,
      subtraction: this.subtraction,
    };
  }

  protected override calculateExpandedConnections(): readonly Node<SceneNavigationItem>[] {
    return this.convexSolid.planes.map(plane => new PlaneNode(plane, this.collapsedNodes));
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
