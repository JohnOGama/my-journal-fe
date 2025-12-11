import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex-1 flex ">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
