import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

function TopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>ヘッダー</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar