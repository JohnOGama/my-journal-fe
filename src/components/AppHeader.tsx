import { ThemeToggle } from "@/components/ThemeToggle";

const AppHeader = () => {
  return (
    <div className="bg-background border-border sticky top-0 z-50 flex w-full items-center justify-between border-b p-3 lg:mx-auto lg:max-w-7xl lg:px-0">
      <h1 className="relative flex items-center gap-2 text-lg font-semibold">
        My Journal
      </h1>
      <ThemeToggle />
    </div>
  );
};

export default AppHeader;
