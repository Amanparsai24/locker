import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default PublicLayout;
