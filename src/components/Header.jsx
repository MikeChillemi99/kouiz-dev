import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTimes  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header({ onSearch, optionMode, onToggleOptionMode}) {

    const handleChangeOptionMode = () => {
      onToggleOptionMode();
    };

    return (
      <div className="w-auto h-20 flex justify-around items-center">
        {/* Title */}
        <div>
          <h1 className="text-4xl p-6 font-bold text-white">
            <a href="./">Kouiz</a>
          </h1>
        </div>
        {/* Search bar */}
        <div className='w-auto flex flex-row justify-between items-center'>
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
        {/* Admin mode, to delete, create */}
        <div className="flex flex-row justify-center items-center cursor-pointer text-2xl text-white hover:text-indigo-200">
          {!optionMode ? (
            <h1>Mode modification</h1>
          ) : (
            <h1>Mode quizz</h1>
          )}
          <button
              className='ml-2'
              onClick={handleChangeOptionMode}
          >
            <FontAwesomeIcon icon={!optionMode ? faTimes : faGear} />
          </button>
        </div>
      </div>
    )
  }
  
  export default Header
  