import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-1">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default PublicLayout;
