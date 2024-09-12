import Item from "./Item"

function ItemList( { quizzs, search, onQuizzClick, onDeleteClick } ) {

    // Filter for get the quizz from the value of the search bar
    const filteredQuizzs = quizzs.filter((quizz) =>
        quizz.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    /* Display my quizzs name */
    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filteredQuizzs.map((quizz) => (
        <div>
            <button
                className="absolute text-xl p-2 rounded font-bold text-white hover:text-red-500"
                onClick={() => onDeleteClick(quizz.id)}
            >
            X
            </button>
            <div onClick={() => onQuizzClick(quizz)}>
            <Item
                key={quizz.id}
                name={quizz.name}
            />
            </div>
        </div>
        ))}
    </div>
    )
  }
  
export default ItemList