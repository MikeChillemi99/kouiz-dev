import Item from "./Item"
function ItemList( { quizzs } ) {
    return (
      <div className="w-2/4 h-4/6 bg-red-50">
        {quizzs.map((quizz) =>
            <Item 
                name={quizz.name}
            />
        )}
      </div>
    )
  }
  
export default ItemList