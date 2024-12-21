"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const handleLogin = () => {
  signIn("google", {
    callbackUrl: "/dashboard",
    redirect: true,
  });
};

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Welcome to QuickChat App
          </DialogTitle>
          <DialogDescription>
            A real-time chat app that allows users to send and receive messages
            instantly, featuring seamless communication with support for group
            chats and direct messaging. Built with a responsive UI and powered
            by WebSockets for live updates.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleLogin}>
          <Image
            src="/images/google.png"
            className="mr-4"
            width={25}
            height={25}
            alt="google-logo"
          />
          Continue With Google!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
