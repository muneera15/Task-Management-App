export const InputBox = ({ label, placeholder, onChange, type }) => {
  return (
    <div>
      <div className=" font-bold text-purple-700  mt-6 text-lg my-2 text-left">
        {label}
      </div>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full px-2 py-1 border border-cyan-500 rounded"
      />
    </div>
  );
};
