export function Unauthorized() {
  return (
    <div className="w-[1000px] justify-self-center self-start mt-10 px-4 py-10">
      <div className="w-full border rounded-md p-8 text-center bg-white/80 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-2">Accès non autorisé</h1>
        <p className="text-muted-foreground">Les paramètres fournis ne sont pas valides.</p>
      </div>
    </div>
  );
}

export default Unauthorized;
