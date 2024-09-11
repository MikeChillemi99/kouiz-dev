import { useState } from "react"

function Header() {

    const [search, setSearch] = useState("")

    return (
      <div className="w-auto h-20 flex justify-around items-center">
        {/* Title */}
        <div>
          <h1 className="text-4xl p-6 font-bold text-white">Kouiz</h1>
        </div>
        {/* Search bar */}
        <div>
          <input className="p-2 pl-2 pr-2 rounded-xl" type="text" placeholder="Chercher un quizz" onChange={(e) => {
            setSearch(e.target.value);
            console.log("search" + search);
          }} />
        </div>
      </div>
    )
  }
  
  export default Header
  