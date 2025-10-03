import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from '@tanstack/react-router';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-[1000px] justify-self-center self-start mt-10 px-4 py-10">
      <div className="w-full border rounded-md p-8 text-center bg-white/80 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                localStorage.setItem('google_id_token', credentialResponse.credential);
                navigate({ to: '/admin' });
              }
            }}
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
