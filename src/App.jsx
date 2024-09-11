import Header from "./components/Header"
import ItemList from "./components/ItemList";
import { useState, useEffect } from "react"
import { supabase } from "./client"

function App() {
  const [quizzs, setQuizzs] = useState([]);

  useEffect(() => {
    fetchQuizzs();
  }, [])

  async function fetchQuizzs() {
    const { data } = await supabase
    .from('quizz')
    .select('*')
    setQuizzs(data);
  }

  /*async function createPosts() {
    const { data } = await supabase
    .from('posts')
    .insert([
      { title, content }
    ])
    .single()
    setPosts({ title: "", content: ""});
    fetchPosts();
  }*/

  return (
    <>
      <Header />
      <div className="w-auto h-screen flex justify-center items-center">
        <ItemList
          quizzs={quizzs}
        />
      </div>
    </>
  )
}

export default App
