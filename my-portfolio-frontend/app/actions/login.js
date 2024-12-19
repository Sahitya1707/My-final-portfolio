// it will contain the login server form action
"use server";
import { backendURI } from "../utils/secret";

export default async function handleLogin(formData) {
  console.log(formData.get("email"));
  console.log(formData.get("password"));

  try {
    // const formData = new FormData(e.currentTarget);
    // console.log(e.currentTarget);
    const response = await fetch(`${backendURI}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "neuapnesahitya",
        password: formData.get("password"),
      }),
      credentials: "include",
    });
    if (response.ok) {
      console.log("ok");
    }

    console.log(formData.get("email"));
  } catch (err) {}
  // e.preventDefault();
  // why not use State for form
  // https://medium.com/@TheKalpit/stop-using-usestate-for-form-data-ce5cc9a4ce93
}
