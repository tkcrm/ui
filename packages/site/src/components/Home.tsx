const Home: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Under development</span>
      </h1>
      <p
        className="mx-auto mt-3 max-w-md text-base text-gray-500
      sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
      >
        todo
      </p>
      <div className="mt-5 md:mt-10">
        <a
          href="/"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600
                py-3 px-8 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:ring-offset-2 md:py-4 md:px-10 md:text-lg"
        >
          reload
        </a>
      </div>
    </div>
  );
};

export default Home;
