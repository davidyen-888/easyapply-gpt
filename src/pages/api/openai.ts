const apikey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;


const getOpenAIAnswer = async (
    prompt: string,
    maxTokens?: number,
    temperature?: number
  ) => {    
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
      }),
    });
  
    const data = await response.json();
  
    let dataReply = data.choices[0].text;
  
    return dataReply;
  };
  
  export { getOpenAIAnswer };
  