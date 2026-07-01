import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"


export default function LoginPage() {
  const navigtae = useNavigate()

  const handleGoogleSuccess = async  (credentialResponse: any) => {
    console.log("🔥 BOOM! Google se full response mila:", credentialResponse);
    
    const token = credentialResponse.credential;
    console.log("🔑 Yeh rahi tumhaari unique Google Client Chabi (Token):", token); 

    if(!token) return;
    
    try{
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userEmail = decodedPayload.email;





       //ab user ko backend se db mai sync karege and req will be sent to backend 
    const response = await axios({
      method:"post" , 
      url: 'http://localhost:5000/api/auth/v1/google/login',
      withCredentials : true,
      data:{
        email : userEmail // yaha googlecredential.credential response ke andar se email decode kar ke nikal kar rakhna hai
      }
    })
    console.log(response.data)
    if(response.status=== 200 ){
      navigtae("/app")
    }

    }catch(error){
      console.log(error)

    }

   

    


  };

  const handleGoogleError = () => {
    console.log("❌ Oops! Google Sign-In fail ho gaya.");
  };
  return (
    <div className="flex min-h-screen items-center justify-center  p-4">

    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>WELCOME</CardTitle>
        <CardDescription>
          GET READY TO BE PRODUCTIVE.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleLogin 
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="filled_black"/>

       
        
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>


    </div>
  )
}
