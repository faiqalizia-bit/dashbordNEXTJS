import DashboardLayout from "@/components/dashboard/Layout"

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
