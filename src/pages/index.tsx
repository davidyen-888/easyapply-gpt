import Footer from "@/components/Footer";
import Head from "next/head";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { getOpenAIAnswer } from "./api/openai";
import convertPdfToText from "@/utils/convertPdfToText";
import Marquee from "react-fast-marquee";

export default function Home({ apiKey }: { apiKey: string }) {
  const [jobTitle, setJobTitle] = useState("Frontend Developer");
  const [showOtherOption, setShowOtherOption] = useState(false);
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("No file selected");
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [tokenNumber, setTokenNumber] = useState(100);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null) {
      return;
    }

    const pdfFile = event.target.files[0];
    setFileName(pdfFile.name);

    try {
      const pdfText = await convertPdfToText(pdfFile);
      setPdfText(pdfText);
    } catch (error) {
      alert("An Error occured. Please try uploading the PDF again.");
      console.error(error);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleGenerateAnswer = async () => {
    setLoading(true);
    try {
      const dataReply = await getOpenAIAnswer(
        `I am applying for the ${jobTitle} position at ${company}. My resume content is ${pdfText}. The job description is: ${jobDescription}. Answer the question :${prompt} for me with around ${tokenNumber} characters.`,
        tokenNumber,
        0.6
      );
      setReply(dataReply);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGenerateAnswer();
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
      <main>
        {/* Title */}
        <div className="flex flex-col items-center justify-center my-2">
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
        <h1 className="text-center text-gray-500 mb-2 mx-8 md:text-xl">
          Get customized answer for the job application question!
        </h1>
        <Marquee
          gradient={true}
          speed={30}
          pauseOnHover={true}
          gradientColor={[248, 251, 253]}
          gradientWidth={300}
        >
          <span style={{ marginRight: "30px" }}>
            Why are you interested in this position?
          </span>
          <span style={{ marginRight: "30px" }}>
            Why are you the best candidate for the position?
          </span>
          <span style={{ marginRight: "30px" }}>
            What are your career goals and how does this position fit into them?
          </span>
          <span style={{ marginRight: "30px" }}>
            Generate the cover letter for me!
          </span>
          <span style={{ marginRight: "30px" }}>
            What are your strengths and weaknesses?
          </span>
        </Marquee>

        <div className="mx-auto flex md:flex-row flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-8 mb-4 md:w-full w-auto"
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 lg:w-5/12">
                <label
                  htmlFor="jobTitle"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Title:
                </label>
                <select
                  id="jobTitle"
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    setShowOtherOption(e.target.value === "Other");
                  }}
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">
                    Fullstack Developer
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="UI Engineer">UI Engineer</option>
                  <option value="UX Engineer">UX Engineer</option>
                  <option value="IT Engineer">IT Engineer</option>
                  <option value="Other">Other</option>
                </select>
                {showOtherOption && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="otherJobTitle"
                      placeholder="Please specify your job title"
                      className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4 lg:w-6/12">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 h-18 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              {/* File input to upload resume, the text in the pdf will be parsed into text */}
              <div className="mb-4">
                <label
                  htmlFor="resume"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Resume(PDF only)
                </label>
                <div className="relative border rounded-md shadow-sm h-10">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="resume"
                    onChange={handleFileUpload}
                  />
                  <div className="py-2 px-3">
                    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                      <AiFillFileAdd className="text-gray-400" size={24} />
                      <span className="text-gray-600">
                        {fileName ? fileName : "Select a file"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tokenNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Characters:
                </label>
                <select
                  id="tokenNumber"
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  onChange={(e) => setTokenNumber(parseInt(e.target.value))}
                  value={tokenNumber}
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                </select>
              </div>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 h-18 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              {/* if loading, spinner else show reply  */}
              {loading ? (
                // spinner
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <textarea
                  readOnly
                  placeholder="Your answer will appear here"
                  id="reply"
                  className="shadow appearance-none border rounded w-full h-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reply}
                />
              )}
              <div className="flex justify-start content-center mt-4">
                {reply && (
                  <button
                    className="cursor-pointer focus:outline-none"
                    onClick={handleCopy}
                  >
                    <MdContentCopy size={24} color="#4A5568" />
                  </button>
                )}
                {copied && <p className="text-gray-500">Copied!</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
