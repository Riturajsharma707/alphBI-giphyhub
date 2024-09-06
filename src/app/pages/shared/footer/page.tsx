import Link from "next/link";

const Footer = () => {
  return (
    <div className="min-w-full static min-h-12 bottom-0 left-0 bg-slate-600 opacity-90 text-white text-center p-4 items-center">
      <span>Reach to me : </span>
      <Link
        href={"https://github.com/Riturajsharma707"}
        className="text-blue-400 mx-2"
      >
        GitHub
      </Link>{" "}
      |{" "}
      <Link
        href={"https://www.linkedin.com/in/ritu-raj-sharma-09aba3149/"}
        className="text-blue-400 mx-2"
      >
        LinkedIn
      </Link>
      |{" "}
      <Link
        href={
          "https://www.instagram.com/riturajsharma101/?igsh=MW9rcWZtemdpMzJ4eA%3D%3D"
        }
        className="text-blue-400 mx-2"
      >
        Instagram
      </Link>
    </div>
  );
};

export default Footer;
