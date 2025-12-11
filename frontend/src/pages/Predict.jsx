import { useId, useState } from "react"
import PredictForm from "./PredictForm"
export default function Predict() {
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState()
  const [imageUrl, setImageUrl] = useState("https://i.redd.it/monkey-thinking-v0-j08u39bvfxrf1.jpg?width=720&format=pjpg&auto=webp&s=3bf78f791de99982d71ad0df0c7d4ac6b17b54cd")

  return (
    <div className="p-8 h-screen">
      <div className="flex gap-5 items-stretch h-full">
        <div className="p-4 bg-base-200 h-fit rounded-2xl">
          <h2 className="text-lg text-primary font-semibold mb-2 uppercase tracking-wide">
            Demo Machine Learning
          </h2>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-base-content mb-4 leading-tight">
            Prediksi Diabetes
          </h1>
          <p className="text-base-content/70 text-lg">
            Buat monyet ini berpikir .🐒
          </p>
          {result && <div role="alert" className="mt-2 alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <span>{result}</span>
          </div>}
          <PredictForm isLoading={isLoading} setImageUrl={setImageUrl} setIsLoading={setIsLoading} setResult={setResult}/>
        </div>

        <div>
          <img className="h-2/3 w-auto" src={imageUrl} alt="" />
        </div>
      </div>
    </div>
  );

}

