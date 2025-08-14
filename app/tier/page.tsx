import { PricingTable, RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Subscription = async () => {
  const user = await currentUser();
  if (!user) {
    return <RedirectToSignIn />;
  }
  return (
    <main>
      <PricingTable />
    </main>
  );
};
export default Subscription;
