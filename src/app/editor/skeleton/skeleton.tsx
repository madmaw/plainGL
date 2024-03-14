import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  flex: 0;
`;

const MasterDetailContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const MasterContainer = styled.div`
  flex: 0;
`;

const DetailContainer = styled.div`
  flex: 1;
`;

const FooterContainer = styled.div`
  flex: 0;
`;

export function Skeleton({
  Master,
  Detail,
  Header,
  Footer,
}: {
  Master: React.ComponentType,
  Detail: React.ComponentType,
  Header: React.ComponentType,
  Footer: React.ComponentType,
}) {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <MasterDetailContainer>
        <MasterContainer>
          <Master />
        </MasterContainer>
        <DetailContainer>
          <Detail />
        </DetailContainer>
      </MasterDetailContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
}
