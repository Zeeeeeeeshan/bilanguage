
import Converter from "@/components/Converter";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <SplashScreen />
      <Converter />
    </div>
  );
};

export default Index;
