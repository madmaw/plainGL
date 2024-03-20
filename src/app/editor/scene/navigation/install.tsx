import { type Scene } from 'app/editor/model';
import { type Tree } from 'app/ui/components/tree/types';
import { type TypographicHierarchy } from 'app/ui/components/typography/types';
import { type Metrics } from 'app/ui/metrics';
import { createPartialComponent } from 'base/react/partial';
import { UnreachableError } from 'base/unreachable_error';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import {
  useCallback,
  useMemo,
} from 'react';
import { SceneNavigationTreeListItem as SceneNavigationTreeListItemImpl } from './list_item';
import {
  SceneNavigationTreeModel,
  SceneNavigationTreePresenter,
} from './presenter';
import {
  type SceneNavigationItem,
  SceneNavigationItemType,
} from './types';

export function install({
  SceneNavigationTree,
  typographicHierarchy: { BodyText },
  metrics,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  typographicHierarchy: TypographicHierarchy,
  metrics: Metrics,
}) {
  const SceneNavigationTreeListItemWithText = createPartialComponent(
    SceneNavigationTreeListItemImpl,
    {
      Text: BodyText,
      gap: metrics.gridBaseline,
    },
  );

  const SceneNavigationTreeListItem = function (item: SceneNavigationItem) {
    switch (item.type) {
      case SceneNavigationItemType.Plane:
        return <SceneNavigationTreeListItemWithText name='Plane' />;
      case SceneNavigationItemType.Solid:
        return <SceneNavigationTreeListItemWithText name={item.value.name} />;
      case SceneNavigationItemType.Scene:
        return <SceneNavigationTreeListItemWithText name={item.value.name} />;
      case SceneNavigationItemType.CompositeSolidAdditions:
        return <SceneNavigationTreeListItemWithText name='Additions' />;
      case SceneNavigationItemType.CompositeSolidRemovals:
        return <SceneNavigationTreeListItemWithText name='Removals' />;
      default:
        throw new UnreachableError(item);
    }
  };

  const presenter = new SceneNavigationTreePresenter();
  return observer(
    function ({ scene }: { scene: Scene }) {
      const model = useMemo(function () {
        return new SceneNavigationTreeModel(scene);
      }, [scene]);
      const onToggleOpen = useCallback(function (item: SceneNavigationItem) {
        runInAction(function () {
          presenter.toggleOpen(model, item);
        });
      }, [model]);
      return (
        <SceneNavigationTree
          TreeListItemContent={SceneNavigationTreeListItem}
          items={model.items}
          onToggleOpen={onToggleOpen}
        />
      );
    },
  );
}
