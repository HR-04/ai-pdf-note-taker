"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    if (!user) return;

    const result = await createUser({
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
      userName: user.fullName,
    });
    console.log(result);
  };

  return (
    <div>
      <h2>Hello </h2>
      <UserButton />
    </div>
  );
}