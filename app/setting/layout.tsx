import DashboardLayout from "@/components/dashboard/Layout"
import SettingsSidebar from "@/components/Settings/SettingsSidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
    <div className="h-full ">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="  grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <SettingsSidebar />
        </div>

        <div className="col-span-9 bg-white p-8 h-full rounded-xl shadow">
          {children}
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

