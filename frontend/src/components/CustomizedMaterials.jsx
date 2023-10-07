import { Button } from "@mui/material";
import { purple, red } from "@mui/material/colors";

import { styled } from "@mui/material";

export const PurpleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[600]),
  backgroundColor: purple[600],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[900],
  "&:hover": {
    backgroundColor: red[700],
  },
}));
