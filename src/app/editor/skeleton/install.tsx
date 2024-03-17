import { Skeleton } from './skeleton';

export function install({
  Navigation,
}: {
  Navigation: React.ComponentType,
}) {
  return function () {
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
