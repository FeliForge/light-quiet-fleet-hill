import { useMemo, useState } from "react";

const GENO = ["FF", "Ff", "ff"] as const;
const LABELS: Record<string, string> = {
  FF: "Sem o alelo",
  Ff: "Portador",
  ff: "Afetado",
};

function child(a: string, b: string) {
  const joined = [a, b].sort().join("");
  const genotype = joined === "fF" ? "Ff" : joined;
  return { genotype, label: LABELS[genotype] ?? genotype };
}

export function Punnett() {
  const [left, setLeft] = useState("Ff");
  const [right, setRight] = useState("Ff");
  const grid = useMemo(() => {
    const a = [left[0]!, left[1]!];
    const b = [right[0]!, right[1]!];
    return a.map((x) => b.map((y) => child(x, y)));
  }, [left, right]);
  const flat = grid.flat();
  const affected = flat.filter((c) => c.genotype === "ff").length;

  return (
    <div className="card space-y-3">
      <h3 className="font-display text-xl font-extrabold">Quadro de Punnett</h3>
      <p className="text-sm text-muted">
        Escolha os genótipos dos pais. ff é a pessoa afetada numa doença recessiva.
      </p>
      <div className="flex flex-wrap gap-3">
        {[["Mãe / pai A", left, setLeft], ["Mãe / pai B", right, setRight] as const].map(
          ([label, value, set]) => (
            <label key={label as string} className="text-sm font-semibold">
              {label as string}
              <select
                className="mt-1 block min-h-11 rounded-lg border border-border bg-surface px-3"
                value={value as string}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
              >
                {GENO.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
          ),
        )}
      </div>
      <div className="grid max-w-xs grid-cols-2 gap-2">
        {flat.map((cell, i) => (
          <div key={i} className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
            <p className="font-display text-lg font-extrabold">{cell.genotype}</p>
            <p className="text-muted">{cell.label}</p>
          </div>
        ))}
      </div>
      <p className="text-sm font-semibold">{affected} de 4 com a condição manifesta.</p>
    </div>
  );
}

export function LightWidget() {
  const [km, setKm] = useState("150000000");
  const n = Number(km.replace(",", "."));
  const seconds = Number.isFinite(n) && n > 0 ? n / 300000 : null;
  return (
    <div className="card space-y-3">
      <h3 className="font-display text-xl font-extrabold">Quanto tempo a luz leva</h3>
      <p className="text-sm text-muted">Velocidade usada na prova: 300.000 km/s. Δt = distância ÷ velocidade.</p>
      <label className="block text-sm font-semibold">
        Distância em km
        <input
          inputMode="decimal"
          className="mt-1 w-full min-h-11 rounded-lg border border-border bg-surface px-3"
          value={km}
          onChange={(e) => setKm(e.target.value)}
        />
      </label>
      <p className="font-display text-2xl font-extrabold">
        {seconds == null ? "—" : seconds >= 60 ? `${(seconds / 60).toFixed(1)} min` : `${seconds.toFixed(1)} s`}
      </p>
    </div>
  );
}

export function PhWidget() {
  const [ph, setPh] = useState(4.5);
  const band = ph < 7 ? "Ácido" : ph > 7 ? "Básico" : "Neutro";
  const note =
    ph <= 5.6
      ? "Nesta faixa a chuva já é considerada ácida."
      : ph === 7
        ? "Neutro, como a água pura em condições ideais."
        : ph > 7
          ? "Acima de 7 a solução é básica."
          : "Ainda ácido, mas acima do limite clássico da chuva ácida.";
  return (
    <div className="card space-y-3">
      <h3 className="font-display text-xl font-extrabold">Escala de pH</h3>
      <input
        type="range"
        min={0}
        max={14}
        step={0.1}
        value={ph}
        onChange={(e) => setPh(Number(e.target.value))}
        className="w-full accent-primary"
        aria-label="Valor de pH"
      />
      <p className="font-display text-3xl font-extrabold">
        {ph.toFixed(1)} <span className="text-lg text-muted">{band}</span>
      </p>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

export function StudyWidget({ kind }: { kind?: string }) {
  if (kind === "punnett") return <Punnett />;
  if (kind === "luz") return <LightWidget />;
  if (kind === "ph") return <PhWidget />;
  return null;
}
