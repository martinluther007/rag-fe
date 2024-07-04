import { KeyboardEventHandler, useState } from "react";
import axios from "axios";

import "./App.css";
import { ClipLoader } from "react-spinners";
import DocumentInput from "./components/DocumentInput";

interface IResultObject {
  question?: string;
  answer?: string;
}
const BASE_URL = import.meta.env.VITE_API_URL;
function App() {
  const [promptValue, setPromptValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUploadIsloading, setFileUploadIsLoading] =
    useState<boolean>(false);
  const [result, setResult] = useState<IResultObject[]>([]);
  const [file, setFile] = useState("");

  const handleSubmit = async (event: any | KeyboardEventHandler) => {
    if (!promptValue) return;
    if (event.key !== "Enter") return;

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/get-related-data`, {
        query: promptValue,
      });

      const resultObject: IResultObject = {
        question: promptValue,
        answer: data.data,
      };

      setResult((prev) => [...prev, resultObject]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFile = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("document", file);

    try {
      setFileUploadIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/upload-file`, form);

      alert(data.message);
      setFile("");
    } catch (error) {
    } finally {
      setFileUploadIsLoading(false);
    }
  };
  return (
    <main className=" z-[-2] h-screen w-screen p-4 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className=" flex  w-full items-center  h-full flex-col">
        {result.map((el) => (
          <div className="mt-10">
            <div className="overflow-y-scroll rounded-xl text-white p-4 bg-[#555] shadow-lg max-w-[500px]">
              <span className="font-bold text-sm uppercase">prompt:</span>{" "}
              {el.question}
            </div>
            <div className=" mt-5">
              <div className="bg-[#f5f5f5c4] p-3 text-[black]">
                <p className="font-bold text-sm uppercase">result</p>
              </div>
              <div className=" bg-black text-white max-w-[700px] p-3">
                {el.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 w-full flex justify-center">
        {loading ? (
          <ClipLoader color="#fff" />
        ) : (
          <div className="flex flex-col gap-5">
            <input
              onKeyDown={(e) => handleSubmit(e)}
              onChange={(e) => setPromptValue(e.target.value)}
              className="border bg-white text-black rounded-xl py-2 px-5 min-w-[500px] focus:outline-none focus:border-2 focus:border-sky-700"
              placeholder="message prompt"
            />
            <DocumentInput
              label="Upload a txt file to improve prompt response"
              value={file}
              onChange={setFile}
              accept=".txt"
            />

            <button
              disabled={!file || fileUploadIsloading}
              onClick={handleSubmitFile}
              className="text-white disabled:cursor-not-allowed rounded-xl capitalize"
            >
              {fileUploadIsloading ? (
                <ClipLoader color="#fff" />
              ) : (
                `submit File`
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
