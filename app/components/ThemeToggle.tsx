export function ThemeToggle() {
  // ... existing code ...

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed z-90 bottom-10 right-10 bg-opacity-80 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl hover:bg-opacity-100 hover:drop-shadow-2xl",
        isDark ? "bg-orange-300" : "bg-violet-400",
        // Add these classes for better mobile visibility
        "sm:bottom-5 sm:right-5"
      )}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}