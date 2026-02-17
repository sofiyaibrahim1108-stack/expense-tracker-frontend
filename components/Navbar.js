export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-slate-600">Welcome back 👋</span>
        <button className="btn-primary">Logout</button>
      </div>
    </div>
  )
}
