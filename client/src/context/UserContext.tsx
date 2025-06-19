import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number; // User ID
  username: string | null; // Username
  createdAt: string; // Created at timestamp
  updatedAt: string; // Updated at timestamp
  deletedAt: string | null; // Deleted at timestamp (if applicable)
  email: string | null; // Email address
}

interface UserContextType {
  user: User | null;
  error: string | null;
  fetchUserData: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorisation: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();

      // Map the response to the User structure
      const userData: User = {
        id: data.userDetails.userId, // Mapping userId to id
        username: data.userDetails.username,
        createdAt: data.userDetails.createdAt, // Mapping createdAt
        updatedAt: data.userDetails.updatedAt, // Mapping updatedAt
        deletedAt: null, // Set to null as it's not provided in the response
        email: data.userDetails.email, // Mapping email
      };

      setUser(userData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchUserData(); // User logged in
      } else {
        setUser(null); // User logged out
      }
    };

    handleAuthChange();

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, error, fetchUserData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
