// it will contain the login server form action
"use server";
import { backendURI } from "../utils/secret";

export default async function handleLogin(formData) {
  console.log(formData.get("email"));
  console.log(backendURI);
  try {
    // const formData = new FormData(e.currentTarget);
    // console.log(e.currentTarget);
    const response = await fetch(`${backendURI}/admin/login`, {
      method: "POST",
      header: {
        "Content-Type": "applicaiton/json",
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

    console.log(formData.entries());
  } catch (err) {}
  // e.preventDefault();
  // why not use State for form
  // https://medium.com/@TheKalpit/stop-using-usestate-for-form-data-ce5cc9a4ce93
}
