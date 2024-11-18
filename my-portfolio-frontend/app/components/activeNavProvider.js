"use client";

import { ActiveNavProvider } from "./activeNavContext";

const Provider = ({ children }) => {
  return <ActiveNavProvider>{children}</ActiveNavProvider>;
};

export default Provider;
