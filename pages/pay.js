import { useRouter } from "next/router";

export default function Pay() {
  const router = useRouter();

  const onVerify = () => {
    router.push("/verifying");
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Simulating Razorpay payment...</p>
      <button onClick={onVerify}>Verify Payment</button>
    </div>
  );
}
