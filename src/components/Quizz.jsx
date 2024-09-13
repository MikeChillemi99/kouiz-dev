import { useState, useEffect } from "react";
import { supabase } from "../client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Quizz( { quizzName, quizzQuestions, onBackClick } ) {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choicesByQuestionId, setChoicesByQuestionId] = useState({});
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [previouslyCorrect, setPreviouslyCorrect] = useState(false);

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
      setSelectedChoiceId(null);
      setPreviouslyCorrect(false);
    }
  };

  // Function for score submission and end
  const handleSeeScore = () => {
    setEnd(true);
  };

  // Check if the answer is correct
  const checkAnswer = (isCorrect, choiceId) => {
    if (selectedChoiceId === choiceId) {
      return;
    }

    if (selectedChoiceId !== null) {
      if (previouslyCorrect) {
        setScore(score - 1);
      }
    }

    if (isCorrect) {
      setScore(score + 1); 
    }

    setSelectedChoiceId(choiceId); 
    setPreviouslyCorrect(isCorrect);
  };
 
  const currentQuestion = quizzQuestions[currentQuestionIndex];
  const choices = choicesByQuestionId[currentQuestion?.id] || [];


  return (
    <div className="w-7/12 bg-indigo-500 bg-opacity-25 rounded-lg p-6 flex flex-col items-center">
      {/* Back button */}
      <div className="flex justify-between w-full">
        <button
          className="text-xl p-2 rounded font-bold text-white hover:bg-indigo-600"
          onClick={onBackClick}
        >
          Retour
        </button>
        {!end && (
          <div
            className="text-xl p-2 rounded font-bold text-white"
            onClick={onBackClick}
          >
            {currentQuestionIndex + 1}/{quizzQuestions.length}
          </div>
        )}
      </div>
      {/* Quiz name */}
      <h1 className="text-white text-6xl mt-8 mb-8">{quizzName}</h1>
      {!end && (
      <div className="w-full flex flex-col justify-center items-center">
      {quizzQuestions.length > 0 && quizzQuestions[currentQuestionIndex] ? (
        <>
          {/* Questions and Choices */}
          <h1 className="text-white text-3xl mt-4 mb-4">{quizzQuestions[currentQuestionIndex].question_text}</h1>
          <div className="mt-2 mb-4">
            <ul>
              {choices.length > 0 ? (
                choices.map((choice) => (
                  <li
                    key={choice.id}
                    className={`text-white text-lg rounded p-2 mt-2 cursor-pointer ${
                      selectedChoiceId === choice.id ? 'bg-cyan-500' : 'bg-indigo-400'
                    }`}
                    onClick={() => checkAnswer(choice.is_correct, choice.id)}
                  >
                    {choice.choice_text}
                  </li>
                ))
              ) : (
                <p className="text-white">Chargement...</p>
              )}
            </ul>
          </div>
        </>
        ) : (
          <p className="text-white">Chargement...</p>
        )}
      </div>
      )}
      {end && (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl mt-4 mb-4">Votre score :</h1>
            <h1 className="text-white text-3xl mt-4 mb-4">{score} / {quizzQuestions.length}</h1>
        </div>
      )}
      <div className="mt-4 flex w-full justify-center items-center">
      {/* Right Arrow for next question */}
        {currentQuestionIndex !== quizzQuestions.length -1 && selectedChoiceId && (
          <button
            className="text-white bg-blue-500 p-2 pl-4 pr-4 rounded-lg hover:bg-blue-600"
            onClick={handleNextQuestion}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
        {/* See My Score button on the last question */}
        {currentQuestionIndex === quizzQuestions.length - 1 && selectedChoiceId && !end && (
          <button
            className="text-white bg-green-500 p-2 pl-4 pr-4 rounded-lg hover:bg-green-600 mt-4"
            onClick={handleSeeScore}
          >
            Score
          </button>
        )}
      </div>
    </div>
  );
}

export default Quizz;