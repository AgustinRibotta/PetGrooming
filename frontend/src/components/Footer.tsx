export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 tracking-wide select-none">
        © {new Date().getFullYear()} — Made with <span aria-label="heart" role="img">❤️</span> for your furry friends 🐾
      </div>
    </footer>
  )
}
