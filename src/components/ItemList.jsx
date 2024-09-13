import Item from "./Item"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function ItemList( { quizzs, search, optionMode, onQuizzClick, onDeleteClick } ) {

    // Filter for get the quizz from the value of the search bar
    const filteredQuizzs = quizzs.filter((quizz) =>
        quizz.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    /* Display my quizzs name */
    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filteredQuizzs.map((quizz) => (
        <div>
            {!optionMode && (
                <button
                    className="absolute text-xl p-2 rounded font-bold text-white hover:text-red-500"
                    onClick={() => onDeleteClick(quizz.id)}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}
            <div onClick={() => onQuizzClick(quizz)}>
            <Item
                key={quizz.id}
                name={quizz.name}
            />
            </div>
        </div>
        ))}
        {!optionMode && (
            <div className="bg-indigo-500 bg-opacity-25 rounded-lg border-2 text-5xl text-white border-white p-4 h-full flex items-center justify-center cursor-pointer hover:bg-indigo-600">
                {/* Add a new quizz */}
                <button
                    className="hover:text-green-500"
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </div>
        )}
    </div>
    )
  }
  
export default ItemList