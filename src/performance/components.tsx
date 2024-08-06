import dynamic from "next/dynamic";

export const LoginDynamic = dynamic(
  () => import("@/components/auth/loginForm"),
  { ssr: false, loading: () => <p>loading</p> }
);
export const SignupDynamic = dynamic(
  () => import("@/components/auth/signupForm"),
  { ssr: false, loading: () => <p>loading</p> }
);
