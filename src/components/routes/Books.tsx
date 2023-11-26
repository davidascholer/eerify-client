import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const Books: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Books</Typography>
</Box>
)
};

export default Books;