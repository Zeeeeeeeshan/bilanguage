
export const binaryToAssembly = (binary: string): string => {
  // Remove spaces and validate binary input
  const cleanBinary = binary.replace(/\s/g, "");
  if (!/^[01]+$/.test(cleanBinary)) {
    throw new Error("Invalid binary input. Please use only 0s and 1s.");
  }

  // Parse binary into 8-bit chunks
  const chunks = cleanBinary.match(/.{1,8}/g) || [];
  let assembly = "";

  chunks.forEach((chunk, index) => {
    const decimal = parseInt(chunk, 2);
    
    // Basic instruction set example
    switch (decimal) {
      case 0:
        assembly += "NOP\n";
        break;
      case 1:
        assembly += "ADD\n";
        break;
      case 2:
        assembly += "SUB\n";
        break;
      case 3:
        assembly += "MUL\n";
        break;
      case 4:
        assembly += "DIV\n";
        break;
      case 5:
        assembly += "PUSH\n";
        break;
      case 6:
        assembly += "POP\n";
        break;
      case 7:
        assembly += "JMP\n";
        break;
      default:
        assembly += `MOV ${decimal}\n`;
    }
  });

  return assembly.trim();
};
