import { useState, useEffect } from "react";
import { supabase } from "../client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Quizz( { quizzName, quizzQuestions, onBackClick } ) {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choicesByQuestionId, setChoicesByQuestionId] = useState({});
  const [score, setScore] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);

  useEffect(() => {
    const currentQuestion = quizzQuestions[currentQuestionIndex];
    if (currentQuestion) {
      fetchChoices(currentQuestion.id);
    }
  }, [currentQuestionIndex, quizzQuestions]);

  // Display quizz choices in relation with the selected quizz
  async function fetchChoices(questionId) {
    const { data } = await supabase
    .from('choices')
    .select('*')
    .eq('question_id', questionId)
    setChoicesByQuestionId((prevState) => ({
      ...prevState,
      [questionId]: data,
    }));
  }

  // Function to go to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle score submission
  const handleSeeScore = () => {
    console.log("See My Score button clicked"+score);
  };
  // Check if the answer is correct
  const checkAnswer = (value, id) => {
    setSelectedChoiceId(id);
    if (value === true) {
      setScore(score + 1);
    }
    else {
      setScore(score);
    }
  }
 
  const currentQuestion = quizzQuestions[currentQuestionIndex];
  const choices = choicesByQuestionId[currentQuestion?.id] || [];


  return (
    <div className="w-6/12 bg-indigo-500 bg-opacity-25 rounded-lg p-6 flex flex-col items-center">
      {/* Back button */}
      <div className="flex justify-between w-full">
        <button
          className="text-m p-2 rounded font-bold text-white hover:bg-indigo-600"
          onClick={onBackClick}
        >
          Retour
        </button>
        <div
          className="text-m p-2 rounded font-bold text-white"
          onClick={onBackClick}
        >
          {currentQuestionIndex + 1}/{quizzQuestions.length}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
      {quizzQuestions.length > 0 && quizzQuestions[currentQuestionIndex] ? (
        <>
        {/* Quiz name */}
          <h1 className="text-white text-6xl mt-8 mb-8">{quizzName}</h1>
        {/* Questions and Choices */}
          <h1 className="text-white text-3xl mt-4 mb-4">{quizzQuestions[currentQuestionIndex].question_text}</h1>
          <div className="mt-2 mb-4">
            <ul>
              {choices.length > 0 ? (
                choices.map((choice) => (
                  <li
                    key={choice.id}
                    className={`text-white text-lg rounded p-2 mt-2 cursor-pointer ${
                      selectedChoiceId === choice.id ? 'bg-yellow-400' : 'bg-indigo-400'
                    }`}
                    onClick={() => checkAnswer(choice.is_correct, choice.id)}
                  >
                    {choice.choice_text}
                  </li>
                ))
              ) : (
                <p className="text-white">Loading choices...</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-white">Chargement ...</p>
      )}
      </div>
      <div className="mt-4 flex  w-full">
      {/* Right Arrow for next question */}
        {currentQuestionIndex !== quizzQuestions.length -1 && (
          <button
            className="text-white bg-blue-500 p-2 pl-4 pr-4 rounded-lg hover:bg-blue-600"
            onClick={handleNextQuestion}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
        {/* See My Score button on the last question */}
        {currentQuestionIndex === quizzQuestions.length - 1 && (
          <button
            className="text-white bg-green-500 p-2 pl-4 pr-4 rounded-lg hover:bg-green-600 mt-4"
            onClick={handleSeeScore}
          >
            See My Score
          </button>
        )}
      </div>
    </div>
  );
}

export default Quizz;