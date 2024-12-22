// it will contain the login server form action
"use server";
import { cookies } from "next/headers";
import { backendURI } from "../utils/secret";

export default async function handleLogin(formData) {
  try {
    // const formData = new FormData(e.currentTarget);
    // console.log(e.currentTarget);
    const response = await fetch(`${backendURI}/admin/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      credentials: "include",
    });

    if (response.ok) {
      console.log("ok");
    }

    const setCookieHeader = response.headers.get("set-cookie");
    console.log(setCookieHeader);
    const cookieStore = await cookies();
    if (setCookieHeader) {
      // await cookies().set(setCookieHeader);
      cookieStore.set(setCookieHeader);
    }

    if (!response.ok) {
      throw new Error("Login failed");
    }
  } catch (err) {
    console.log("err", err);
  }
  // e.preventDefault();
  // why not use State for form
  // https://medium.com/@TheKalpit/stop-using-usestate-for-form-data-ce5cc9a4ce93
}
