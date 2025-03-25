// app/admin/page.tsx
import AuthGate from '../../components/AuthGate'

export default function AdminPage() {
  return (
    <AuthGate requiredRole="admin">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, Admin. You now have access to protected content.</p>
      </div>
    </AuthGate>
  )
}
