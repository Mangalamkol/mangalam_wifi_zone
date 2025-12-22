import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Verifying() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/coupon");
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Verifying Payment...</h1>
    </div>
  );
}
