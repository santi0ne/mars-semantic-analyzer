import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function TerrainInfo() {
  const terrainClasses = [
    {
      name: "Arena",
      color: "bg-amber-500",
      description:
        "Terreno arenoso suelto, generalmente seguro para atravesarlo con control del deslizamiento de las ruedas.",
    },
    {
      name: "Rocas",
      color: "bg-gray-600",
      description:
        "Obstáculos rocosos que pueden plantear dificultades de navegación y requieren una planificación cuidadosa de la ruta.",
    },
    {
      name: "Roca madre",
      color: "bg-stone-700",
      description:
        "Formaciones rocosas sólidas que proporcionan un terreno estable con alta tracción.",
    },
    {
      name: "Suelo firme",
      color: "bg-orange-600",
      description:
        "Suelo compactado o regolito que ofrece buena estabilidad para operaciones de rover",
    },
    {
      name: "Suelo (Fino)",
      color: "bg-yellow-700",
      description:
        "Partículas de suelo finas, pueden causar problemas de movilidad en acumulaciones profundas",
    },
    {
      name: "Suelo (Grueso)",
      color: "bg-orange-800",
      description:
        "Suelo de partículas gruesas con mejor drenaje y generalmente mayor resistencia al soporte.",
    },
  ];

  return (
    <Card className="bg-card border gap-4 p-6 mx-8 mt-10 rounded-xl">
      <CardHeader className="flex-col items-start gap-2">
        <h1 className="font-semibold">Sobre clasificación del terreno</h1>
        <p className="text-muted-foreground">
          Guía de referencia para los tipos de terreno geológico detectados por
          el modelo de segmentación
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terrainClasses.map((terrain, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg border border-border bg-card p-4"
            >
              <div className={`h-10 w-10 shrink-0 rounded ${terrain.color}`} />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">{terrain.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {terrain.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
          <h4 className="mb-2 text-sm font-semibold">
            Acerca de AI4Mars Dataset
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            El conjunto de datos AI4Mars contiene más de 35 000 imágenes
            etiquetadas de los rovers de la NASA en Marte, etiquetadas por
            científicos. Este sistema utiliza un modelo de aprendizaje
            profundo entrenado con este conjunto de datos para realizar una
            segmentación semántica a nivel de píxeles, lo que permite la
            navegación autónoma y el análisis científico del terreno marciano.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
