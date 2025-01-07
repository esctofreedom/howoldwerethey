import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { ThemeToggle } from "./theme-toggle";
import { Baby } from "lucide-react";
import SearchBox from "./SearchBox";
import { TooltipProvider } from "@/components/ui/tooltip";
import Logo from "./Logo";
import Head from "next/head";

import Footer from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>How Old Were They?</title>
        <meta name="description" content="How Old Were They?" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-transparent shadow-none">
        <div className="max-w-7xl mx-auto p-4 items-center flex justify-between">
          <Link href="/">
            <div className="font-bold text-xl flex items-center gap-2 uppercase cursor-pointer text-foreground">
              <Logo height={24} width={24} />

              {/* Page name small and up */}
              <div className="flex-col hidden sm:flex">
                <span className="text-sm text-muted-foreground font-light">
                  How Old
                </span>
                <span className="text-sm text-foreground font-bold">
                  Were They?
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <SearchBox />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="relative p-4 min-h-screen h-full">
        <TooltipProvider delayDuration={100}>
          <motion.div
            key={router.route}
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
        </TooltipProvider>
      </main>
      <Footer />
    </>
  );
};
