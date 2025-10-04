import { BACKEND_URL, VALIDATE_USER } from '@/constants/backend';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export function Login() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const { refetch } = useQuery({
    queryKey: ['user', userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error('No email provided');
      const response = await fetch(`${BACKEND_URL}${VALIDATE_USER}?user=${userEmail}`);
      return response.json();
    },
    enabled: false,
  });

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const credential = jwtDecode(credentialResponse.credential) as any;
      setUserEmail(credential.email);

      // Trigger the query to validate the user with the email
      const result = await refetch();
      if (result.error) navigate({ to: '/unauthorized' });
      if (result.data && !result.error) {
        localStorage.setItem('google_id_token', credentialResponse.credential);
        navigate({ to: '/admin' });
      }
    }
  };

  return (
    <div className="w-[1000px] justify-self-center self-start mt-10 px-4 py-10">
      <div className="w-full border rounded-md p-8 text-center bg-white/80 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
              // noop
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
