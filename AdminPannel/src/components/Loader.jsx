 const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow flex flex-col items-center">
        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin mb-2"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
