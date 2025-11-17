"use client";

import Login from "@/src/component/(auth)/Login";
import Signup from "@/src/component/(auth)/Signup";
import React, { useState } from "react";

const Auth = () => {
  const [newUser, setNewUser] = useState(true);

  return (
    <div>
      {newUser ? <Signup value={setNewUser} /> : <Login value={setNewUser} />}
    </div>
  );
};

export default Auth;
