import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const Film: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Film</Typography>
</Box>
)
};

export default Film;