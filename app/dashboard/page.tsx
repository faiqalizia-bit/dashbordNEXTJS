import DashboardContent from '@/components/dashboard/Dashboardontent'
import DashboardLayout from '@/components/dashboard/Layout'
import React from 'react'

function page() {
  return (
  
      <DashboardLayout>
        <div className="flex py-2 w-full">
          <DashboardContent />
        </div>
        
      </DashboardLayout>

   
  )
}

export default page