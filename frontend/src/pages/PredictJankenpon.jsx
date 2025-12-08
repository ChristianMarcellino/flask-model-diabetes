import { useId, useState } from "react"
import http from "../utils/api"

export default function PredictJankenpon() {
  const [form, setForm] = useState({
    file : ""
  })

  const fileId = useId()

  const handleFormChange = (e)=>{
    const{name, value} = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleFormSubmit =async (e)=>{
    e.preventDefault()
    try{
      const response = await http.post("/predict-jankenpon", form)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input onChange={handleFormChange} name="file" id={fileId} value={form.file} type="file" className="file-input file-input-neutral"/>
        <button type="submit">Wawan</button>
      </form>
    </div>
  )
}
