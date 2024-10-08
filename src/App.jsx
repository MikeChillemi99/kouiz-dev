import Header from "./components/Header"
import ItemList from "./components/ItemList";
import Quizz from "./components/Quizz";
import CreateQuizz from "./components/CreateQuizz";
import { useState, useEffect } from "react"
import { supabase } from "./client"

function App() {
  const [quizzs, setQuizzs] = useState([]);
  const [search, setSearch] = useState("");
  const [isInQuizz, setisInQuizz] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState([]);
  const [quizzQuestions, setQuizzQuestions] = useState([]);
  const [optionMode, setOptionMode] = useState(false);

  const [isInCreate, setIsInCreate] = useState(false);
  const [quizz, setQuizz] = useState({
    quizzname:''
  })

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

  // Create a new quizz
  async function createQuizz() {
    await supabase
    .from('quizz')
    .insert({name: quizz.quizzname })
    console.log("Quizz created")
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

  const handleQuizzName = (event) => {
    setQuizz((prevFormData) => ({
      ...prevFormData,
      quizzname: event.target.value
    }));
  };

  const handleQuizzClick = (quizz) => {
    setSelectedQuizz(quizz);
    setisInQuizz(true)
    fetchSelectQuizz(quizz.id)
  };

  // Go back from a quizz
  const handleQuizzBack = () => {
    setisInQuizz(false);
    setIsInCreate(false);
  };

  const handleToggleOptionMode = () => {
    setOptionMode(!optionMode);
  };
  
  // Delete a quizz with confirm
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

  const handleCreateMode = () => {
    setIsInCreate(true);
  }

  return (
    <>
      <Header
        onSearch={setSearch}
        optionMode={optionMode}
        onToggleOptionMode={handleToggleOptionMode}
      />
      <div className="w-auto flex justify-center items-start m-48">
        {isInCreate ? (
          <CreateQuizz
            onBackClick={handleQuizzBack} 
            onSubmitNewQuizz={createQuizz}   
            onChangeQuizzName={handleQuizzName} 
          />
        ) : isInQuizz ? (
          <Quizz
            quizzName={selectedQuizz.name}
            quizzQuestions={quizzQuestions}
            onBackClick={handleQuizzBack}
          />
        ) : (
          <ItemList
            quizzs={quizzs}
            search={search}
            optionMode={optionMode}
            onQuizzClick={handleQuizzClick}
            onDeleteClick={handleDeleteQuizz}
            onClickCreateMode={handleCreateMode}
          />
        )}
      </div>
    </>
  )
}

export default App
