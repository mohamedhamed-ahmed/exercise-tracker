import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Date from '../../components/Date/Date';


export const ExerciseContainer = styled.div`
  margin: 5px;
`;
export const ExerciseForm = styled.div`
  padding: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;

`;
export const SelectWrapper=styled.div`
  margin-bottom: 20px;
`;
export const DateWrapper=styled(Date)`
  margin-top: 30px;
`;
export const TextFieldWrapper = styled(TextField)`
  padding-bottom: 20px;
`;

export const ButtonWrapper = styled(Stack)`
  padding-top: 10px;
  justify-content: flex-end;
`;
