
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [text, setText] = useState("");
  const fullText = "Hey there, let's convert binary to assembly";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typeWriter = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typeWriter);
        setTimeout(() => setIsVisible(false), 500); // Hide after typing is done
      }
    }, 50);

    // Hide splash screen after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearInterval(typeWriter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xl bg-black/50 transition-all duration-500">
      <div className="text-2xl md:text-4xl font-bold text-white">
        {text}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
};

export default SplashScreen;
