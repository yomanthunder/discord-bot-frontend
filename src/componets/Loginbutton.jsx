// src/componets/loginbutton.jsx

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;


const OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify+guilds`;

export default function LoginButton() {
  return (
    <a href={OAUTH_URL}>
      <button>Login with Discord</button>
    </a>
  );
}
