"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";

export default function Page() {
  const router = useRouter();

  router.replace("/i/flow/signup");
  return <Main />;
}
