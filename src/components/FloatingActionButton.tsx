import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 p-0"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
