import { type Project } from 'app/editor/model';
import { useCallback } from 'react';
import { Skeleton } from './skeleton';

export function install({
  Navigation: NavigationImpl,
}: {
  Navigation: React.ComponentType<{ project: Project }>,
}) {
  return function ({ project }: { project: Project }) {
    const Navigation = useCallback(function () {
      return <NavigationImpl project={project} />;
    }, [project]);

    const Detail = () => (
      <div>
        Detail
      </div>
    );

    const Toolbar = () => (
      <div>
        Toolbar
      </div>
    );

    const Status = () => (
      <div>
        Status
      </div>
    );

    return (
      <Skeleton
        Header={Toolbar}
        Master={Navigation}
        Detail={Detail}
        Footer={Status}
      />
    );
  };
}
