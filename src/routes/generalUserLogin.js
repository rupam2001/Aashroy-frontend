import React from "react";
import GoogleSignIn from "../components/googleSignIn.component";
import UserLayout from "../layouts/user.layout";

export default function GeneralUserLogin({}) {
  return (
    <UserLayout>
      <GoogleSignIn children={<button>Signin with google</button>} />
    </UserLayout>
  );
}
