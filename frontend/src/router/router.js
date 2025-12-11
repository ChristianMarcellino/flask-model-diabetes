import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout"

const router = createBrowserRouter([
    {
        path : "",
        Component : Layout,
        children : [
            {
                index : true,
                lazy : {
                    Component : async()=>{
                        const component = await import("@pages/Predict")
                        return component.default
                    }
                }
            },
            {
                path : "predict-jankenpon",
                lazy : {
                    Component : async()=>{
                        const component = await import("@pages/PredictJankenpon")
                        return component.default
                    }
                }
            }
        ]
    }
])

export default router