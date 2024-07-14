import PersonalInformation from '../components/PersonalInformation';
//MaterialUI 
import {Avatar, Box, Container, Typography } from '@material-ui/core';
import { Button } from '@mui/material';

const Mypage = () => {
	return(
    <Container>
				<Box>
						<Avatar>K</Avatar>
						<Typography>マイページ</Typography>
						<PersonalInformation />
						<Button variant='contained' color='error'>アカウントを削除する</Button>
					</Box>
    </Container>
    )
}

export default Mypage;