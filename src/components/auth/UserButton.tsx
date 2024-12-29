import { auth } from "@/auth";
import Image from "next/image";
import SignIn from "./signin";
import { SignOut } from "./signout";


export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div className="flex flex-row items-center space-x-4 mt-10 rounded border-2 border-zinc-700 hover:border-black p-2 ">
      <div className="flex flex-col items-center justify-center space-x-2">
      <Image
      className="rounded border-zinc-700 border-2 "
        src={session?.user?.image || ""}
        alt="User Avatar"
        width={40}
        height={32}
      />
      <p className="mb-0 text-zinc-200 text-sm">{(session?.user?.name)?.toUpperCase()}</p>
      </div>
      <SignOut />
    </div>
    
  );
}
