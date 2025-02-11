'use client';

import React, { useState } from 'react';
import './page.css';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error messages

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("username",result.name)
        localStorage.setItem("id",result.id)
        localStorage.setItem("email",result.email)
        // Redirect or handle successful login
        console.log('Login successful', result.name);
        window.location.href = '/recommen'; 
      } else {
        // Handle error from API
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="flex justify-center items-center min-h-screen">
        <Card
          className="w-[350px] shadow-lg transition duration-300"
          style={{ backgroundColor: 'transparent', border: '2px solid white' }}
        >
          <CardHeader>
            <CardTitle style={{ fontFamily: 'verdana', color: 'white' }}>
              Login
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="email"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your full email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      color: "white",
                      backgroundColor: 'transparent',
                      border: '2px solid white',
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="password"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      color: "white",
                      backgroundColor: 'transparent',
                      border: '2px solid white',
                    }}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: 'red',
                fontWeight: 'bold',
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center text-sm">
             <span style={{color:"white"}}> Don’t have an account? {' '}</span>
              <a href="/register" className="text-blue-500 underline">
                Please sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
