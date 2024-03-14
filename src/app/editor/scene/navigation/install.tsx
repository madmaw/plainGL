import { type Scene } from 'app/editor/model';
import { type Tree } from 'app/ui/components/tree/types';
import { observer } from 'mobx-react';
import {
  useCallback,
  useMemo,
} from 'react';
import {
  SceneNavigationTreeModel,
  SceneNavigationTreePresenter,
} from './presenter';
import { type SceneNavigationItem } from './types';

export function install({
  Tree,
}: {
  Tree: Tree<SceneNavigationItem>,
}) {
  const SceneNavigationTreeListItem = function (value: SceneNavigationItem) {
    return (
      <div>
        {JSON.stringify(value.type)}
      </div>
    );
  };

  const SceneNavigationTree = Tree<SceneNavigationItem>;
  const presenter = new SceneNavigationTreePresenter();
  return observer(
    function ({ scene }: { scene: Scene }) {
      const model = useMemo(function () {
        return new SceneNavigationTreeModel(scene);
      }, [scene]);
      const onToggleOpen = useCallback(function (item: SceneNavigationItem) {
        presenter.toggleOpen(model, item);
      }, [model]);
      return (
        <SceneNavigationTree
          TreeListItem={SceneNavigationTreeListItem}
          items={model.items}
          getKey={SceneNavigationTreePresenter.getKey}
          onToggleOpen={onToggleOpen}
        />
      );
    },
  );
}
