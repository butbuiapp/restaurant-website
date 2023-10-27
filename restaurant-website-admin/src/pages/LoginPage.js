import Login from "../components/login/Login";

function LoginPage() {
  return <div>
    <header className='header'>
      <div className='logo'>
        Restaurant Admin
      </div>
    </header>
    <section>
      <Login />
    </section>
  </div>
}

export default LoginPage;