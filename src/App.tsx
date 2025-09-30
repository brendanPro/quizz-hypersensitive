import "./index.css";
import { Quizz } from "./components/quizz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import logo from "./logo.svg"
import { Button } from "./components/ui/button";
import { useState } from "react";

export function App() {
  const [isQuizzStarted, setIsQuizzStarted] = useState(false);

  return (
    <div className="w-[1000px] justify-self-center self-start mt-10 px-4 py-10">
      <Card className="w-full border-muted bg-white/80 backdrop-blur">
        <CardHeader className="items-center text-center">
          <div className="w-full flex items-center justify-start gap-45">
            <div className="h-30 w-30 shrink-0 rounded-md bg-muted/60 border flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Nexus-logo" className="h-50 w-50 object-contain" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-balance break-words max-w-[90%]">
              SUIS-JE HYPERSENSIBLE ?
            </CardTitle>
          </div>
          {
            !isQuizzStarted ? 
            (<>
              <CardDescription className="text-base text-balance break-words max-w-[90%] mx-auto">S’auto évaluer à travers 50 questions</CardDescription>
              <p className="text-sm text-muted-foreground">Proposé par Nexus <i>Coaching & Consulting</i></p>
            </>) :
            (<></>)
          }
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative z-10">
              {
                !isQuizzStarted ? 
                ( <Button onClick={() => setIsQuizzStarted(true)}>Commencer le quizz</Button> ) :
                ( <Quizz /> )
              }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
