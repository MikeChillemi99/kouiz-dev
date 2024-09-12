function Item( { name } ) {
    return (
    <div className="bg-indigo-500 bg-opacity-25 rounded-lg border-2 border-white p-8 h-full flex items-center justify-center cursor-pointer hover:bg-indigo-600">
        {/* Quizz name */}
        <h1 className="text-white text-3xl">{name}</h1>
    </div>
    )
  }
  
export default Item
  