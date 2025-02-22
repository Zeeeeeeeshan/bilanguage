
import { useState } from "react";
import { toast } from "sonner";
import { Copy, ArrowRight, ChevronUp, ChevronDown, ArrowLeftRight } from "lucide-react";
import { binaryToAssembly } from "@/utils/binaryToAssembly";

const Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [mode, setMode] = useState<"binaryToAssembly" | "assemblyToBinary">("binaryToAssembly");

  const handleConvert = () => {
    try {
      setIsConverting(true);
      if (mode === "binaryToAssembly") {
        const result = binaryToAssembly(input);
        setOutput(result);
      } else {
        // Simple assembly to binary conversion (you might want to implement a more sophisticated conversion)
        const result = input.split('\n')
          .map(line => {
            // Basic conversion logic - you should implement proper assembly to binary conversion
            if (line.includes('ADD')) return '00000001';
            if (line.includes('SUB')) return '00000010';
            return '00000000';
          })
          .join('\n');
        setOutput(result);
      }
      toast.success("Conversion successful!");
      setIsInputExpanded(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === "binaryToAssembly" ? "assemblyToBinary" : "binaryToAssembly");
    setInput("");
    setOutput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight animate-fade-in bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {mode === "binaryToAssembly" ? "Binary to Assembly" : "Assembly to Binary"}
        </h1>
        <p className="text-muted-foreground animate-fade-in">
          Convert {mode === "binaryToAssembly" ? "binary code into assembly language" : "assembly language into binary code"}
        </p>
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 mx-auto text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeftRight size={16} />
          Switch Mode
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer md:cursor-default"
            onClick={() => setIsInputExpanded(!isInputExpanded)}
          >
            <label className="text-sm font-medium">
              {mode === "binaryToAssembly" ? "Binary Input" : "Assembly Input"}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden md:inline">
                {mode === "binaryToAssembly" ? "Use 0s and 1s only" : "Enter assembly instructions"}
              </span>
              <button className="md:hidden">
                {isInputExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className={`transition-all duration-300 ${
            isInputExpanded ? 'h-[300px]' : 'h-32 md:h-[300px]'
          }`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full h-full p-4 rounded-lg border bg-background/50 backdrop-blur-sm font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                isConverting ? "blur-sm" : ""
              }`}
              placeholder={mode === "binaryToAssembly" ? "Enter binary code..." : "Enter assembly code..."}
            />
          </div>
          <button
            onClick={handleConvert}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all animate-slideUp flex items-center justify-center gap-2 group"
          >
            Convert
            <ArrowRight 
              className={`transition-transform duration-300 ${
                isConverting ? "translate-x-2 animate-pulse" : "group-hover:translate-x-2"
              }`}
              size={18}
            />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">
              {mode === "binaryToAssembly" ? "Assembly Output" : "Binary Output"}
            </label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
          <pre 
            className={`w-full h-[300px] p-4 rounded-lg border bg-background/50 backdrop-blur-sm font-mono text-sm overflow-auto whitespace-pre-wrap transition-all duration-300 ${
              isConverting ? "blur-sm animate-pulse" : "animate-fade-in"
            }`}
          >
            {output || `${mode === "binaryToAssembly" ? "Assembly" : "Binary"} code will appear here...`}
          </pre>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>
          {mode === "binaryToAssembly"
            ? "Each 8-bit binary sequence is converted into a corresponding assembly instruction."
            : "Each assembly instruction is converted into its binary representation."}
        </p>
        <p className="mt-4 text-purple-400">Created by Zeeshan</p>
      </div>
    </div>
  );
};

export default Converter;
