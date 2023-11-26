import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const VidGames: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Video Games</Typography>
</Box>
)
};

export default VidGames;