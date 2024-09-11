import { useState, useEffect } from "react";
import { supabase } from "../client";

function Quizz( { quizzName, quizzQuestions, onBackClick, onDeleteClick } ) {

  const [questionId, setQuestionId] = useState(null);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
      fetchChoices(questionId);
  }, []);

  // Display quizz choices in relation with the selected quizz
  async function fetchChoices(questionId) {
    const { data } = await supabase
    .from('choices')
    .select('*')
    .eq('question_id', questionId)
    setChoices(data);
  }

  return (
    <div className="relative w-6/12 bg-indigo-500 bg-opacity-25 rounded-lg p-6 flex flex-col items-center">
      {/* Back button */}
      <button
        className="absolute top-4 left-4 text-m p-2 rounded font-bold text-white hover:bg-indigo-600"
        onClick={onBackClick}>
        Retour
      </button>
      {/* Quiz name */}
      <h1 className="text-white text-6xl	 mt-8 mb-8">{quizzName}</h1>
      {/* Questions and Choices */}
    </div>
  );
}

export default Quizz;