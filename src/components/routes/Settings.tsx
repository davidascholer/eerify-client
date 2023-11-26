import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const Settings: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Settings Page</Typography>
</Box>
)
};

export default Settings;