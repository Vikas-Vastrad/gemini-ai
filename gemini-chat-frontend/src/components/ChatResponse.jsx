const ChatResponse = ({ response }) => {
    if (!response) {
        return null;
    }

    const { candidates } = response;

    return (
        <div className="container my-4">
            <h3>Response</h3>
            {candidates.map((candidate, index) => {
                const formattedText = candidate.content.parts[0].text
                    .replace(/\b([A-Z][a-z]+(?: [A-Z][a-z]+)*):\b/g, "<strong style='display: block; font-size: 1.2em; font-weight: bold;margin-bottom: 8px;'>$1:</strong>") 
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*/g, "") 
                    .replace(/\n/g, "<span style='display: block; margin-bottom: 4px;'></span>");;

                return (
                    <div className="card mb-3 text-left py-3 px-3 lh-lg" key={index}>
                        <div className="body">
                            <p className="text" dangerouslySetInnerHTML={{ __html: formattedText }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatResponse;
