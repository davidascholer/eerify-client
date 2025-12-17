import { useEffect } from "react";
import { toast } from "sonner";

export default function Toast({
  msg,
  open,
  close,
}: {
  msg: string;
  open: boolean;
  close?: undefined | (() => void);
}) {
  useEffect(() => {
    if (open) {
      const id = toast.success(msg);
      const timer = setTimeout(() => {
        toast.dismiss(id);
        close?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, msg, close]);

  return null;
}
