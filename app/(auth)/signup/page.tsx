import UserAuthFormSignUp from "@/components/forms/user-auth-from-signup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CompanyAuthFormSignUp from "@/components/forms/user-company-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 hidden top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#3491fe]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href={"/"}>
            <Image src={"/images/logo.png"} alt="logo" width={60} height={60} />
          </Link>
        </div>
        <div className="relative z-20 mt-auto ">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight ">
              Register an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to register
            </p>
          </div>
          <Tabs defaultValue="user" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <UserAuthFormSignUp />
            </TabsContent>
            <TabsContent value="company">
              <CompanyAuthFormSignUp />
            </TabsContent>
          </Tabs>

          <Link href="/signin" className="text-[#3491FE]">
            already have an account?
          </Link>
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}
