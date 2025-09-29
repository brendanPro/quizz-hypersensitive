import "./index.css";
import { Quizz } from "./components/quizz";

export function App() {


  return (
    <>
      <h1 className="text-3xl font-bold text-center">SUIS-JE HYPERSENSIBLE ?</h1>
      <h4 className="text-center">S’auto évaluer à travers 50 questions</h4>
      <h2 className="text-center">Proposé par Nexus <i>Coaching & Consulting</i></h2>
      <div className="mx-auto p-8 text-center relative z-10">
        <Quizz />
      </div>
    </>
  );
}

export default App;
