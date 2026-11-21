import LoginForm from "./LoginForm";

const LoginPage = () => {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return <LoginForm googleEnabled={googleEnabled} />;
};

export default LoginPage;
