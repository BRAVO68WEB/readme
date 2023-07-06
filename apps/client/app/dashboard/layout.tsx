import React from "react";

import DashboardLayoutContainer from "@/components/ui/DashboardLayoutContainer";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return <DashboardLayoutContainer>{children}</DashboardLayoutContainer>;
};

export default DashboardLayout;
