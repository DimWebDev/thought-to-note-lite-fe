import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { theme } from '../../theme/theme';

const StyledCard = styled(Card)`
  background-color: ${theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export default StyledCard;