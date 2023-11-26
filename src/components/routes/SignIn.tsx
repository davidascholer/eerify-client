import React, {type PropsWithChildren} from 'react';
import {Box, Typography} from '@mui/material'

const styles = {
    container:{
        backgroundColor:"#fff",
    }
}

const SignIn: React.FC<PropsWithChildren> = () => {
return (
<Box style={styles.container}>
    <Typography>Sign In Page</Typography>
</Box>
)
};

export default SignIn;