import { motion } from "framer-motion";
import Link from "next/link";
import { Dark } from "./Dark";

export const Layout = ({ children }) => {
  return (
    <>
      <header className="dark:bg-denim-700 shadow-md bg-white p-8">
        <div className="max-w-7xl mx-auto flex gap-8 items-center justify-center">
          <Link href="/">
            <h1 className="font-semibold text uppercase cursor-pointer text-denim-400">
              HOWT?
            </h1>
          </Link>
          <Dark />
        </div>
      </header>
      <main
        className={`relative p-4 md:p-8 pb-24 min-h-screen h-full
      } `}
      >
        <motion.div
          // key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: { y: 50, opacity: 0 },
            pageAnimate: {
              y: 0,
              opacity: 1,
              transition: { delay: 0, duration: 0.3 },
            },
          }}
        >
          {children}
        </motion.div>
      </main>
    </>
  );
};
