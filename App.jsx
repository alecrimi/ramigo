import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
//import { customTheme } from './customTheme'; // Import the custom theme


 
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
export default function App() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return ( 
    
      <div
        style={{
          width: "100vw",
          height: "100vh",
          border: "3px solid rgb(255, 255, 255)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        <div >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark" /*This change to black */
            providers={["google"]}
          />
        </div>

      </div>
      //    </UserContext.Provider>
    );
  } else {
    return (
 
      <div
       style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
>
<div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;Welcome</div>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        
 
        
      </div> 
       </div> 
     );
  }
}
