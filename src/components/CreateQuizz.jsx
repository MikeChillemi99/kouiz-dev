function CreateQuizz({ onBackClick, onSubmitNewQuizz, onChangeQuizzName }) {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmitNewQuizz();
  };

    return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <button
        className="text-xl p-2 rounded font-bold text-black hover:bg-indigo-600"
        onClick={onBackClick}
      >
        Retour
      </button>
      <h2 className="text-xl font-bold mt-4 mb-4">Créer un nouveau quizz</h2>
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Nom du quizz"
                name="quizzname"
                onChange={onChangeQuizzName}
            />
            <button type="submit">Créer</button>
        </form>
    </div>
  );
}

export default CreateQuizz;
