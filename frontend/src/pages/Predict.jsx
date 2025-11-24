import { useId, useState } from "react"
import http from "../api/api"

export default function Predict() {
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState()
  const [imageUrl, setImageUrl] = useState("https://i.redd.it/monkey-thinking-v0-j08u39bvfxrf1.jpg?width=720&format=pjpg&auto=webp&s=3bf78f791de99982d71ad0df0c7d4ac6b17b54cd")
  const [form, setForm] = useState({
    Pregnancies: 1,
    Glucose: 1,
    BloodPressure: 1,
    SkinThickness: 1,
    Insulin: 1,
    BMI: 1,
    DiabetesPedigreeFunction: 1,
    Age: 1
  })

  const pregnanciesId = useId()
  const glucoseId = useId()
  const bloodPressureId = useId()
  const skinThicknessId = useId()
  const insulinId = useId()
  const bmiId = useId()
  const diabetesPedigreeFunctionId = useId()
  const ageId = useId()


  const handleFormChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPQxNgXF3NtnUSRKGOJILZrRxmmBkMELf0Pw&s")

      const value = await http.post("/predict", form)
      console.log(value)
      setResult(value.data.data)

      setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxQmDvJ34t-R21DHOI050z11CLnkvmLf44A&s")
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      
    }
  }


  return (
    <div className="p-8 h-screen">
      <div className="flex flex-auto gap-5 items-stretch h-full">
        <div className="p-4 bg-base-200 h-fit rounded-2xl">
          <h2 className="text-lg text-primary font-semibold mb-2 uppercase tracking-wide">
            Demo Machine Learning
          </h2>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-base-content mb-4 leading-tight">
            Prediksi Diabetes
          </h1>
          <p className="text-base-content/70 text-lg">
            Buat monyet ini berpikir 🐒
          </p>
          {result && <div role="alert" class="mt-2 alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{result}</span>
          </div>}
          <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Pregnancies</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={pregnanciesId}
                name="Pregnancies"
                value={form.Pregnancies}
                className="input"
                placeholder="E.g 2"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Glucose</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={glucoseId}
                name="Glucose"
                value={form.Glucose}
                className="input"
                placeholder="E.g 120"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Blood Pressure</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={bloodPressureId}
                name="BloodPressure"
                value={form.BloodPressure}
                className="input"
                placeholder="E.g 72"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Skin Thickness</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={skinThicknessId}
                name="SkinThickness"
                value={form.SkinThickness}
                className="input"
                placeholder="E.g 35"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Insulin</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={insulinId}
                name="Insulin"
                value={form.Insulin}
                className="input"
                placeholder="E.g 80"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">BMI</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={bmiId}
                name="BMI"
                value={form.BMI}
                className="input"
                placeholder="E.g 24.5"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Diabetes Pedigree Function</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={diabetesPedigreeFunctionId}
                name="DiabetesPedigreeFunction"
                value={form.DiabetesPedigreeFunction}
                className="input"
                placeholder="E.g 0.45"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Age</legend>
              <input
                type="number"
                onChange={handleFormChange}
                id={ageId}
                name="Age"
                value={form.Age}
                className="input"
                placeholder="E.g 32"
              />
            </fieldset>

            {isLoading ? <button class="btn btn-accent">
              <span class="loading loading-spinner"></span>
              loading
            </button> :
              <button class="btn btn-accent">
                Check
              </button>}



          </form>
        </div>

        <div>
          <img className="h-2/3 w-auto" src={imageUrl} alt="" />
        </div>
      </div>


    </div>
  );

}

