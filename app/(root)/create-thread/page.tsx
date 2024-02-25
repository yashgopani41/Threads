import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "../../../lib/actions/user.action";
import PostThread from "../../../components/forms/PostThreads";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) return redirect("/");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo?._id} />
    </>
  );
};

export default Page;
