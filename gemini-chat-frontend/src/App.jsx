import { useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api'

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try{
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert('Failed to get response');
    } finally {
      setLoading(false);
  }
}

  return (
    <>
      <div className='App'>
        <header className='bg-primary text-white text-center py-4'>
          <h1>Gemini Q & A Bot</h1>
        </header>
        <ChatInput onSubmit={handleQuestionSubmit}/>
        { loading && <h3>Generating your answer...</h3> }
        <ChatResponse response={response} />
      </div>
    </>
  )
}

export default App
