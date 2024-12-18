"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { CalendarDays, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { AuthModal } from "./auth/AuthModal";
import { useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { UserFromDB } from "@/interfaces/user";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login"
  );
  const { data: session } = useSession();
  const user = session?.user as UserFromDB;

  const openAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 " />
            <h1 className="text-2xl font-bold">PlayOn</h1>
          </Link>
          <nav className="hidden sm:flex items-center space-x-6">
            <Link
              href="/"
              className="rounded-lg p-2  hover:shadow-md dark:shadow-foreground "
            >
              Courts
            </Link>
            <Link
              href="/contact"
              className="rounded-lg p-2  hover:shadow-md dark:shadow-foreground "
            >
              Contact
            </Link>
            {user && (
              <Link
                href={`/users/bookings`}
                className="rounded-lg p-2  hover:shadow-md dark:shadow-foreground "
              >
                My Bookings
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href={`/dashboard`}
                className="rounded-lg p-2  hover:shadow-md dark:shadow-foreground "
              >
                Admin
              </Link>
            )}
          </nav>
          <div className="flex flex-row items-center gap-2">
            <div className="hidden sm:flex items-center ">
              <ThemeToggle />
            </div>
            {user ? (
              <div className="flex items-center gap-4 ml-3">
                <span className="text-muted-foreground">
                  Welcome, {user.name}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="hidden sm:flex text-sm text-muted-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => openAuthModal("login")}>
                  Login
                </Button>
                <Button onClick={() => openAuthModal("register")}>
                  Sign up
                </Button>

                <AuthModal
                  isOpen={isAuthModalOpen}
                  onClose={() => setIsAuthModalOpen(false)}
                  defaultTab={authModalTab}
                />
              </div>
            )}
          </div>

          <div
            id="hamburguer-container"
            className="sm:hidden flex flex-row justify-center place-items-center p-2 gap-2"
          >
            <ThemeToggle />
            <Menu
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              size={40}
              className={`text-gray-500 ${
                isMobileMenuOpen ? "rotate-90 scale-0 " : "rotate-0 scale-100 "
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden absolute top-0 left-0 bg-background w-full h-screen py-5 z-50 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="relative flex flex-col justify-start place-tems-center  text-lg font-bold">
          <Link
            className="px-5 py-3 hover:bg-gray-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            href="/"
          >
            Courts
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-5 py-3 hover:bg-gray-400"
            href="/contact"
          >
            Contact
          </Link>
          {user?.role === "admin" && (
            <Link
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              href={`/dashboard`}
              className="px-5 py-3 hover:bg-gray-400"
            >
              Admin
            </Link>
          )}
          {user && (
            <>
              <Link
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                href={`/users/bookings`}
                className="px-5 py-3 hover:bg-gray-400"
              >
                My Bookings
              </Link>
              <button
                onClick={() => signOut()}
                className="px-5 py-3 text-left hover:bg-gray-400"
              >
                Logout
              </button>
            </>
          )}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="close-hamburguer-container"
            className="absolute top-2 right-5 transition-all duration-300 ease-in-out"
          >
            <X
              size={40}
              className={`text-gray-500 ${
                isMobileMenuOpen ? "rotate-0 scale-100 " : "rotate-90 scale-0 "
              }`}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
