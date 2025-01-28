"use client"
import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';



export default function Login() {

	const Container = styled('div')({
		alignItems: 'center',
		justifyContent: 'center',
	  });
	  
	  const LoginCard = styled('div')({
		backgroundColor: '#fff',
		padding: '100px',
		borderRadius: '10px',
		boxShadow: '0 0 10px rgba(0,0,0,0.1)',
	  });

	return (
		<Container>
		  <LoginCard>
			<Button variant="contained" color="primary" fullWidth onClick={() => signIn('google', {}, { prompt: 'login' })}>
			  ログイン
			</Button>
		  </LoginCard>
		</Container>
	);

}