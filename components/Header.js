import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-blue-500 text-white w-full p-4">
      <div className="flex flex-wrap items-center justify-center w-full">
        <div className="flex-shrink-0 mr-4">
          <Image
            src="/ping_pong.png"
            alt="Table Tennis Logo"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-2xl font-bold text-center">
          Table Tennis Score Tracker
        </h1>
      </div>
    </header>
  );
}
