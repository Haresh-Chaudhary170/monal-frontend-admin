'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://monal-api-haresh-chaudhary170s-projects.vercel.app";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/admin/protected`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
