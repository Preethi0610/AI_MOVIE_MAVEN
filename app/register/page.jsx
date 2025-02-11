'use client'

import './page.css'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setLoading(true);

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); 
        window.location.href = "/login";
        
      } else {
        setError(data.message); // Display error message from backend
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background'>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[350px] shadow-lg transition duration-300" style={{ backgroundColor: "transparent", border: "2px solid white" }}>
          <CardHeader>
            <CardTitle style={{ fontFamily: "verdana", color: "white" }}>Register</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username" style={{ color: "white", fontWeight: "bold" }}>Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your name"
                    style={{ color: "white", backgroundColor: "transparent", border: "2px solid white" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" style={{ color: "white", fontWeight: "bold" }}>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your full email"
                    style={{ color: "white", backgroundColor: "transparent", border: "2px solid white" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" style={{ color: "white", fontWeight: "bold" }}>Create password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    style={{ color: "white", backgroundColor: "transparent", border: "2px solid white" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ConfirmPassword" style={{ color: "white", fontWeight: "bold" }}>Confirm password</Label>
                  <Input
                    id="ConfirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    style={{ color: "white", backgroundColor: "transparent", border: "2px solid white" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
               <br />
               <CardFooter className="flex justify-between">
                <Button
                  type="submit"
                  style={{
                    width: "150%",
                    backgroundColor: "red",
                    fontWeight: "bold",
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign-up'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
