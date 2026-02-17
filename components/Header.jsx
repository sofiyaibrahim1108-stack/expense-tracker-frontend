export default function Header() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <input className="input w-64" placeholder="Search..." />
        <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
      </div>

    </header>
  );
}
