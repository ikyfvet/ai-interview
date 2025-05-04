export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 px-3 py-2 rounded w-full"
      {...props}
    />
  );
}