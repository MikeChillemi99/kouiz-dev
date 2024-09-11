import Header from "./components/Header"
import ItemList from "./components/ItemList";
import Quizz from "./components/Quizz";
import { useState, useEffect } from "react"
import { supabase } from "./client"

function App() {
  const [quizzs, setQuizzs] = useState([]);
  const [search, setSearch] = useState("");
  const [isInQuizz, setisInQuizz] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState([]);
  const [quizzQuestions, setQuizzQuestions] = useState([]);

  // Fetch quizzs
  useEffect(() => {
    fetchQuizzs();
  }, [])

  // Display all quizzs name
  async function fetchQuizzs() {
    const { data } = await supabase
    .from('quizz')
    .select('*')
    setQuizzs(data);
  }

  // Display quizz questions in relation with the selected quizz
  async function fetchSelectQuizz(selectedQuizzId) {
    const { data } = await supabase
    .from('questions')
    .select('*')
    .eq('quizz_id', selectedQuizzId)
    setQuizzQuestions(data);
  }

  // Delete quizz with id
  async function deleteSelectQuizz(selectedQuizzId) {
    const { data, error } = await supabase
    .from('quizz')
    .delete()
    .eq('id', selectedQuizzId)
    fetchQuizzs();

    if(error){
      console.log(error)
    }

    if(data){
      console.log(data)
    }
  }

  const handleQuizzClick = (quizz) => {
    setSelectedQuizz(quizz);
    setisInQuizz(true)
    fetchSelectQuizz(quizz.id)
  };

  const handleQuizzBack = () => {
    setisInQuizz(false)
  };

  const handleDeleteQuizz = (selectedQuizzId) => {
    console.log("id a del : " + selectedQuizzId)
    let answer = window.confirm("Voulez-vous supprimer ce quizz ?");
    if (answer) {
      deleteSelectQuizz(selectedQuizzId);
    }
    else
    {
      return;
    }
  };

  return (
    <>
      <Header
        onSearch={setSearch}
      />
      <div className="w-auto h-screen flex justify-center items-start m-48">
      {isInQuizz ? (
        <Quizz
          quizzName={selectedQuizz.name}
          quizzQuestions={quizzQuestions}
          onBackClick={handleQuizzBack}
        />
      ) : (
        <ItemList
          quizzs={quizzs}
          search={search}
          onQuizzClick={handleQuizzClick}
          onDeleteClick={handleDeleteQuizz}
        />
      )}
      </div>
    </>
  )
}

export default App
