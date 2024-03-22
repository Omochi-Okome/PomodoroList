import { AppBar, Toolbar, Typography,Button } from '@material-ui/core'
import React from 'react'

function TopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>ヘッダー</Typography>
                <Button href='/archive'>アーカイブ</Button>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar