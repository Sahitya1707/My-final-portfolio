import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col justify-center items-center">
      <h2 className="text-[4rem]">404</h2>
      <p className="text-lg">
        Oops! Couldn't Found the page you're looking for.
      </p>
      <Link href="/">
        <span className="text-xl mt-2 text-primary underline-offset-4 underline duration-75 hover:no-underline">
          Return Home
        </span>
      </Link>
    </div>
  );
}
