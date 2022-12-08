import React, {
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';

interface User {
  id: string;
  name: string;
  login: string;
  password: string;
  userType: {
    name: string;
  };
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@librarian:user');

    return { user: JSON.parse(user) };
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@librarian:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ login, password }): Promise<boolean> => {
    const user = window.api.sendSync('userLogin', {
      entity: 'User',
      value: {
        login,
        password,
      },
    }) as User;

    if (user) {
      localStorage.setItem('@librarian:user', JSON.stringify(user));
      setData({ user });
      return true;
    }
    return false;
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@librarian:user', JSON.stringify(user));
      setData({
        user: {
          ...data.user,
          ...user,
        },
      });
    },
    [data.user]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
