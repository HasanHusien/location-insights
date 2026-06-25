import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKCTwC-suFB6M2vl1dHxH8fitkuFCsQakZ1bK3C66rg&s",
};

const instialState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };

    default:
      throw new Error("Unexpected Data");
  }
}

function FakeAuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, instialState);

  const { user, isAuth } = state;

  function loginFunc(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logoutFunc() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        loginFunc,
        logoutFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useFakeAuth must be used within FakeAuthProvider");

  return context;
}

export { FakeAuthProvider, useFakeAuth };
