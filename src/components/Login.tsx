import { BACKEND_URL, VALIDATE_USER } from '@/constants/backend';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export function Login() {
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const credential = jwtDecode(credentialResponse.credential) as any;
      const result = await fetch(`${BACKEND_URL}${VALIDATE_USER}?user=${credential.email}`);
      if (!result.ok) return navigate({ to: '/unauthorized' });
      localStorage.setItem('google_id_token', credentialResponse.credential);
      navigate({ to: '/admin' });
    }
  };

  return (
    <div className="w-[1000px] mx-auto mt-10 px-4 py-10">
      <div className="w-full border rounded-md p-8 text-center bg-white/80 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        <div className="flex justify-center">
          <GoogleLogin onSuccess={onSuccess} onError={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Login;
