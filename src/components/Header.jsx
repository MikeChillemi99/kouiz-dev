function Header({ onSearch }) {

    return (
      <div className="w-auto h-20 flex justify-around items-center">
        {/* Title */}
        <div>
          <h1 className="text-4xl p-6 font-bold text-white">Kouiz</h1>
        </div>
        {/* Search bar */}
        <div>
          <input
              className="p-2 pl-2 pr-2 rounded-xl"
              type="text"
              placeholder="Chercher un quizz"
              onChange={(e) => {
                // Get the value of my search bar and pass it to my Parent component
                onSearch(e.target.value);
              }}
          />
        </div>
      </div>
    )
  }
  
  export default Header
  