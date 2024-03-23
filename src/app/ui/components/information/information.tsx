import styled from '@emotion/styled';
import { type Icon } from 'app/ui/components/icon/types';
import {
  type Text,
  TextType,
} from 'app/ui/components/typography/types';
import { Size } from 'app/ui/metrics';
import { TextAlignment } from 'ui/components/typography/text';

export type InformationProps = {
  Icon?: Icon,
  Text: Text,
  heading?: string,
  message?: string,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Information({
  Icon,
  Text,
  heading,
  message,
}: InformationProps) {
  return (
    <Container>
      {Icon && <Icon size={Size.Large} />}
      {heading && (
        <Text
          alignment={TextAlignment.Middle}
          size={Size.Medium}
          type={TextType.Heading}
        />
      )}
      {message && (
        <Text
          alignment={TextAlignment.Middle}
          size={Size.Medium}
          type={TextType.Body}
        >
          {message}
        </Text>
      )}
    </Container>
  );
}
