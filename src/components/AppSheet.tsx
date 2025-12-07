"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui";

interface AppSheetProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showFooter?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const AppSheet: React.FC<AppSheetProps> = ({
  trigger,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  showFooter = true,
  open,
  onOpenChange,
  side = "right",
  className,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="cursor-pointer" asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children && (
          <div className="flex-1 overflow-auto px-4">{children}</div>
        )}
        {showFooter && (
          <SheetFooter>
            {onSubmit && <Button onClick={onSubmit}>{submitText}</Button>}
            <SheetClose asChild>
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AppSheet;
