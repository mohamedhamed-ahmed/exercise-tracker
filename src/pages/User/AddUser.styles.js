import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const AddUserContainer = styled.div`
  margin: 5px;
`;
export const UserNameForm = styled.div`
  padding: 10px;
  width: 30%;
`;

export const UserName = styled(TextField)`
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled(Stack)`
  justify-content: flex-end;
`;
