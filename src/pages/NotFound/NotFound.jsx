import { Home, SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md text-center">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-100 flex items-center justify-center">
            <SearchX size={48} className="text-amber-600 sm:w-14 sm:h-14" />
          </div>
        </div>

        <h1 className="text-7xl sm:text-8xl font-extrabold text-amber-600 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-3 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved or doesn't exist anymore.
        </p>


       

      </div>

    </div>
  );
}