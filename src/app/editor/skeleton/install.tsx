import styled from '@emotion/styled';
import { Skeleton } from './skeleton';

export function install() {
  const NavigationContainer = styled.div`
    min-width: 200px;
    background-color: black;
    height: 100%;
  `;

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
        Master={NavigationContainer}
        Detail={Detail}
        Footer={Status}
      />
    );
  };
}
