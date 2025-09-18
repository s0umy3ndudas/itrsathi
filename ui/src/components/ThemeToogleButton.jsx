import { useTheme } from "../context/ThemeContext";


export function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
    >
      {isDarkMode ? "Switch to Light 🌞" : "Switch to Dark 🌙"}
    </button>
  );
}