import { useId, useState } from "react"
import http from "../utils/api"

export default function PredictForm({
    isLoading,
    setIsLoading,
    setResult,
    setImageUrl
}) {

    const [form, setForm] = useState({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0
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

      setResult(value.data.data)
      setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxQmDvJ34t-R21DHOI050z11CLnkvmLf44A&s")
      setTimeout(() => {
        setImageUrl("https://i.redd.it/monkey-thinking-v0-j08u39bvfxrf1.jpg?width=720&format=pjpg&auto=webp&s=3bf78f791de99982d71ad0df0c7d4ac6b17b54cd")
        setResult("")
        setForm({
          Pregnancies: 0,
          Glucose: 0,
          BloodPressure: 0,
          SkinThickness: 0,
          Insulin: 0,
          BMI: 0,
          DiabetesPedigreeFunction: 0,
          Age: 0
        })
      }, 3000)


    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Pregnancies</legend>
              <input
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="number"
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
                required type="number"
                onChange={handleFormChange}
                id={ageId}
                name="Age"
                value={form.Age}
                className="input"
                placeholder="E.g 32"
              />
            </fieldset>

            {isLoading ? <button className="btn btn-accent">
              <span className="loading loading-spinner"></span>
              loading
            </button> :
              <button className="btn btn-accent">
                Check
              </button>}



          </form>
  )
}
