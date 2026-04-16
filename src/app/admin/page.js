import Navbar from '@/components/shared/Navbar'
import { Users, CreditCard, BarChart3, ShieldCheck, Activity } from 'lucide-react'

export default function AdminPage() {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', plan: 'Premium', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', plan: 'Free', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@web.com', plan: 'Premium', status: 'Canceled' },
  ]

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-10">
           <ShieldCheck size={32} className="text-primary" />
           <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <AdminStatCard icon={<Users />} label="Total Users" value="1,284" />
           <AdminStatCard icon={<BarChart3 />} label="Monthly Revenue" value="$4,520" />
           <AdminStatCard icon={<CreditCard />} label="Active Subscriptions" value="238" />
           <AdminStatCard icon={<Activity />} label="Conversion Rate" value="18.5%" />
        </div>

        {/* User Management Table */}
        <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm">
           <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-bold text-xl">User Management</h2>
              <button className="text-sm font-bold text-primary hover:underline">Export CSV</button>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold tracking-widest">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {users.map(user => (
                   <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                         <div className="font-bold">{user.name}</div>
                         <div className="text-sm text-muted-foreground">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {user.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-sm">
                         {user.plan}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">
                         <button className="hover:underline">Manage</button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}

function AdminStatCard({ icon, label, value }) {
   return (
      <div className="bg-background border border-border p-6 rounded-2xl">
         <div className="text-muted-foreground mb-4 opacity-70">{icon}</div>
         <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
         <p className="text-2xl font-black">{value}</p>
      </div>
   )
}
