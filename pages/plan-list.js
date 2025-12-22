import { useRouter } from "next/router";

export default function PlanList() {
  const router = useRouter();

  const onPay = () => {
    router.push("/pay");
  };

  return (
    <div>
      <h1>Choose a Plan</h1>
      <div>
        <h2>Standard Plan</h2>
        <p>$10/month</p>
        <button onClick={onPay}>Pay</button>
      </div>
    </div>
  );
}
