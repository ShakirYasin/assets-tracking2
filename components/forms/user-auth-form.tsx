"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Status } from "@prisma/client";
import { ICreateShipment } from "@/types";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string({ required_error: "password is required" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm({
  shipmentData,
}: {
  shipmentData: ICreateShipment;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);

      const signInUser = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (signInUser?.error) {
        toast({
          title: signInUser.error,
          variant: "destructive",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      if (signInUser?.ok) {
        if (shipmentData) {
          router.push(
            `/dashboard/shipment/?carrier=${shipmentData.carrier}&tracking_number=${shipmentData.tracking_number}`,
          );
        } else {
          router.push("/dashboard");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="ml-auto w-full bg-[#D3991F]"
            type="submit"
          >
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        {/* <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
      </div>
      {/* <GoogleSignInButton /> */}
    </>
  );
}
