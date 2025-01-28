"use client"
import React from 'react';
import { signIn } from 'next-auth/react';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography } from '@mui/material';



export default function Login() {

	const Container = styled('div')({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
	  });
	  
	  const LoginCard = styled('div')({
		backgroundColor: '#fff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 0 10px rgba(0,0,0,0.1)',
	  });

	return (
	<Container>
		<LoginCard>
			<Typography variant="h5" gutterBottom>
			sign in with
			</Typography>
			<Button variant="contained" color="primary" fullWidth onClick={() => signIn('google', {}, { prompt: 'login' })}>
			  <GoogleIcon /> google Login
			</Button>
		</LoginCard>
	</Container>
	);

}