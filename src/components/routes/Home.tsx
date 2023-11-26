import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const Home: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Home</Typography>
</Box>
)
};

export default Home;