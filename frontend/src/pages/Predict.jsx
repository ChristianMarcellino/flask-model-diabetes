import { useId, useState } from "react"
import http from "../api/api"

export default function Predict() {

    const [form, setForm] = useState({
      pregnancies : "", 
      glucose : "",
      bloodPressure : "",
      skinThickness : "",
      insulin : "",
      bmi : "",
      diabetesPedigreeFunction : "",
      age : ""
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
        const {name, value} = e.target

        setForm({
          ...form,
          [name] : value
        })
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault()
      try{
        const value = await http.post("/predict", form)
        console.log(value)
        document.getElementById("result").innerText = `Result : ${value}`
      }catch(error){
        console.log(error)
      }
    }


  return (
    <div>
      <h1>Predict</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="number" onChange={handleFormChange} id={pregnanciesId} name="pregnancies" value={form.pregnancies} />
        <input type="number" onChange={handleFormChange} id={glucoseId} name="glucose" value={form.glucose} />
        <input type="number" onChange={handleFormChange} id={bloodPressureId} name="bloodPressure" value={form.bloodPressure} />
        <input type="number" onChange={handleFormChange} id={skinThicknessId} name="skinThickness" value={form.skinThickness} />
        <input type="number" onChange={handleFormChange} id={insulinId} name="insulin" value={form.insulin} />
        <input type="number" onChange={handleFormChange} id={bmiId} name="bmi" value={form.bmi} />
        <input type="number" onChange={handleFormChange} id={diabetesPedigreeFunctionId} name="diabetesPedigreeFunction" value={form.diabetesPedigreeFunction}/>
        <input type="number" onChange={handleFormChange} id={ageId} name="age" value={form.age} />
        <button type="submit">Check</button>
      </form>
      <div>
        <h2 id="result"></h2>
      </div>
    </div>
  )
}

