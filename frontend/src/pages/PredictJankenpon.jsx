import { useId, useState } from "react"
import http from "../utils/api"

export default function PredictJankenpon() {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const fileId = useId()
  const [imageUrl, setImageUrl] = useState("https://i.redd.it/monkey-thinking-v0-j08u39bvfxrf1.jpg?width=720&format=pjpg&auto=webp&s=3bf78f791de99982d71ad0df0c7d4ac6b17b54cd")
  const  [result, setResult] = useState({
    prediction : "",
    probability : ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleFormChange = (e)=>{
    const selectedFile = (e.target.files[0])
    setFile(selectedFile)
    if(selectedFile){
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleFormSubmit =async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    try{
      setIsLoading(true)
      const response = await http.post("/predict-jankenpon", formData)
      console.log(response.data.data.prediction)
      setResult({
        prediction : response.data.data.prediction,
        probability : response.data.data.probability
      })
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-base-200 rounded-2xl p-6 lg:p-8 shadow-xl border border-base-300">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Demo Machine Learning
              </h2>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content leading-tight">
                Prediksi Jankenpon
              </h1>
              <p className="text-base-content/60 mt-3">
                Upload gambar tangan Anda untuk prediksi
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor={fileId} className="label">
                  <span className="label-text font-medium text-base">Upload Gambar</span>
                </label>
                <input
                  onChange={handleFormChange}
                  name="file"
                  id={fileId}
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full"
                />
              </div>

              {preview && (
                <div className="rounded-xl overflow-hidden border-2 border-base-300 bg-base-100">
                  <img
                    className="w-full h-64 object-cover"
                    src={preview}
                    alt="Preview"
                  />
                </div>
              )}

              <button
                className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-xl transition-all"
                onClick={handleFormSubmit}
                disabled={!preview}
              >
                🎯 Prediksi Sekarang
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-base-200 to-base-300 rounded-2xl p-6 lg:p-8 shadow-xl border border-base-300 flex flex-col">
            <h2 className="text-xl font-bold text-base-content mb-4">
              Hasil Prediksi
            </h2>
            <div className="flex-1 flex items-center justify-center bg-base-100 rounded-xl border-2 border-dashed border-base-300 p-8">
              {result ? (
                <div className="text-center">
                  <img
                    className="max-h-96 w-auto mx-auto rounded-lg shadow-lg"
                    src={imageUrl}
                    alt="Prediction result"
                  />
                  <div className="mt-6">
                    <div className="badge badge-primary badge-lg">Prediksi Lengkap</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-base-content/40">
                  <svg
                    className="w-24 h-24 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg">{result.probability} {result.prediction}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
