import Head from "next/head";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export async function getStaticProps() {
  const apiKey = process.env.OPENAI_API_KEY;
  return {
    props: {
      apiKey,
    },
  };
}

export default function Home({ apiKey }: { apiKey: string }) {
  const [jobTitle, setJobTitle] = useState("Frontend Developer");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getAnswer = () => {
    // Call OpenAI API
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `I am applying for the ${jobTitle} position at ${company}. Answer the question :${prompt} for me within 100 characters. The job description is: ${jobDescription}.`,
        max_tokens: 100,
        temperature: 0.6,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let dataReply = data.choices[0].text;
        setReply(dataReply);
        console.log(dataReply);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getAnswer();
  };

  return (
    <>
      <Head>
        <title>Easy Apply GPT</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A simple tool to generate your answer for the job application question"
        />
        <meta
          name="keywords"
          content="job application, job application question, job application answer, job application question answer, job application question generator, job application answer generator, job application question and answer, job application question and answer generator, job application question and answergenerator"
        />
        <meta name="author" content="Sung-Yan(David) Hsieh" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <div className="mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center justify-center my-6">
          <h1 className="text-center font-black md:flex-row lg:tracking-tight text-2xl xl:text-4xl">
            <span
              className="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]"
              data-text="Easy"
            >
              <span className="animate-gradient-1 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Easy{" "}
              </span>{" "}
            </span>

            <span
              className="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]"
              data-text="Apply"
            >
              <span className="animate-gradient-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {" "}
                Apply{" "}
              </span>{" "}
            </span>

            <span
              className="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]"
              data-text="GPT"
            >
              <span className="animate-gradient-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
                GPT
              </span>{" "}
            </span>
          </h1>
        </div>
        <h3 className="text-center text-gray-500 text-sm md:text-base mb-2 mx-8">
          You can use this tool to generate your answer for the job application
          question such as "Why are you interested in this position?" or "Why
          should we hire you?" etc.
        </h3>
        <div className="mx-auto flex md:flex-row flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-8 mb-4 md:w-full w-auto"
          >
            <div className="mb-4">
              <label
                htmlFor="jobTitle"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Title:
              </label>
              <select
                id="jobTitle"
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                onChange={(e) => setJobTitle(e.target.value)}
              >
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="UI Engineer">UI Engineer</option>
                <option value="UX Engineer">UX Engineer</option>
                <option value="IT Engineer">IT Engineer</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company:
              </label>
              <input
                type="text"
                id="company"
                placeholder="Company Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jobDescription"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Description:
              </label>
              <textarea
                id="jobDescription"
                placeholder="Job Description"
                className="shadow appearance-none border rounded w-full py-2 px-3 h-48 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="prompt"
                className="block text-gray-700 font-bold mb-2"
              >
                Prompt
              </label>
              <textarea
                id="prompt"
                placeholder="What interests you about this role?"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Generate the answer
              </button>
            </div>
          </form>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-8 md:w-full w-auto relative">
            <div className="mb-4">
              <label
                htmlFor="reply"
                className="block text-gray-700 font-bold mb-2"
              >
                Your answer
              </label>
              <p
                id="reply"
                className="shadow appearance-none border rounded w-full h-96 px-3 py-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {reply}
              </p>
              {reply && (
                <button
                  className="absolute right-0 top-0 mr-10 mt-16 cursor-pointer focus:outline-none"
                  onClick={handleCopy}
                >
                  <MdContentCopy size={24} color="#4A5568" />
                </button>
              )}
              {copied && <p className="text-green-500 text-xs mt-1">Copied!</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
