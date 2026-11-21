const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

const base64ToFile = async (
  base64: string,
  name: string,
  type: string,
): Promise<File> => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], name, { type });
};

export { fileToBase64, base64ToFile };
