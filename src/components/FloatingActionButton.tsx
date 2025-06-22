import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#4CAF50] dark:bg-white hover:bg-green-600 dark:hover:bg-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 p-0"
    >
      <ArrowUp className="h-6 w-6 text-white dark:text-[#4CAF50] transition-colors duration-300" />
    </Button>
  );
}