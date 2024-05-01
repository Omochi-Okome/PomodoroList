import {Avatar, Box, Container, Paper, Typography } from '@material-ui/core';
import { Button } from '@mui/material';

const Mypage = () => {
	return(
    <Container>
				<Box>
						<Avatar>K</Avatar>
						<Typography>マイページ</Typography>
						<h2>プロフィール</h2>
						<h3>メールアドレス</h3>
						<h3>ユーザーネーム</h3>
						<h3>登録日付</h3>
						<h3>パスワード</h3>
						<Button variant='contained' color='error'>アカウントを削除する</Button>
					</Box>
    </Container>
    )
}

export default Mypage;