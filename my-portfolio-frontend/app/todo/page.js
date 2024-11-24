"use client";
import HeadingTypeOne from "../components/HeadingTypeOne";
import { useEffect, useState } from "react";
import JokeComponent from "../components/JokeComponent";
import TodoListComponent from "../components/TodoListComponent";

const Todo = () => {
  const [joke, setJoke] = useState("");
  useEffect(() => {
    const fetchJoke = async () => {
      try {
        // https://icanhazdadjoke.com/api
        const response = fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await (await response).json();

        if (data.status === 200) {
          setJoke(data.joke);
        }
        console.log(data);
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJoke();
    // console.log(data);
    console.log("todo called");
  }, []);
  return (
    <div>
      <HeadingTypeOne text={"to-do"} />
      <JokeComponent joke={joke} />
      <TodoListComponent />
    </div>
  );
};

export default Todo;
