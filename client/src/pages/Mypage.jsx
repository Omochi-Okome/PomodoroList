import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//MaterialUI 
import { Box, Container } from '@material-ui/core';
import { Button, Alert } from '@mui/material';

const Mypage = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	useEffect(() => {
		if(!user) {
			console.error('ユーザー認証が無効です');
		}
	}, [user]);

	const deleteAccount = async(user) => {
		try {
			await user.delete();
			console.log('アカウントを削除しました');
			setMessage('アカウントを削除しました');
			navigate('/auth/login');
		} catch(err) {
			console.error(err);
		}
	}
	const confirmDleteAccount = (user) => {	
		if(window.confirm('本当にアカウントを削除しますか？')) {
			deleteAccount(user);
		}
	}

	return(
    <Container>
				<Box>
						<Button variant='contained' color='error' onClick={() => confirmDleteAccount(user)}>アカウントを削除する</Button>
						{message && <Alert>{message}</Alert>}
					</Box>
    </Container>
    )
}

export default Mypage;