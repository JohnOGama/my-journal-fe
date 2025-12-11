import React from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui";

interface AppDrawerProps {
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

const AppDrawer: React.FC<AppDrawerProps> = ({
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
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className="cursor-pointer" asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className={contentClassName}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children && <div className="px-4">{children}</div>}
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
};

export default AppDrawer;
