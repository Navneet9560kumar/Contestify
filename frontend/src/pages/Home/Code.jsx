import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Split from "react-split";
import { ArrowLeft, User, RefreshCw, Play, Upload } from "lucide-react";
import Editor from "@monaco-editor/react";
import problems from "../../../../backend/utils/problems";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
];

const Code = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("// Write your code here");
  const [selectedLang, setSelectedLang] = useState("java");
  const [randomProblems, setRandomProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  const getRandomProblems = () => {
    let shuffled = [...problems].sort(() => 0.5 - Math.random());
    setRandomProblems(shuffled.slice(0, 4));
  };

  useEffect(() => {
    getRandomProblems();
  }, []);

  return (
    <>
      <div className="bg-[#131313] text-white min-h-screen py-3 px-3">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111111]">
          <div className="flex items-center gap-3">
            <button
              className="text-white px-3 py-2 rounded-md font-semibold shadow-md hover:bg-gray-800 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={20} />
            </button>
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setSidebar(!sidebar)}
            >
              Problems
            </h1>
          </div>

          <div className="flex gap-2">
            <button className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 transition flex items-center gap-2">
              <Play size={20} /> Run
            </button>
            <button className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 transition flex items-center gap-2">
              <Upload size={20} /> Submit
            </button>
            <button
              className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 transition flex items-center gap-2"
              onClick={() => setCode("// Write your code here")}
            >
              <RefreshCw size={20} /> Refresh
            </button>
          </div>

          <div className="cursor-pointer hover:text-gray-400">
            <User size={24} />
          </div>
        </div>

        {/* Main Split Layout */}
        <Split
          className="flex h-[calc(100vh-60px)]"
          sizes={[40, 60]}
          minSize={300}
          gutterSize={8}
          cursor="col-resize"
        >
          {sidebar == true ? (
            <div className="w-1/3 z-50 h-[100%] text-white top-0 left-0 bg-[#262626] px-5">
              <h2 className="text-2xl font-semibold mb-2 py-5 ">Select a Problem</h2>
              {randomProblems.map((prob) => (
                <p
                  key={prob.id}
                  className="cursor-pointer hover:rounded-md  hover:text-black py-1 text-lg hover:p-1 hover:bg-gray-400"
                  onClick={() => {
                    setSelectedProblem(prob);
                    setSidebar(false);
                  }}
                >
                  {prob.title}
                </p>
              ))}
            </div>
          ) : (
            <div className="bg-[#262626] p-4 overflow-auto">
              {selectedProblem && (
                <div className="mt-4 text-lg">
                  <h1 className="text-3xl font-bold mb-3">
                    {selectedProblem.title}
                  </h1>
                  <button className="text-yellow-600 bg-[#E5E1A8] bg-opacity-15 rounded-md px-2 ">
                    {selectedProblem.difficulty}
                  </button>
                  <p>{selectedProblem.description}</p>
                  <p>
                    <b>Example:</b> <br />
                    <b>Input:</b> {selectedProblem.example.input} <br />
                    <b>Output:</b> {selectedProblem.example.output} <br />
                    <b>Explanation:</b>{" "}
                    <span className="text-gray-300">
                      {selectedProblem.example.explanation}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Right Panel (Code Editor) */}
          <Split
            className="flex flex-col w-full h-full"
            sizes={[75, 25]}
            minSize={50}
            gutterSize={8}
            cursor="row-resize"
            direction="vertical"
          >
            <div className="flex flex-col bg-[#1e1e1e] h-full">
              <div className="w-full">
                <select
                  className="bg-[#262626] text-white px-4 py-2 rounded-md outline-none cursor-pointer"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <Editor
                height="100%"
                defaultLanguage={selectedLang}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
              />
            </div>

            {/* Test Cases Section */}
            <div className="bg-[#262626] min-h-[100px] p-4 overflow-auto">
              <h2 className="text-lg font-semibold">Test Cases</h2>
              <p className="text-gray-300">Write your test cases here...</p>
            </div>
          </Split>
        </Split>
      </div>
    </>
  );
};

export default Code;
