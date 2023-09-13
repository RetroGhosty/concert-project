import { Button} from '@mui/material'
import { purple } from '@mui/material/colors'

import { styled } from '@mui/material'


export const PurpleButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: purple[600],
    '&:hover': {
        backgroundColor: purple[700]
    }
}))



