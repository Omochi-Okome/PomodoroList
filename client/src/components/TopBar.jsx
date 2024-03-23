import { AppBar, Toolbar, Typography,Button } from '@material-ui/core'
import React from 'react'

function TopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button href='/'>ホーム</Button>
                <Button href='/archive'>アーカイブ</Button>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar