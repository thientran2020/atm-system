import { useState } from 'react';

export default function useToken() {
	const getToken = () => {
		const tokenString = localStorage.getItem('accessToken');
		return JSON.parse(tokenString);
	};
  
	const [token, setToken] = useState(getToken());
  
	const saveToken = userToken => {
		localStorage.setItem('accessToken', JSON.stringify(userToken));
	  	setToken(userToken.accessToken);
	};

	return {
		token: token, setToken: saveToken
	}
}