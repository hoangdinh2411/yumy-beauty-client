function useAuth() {
  const auth = JSON.parse(localStorage.getItem("authInfo"));

  return auth ? auth : null;
}

export default useAuth;
