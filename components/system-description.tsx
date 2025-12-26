import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function SystemDescription() {
  return (
    <Card className="bg-card border gap-4 p-6 mx-8 mt-10 rounded-xl">
      <CardHeader className="flex-col items-start gap-2">
        <h1 className="font-semibold">
          Sistema de segmentación semántica para la clasificación geológica del
          terreno marciano
        </h1>
        <p className="text-muted-foreground">
          Análisis avanzado basado en inteligencia artificial de imágenes del
          rover marciano para la caracterización del terreno y la evaluación de
          la transitabilidad.
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-sm">Análisis de imágenes</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modelo de aprendizaje profundo entrenado para la clasificación
              semántica del terreno a nivel de píxeles
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-accent/10">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-sm">Detección de terreno</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Identifica rocas, arena, roca madre, suelo firme y diversas
              composiciones de suelo con alta precisión
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-chart-2/10">
                <svg
                  className="h-4 w-4 text-chart-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-sm">Evaluación de seguridad</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Análisis de la transitabilidad del terreno para rovers marcianos
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
