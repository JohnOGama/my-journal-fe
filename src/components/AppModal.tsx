"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Modal, ModalContent, ModalTrigger } from "./ui/modal";
import { Button } from "./ui";
import { cn } from "@/libs/shadcn";

interface AppModalProps {
  trigger?: React.ReactNode;
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
  contentClassName?: string;
}

const AppModal: React.FC<AppModalProps> = ({
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
  contentClassName,
}) => {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to avoid desktop flash

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Set initial value
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && (
          <DrawerTrigger className="cursor-pointer" asChild>
            {trigger}
          </DrawerTrigger>
        )}
        <DrawerContent className={contentClassName}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          {children && <div className="overflow-y-auto px-4">{children}</div>}
          {showFooter && (
            <DrawerFooter>
              {onSubmit && <Button onClick={onSubmit}>{submitText}</Button>}
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  {cancelText}
                </Button>
              )}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Dialog/Modal
  return (
    <Modal isOpen={open} onClose={(isOpen) => onOpenChange?.(isOpen)}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent
        className={cn(
          "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden",
          contentClassName,
        )}
      >
        <div className="flex shrink-0 flex-col gap-0.5 p-6 pb-4">
          <h2 className="text-foreground text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {children && (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>
        )}
        {showFooter && (
          <div className="flex shrink-0 flex-col gap-2 p-6 pt-4">
            {onSubmit && <Button onClick={onSubmit}>{submitText}</Button>}
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
