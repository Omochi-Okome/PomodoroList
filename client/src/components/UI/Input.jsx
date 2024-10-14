export default function Input({ inputValue, handleInputChange }) {
  return (
    <input
      className="h-10 w-96 pl-5 rounded-full"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="What do you need to accomplish today?"
    />
  );
}
