"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Upload,
  ImageIcon,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";

export default function Analyzier() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      console.log("Analyzing image...");
    }, 2500);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-card border gap-4 p-6 mx-8 mt-10 rounded-xl">
        <CardHeader className="flex-col items-start gap-2">
          <h1 className="font-semibold">Cargar imagen</h1>
          <p className="text-muted-foreground">
            Cargue una imagen para comenzar el análisis del terreno.
          </p>
        </CardHeader>
        <CardBody className="space-y-4">
          {!image ? (
            <label className="flex min-h-100 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/50">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-foreground">
                Carga de imagen
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG +10MB
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg border border-border">
                <Image
                  width={75}
                  height={75}
                  src={image || "/placeholder.svg"}
                  alt="Uploaded Mars terrain"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={analyzeImage}
                  color="primary"
                  fullWidth
                  disabled={isAnalyzing}
                  className="flex items-center rounded-md"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Analizar Terreno
                    </>
                  )}
                </Button>
                <Button
                  variant="bordered"
                  onClick={() => {
                    setImage(null);
                    //setResults(null);
                  }}
                  className="flex items-center rounded-md border-2"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="bg-card border gap-4 p-6 mx-8 mt-10 rounded-xl">
        <CardHeader className="flex-col items-start gap-2">
          <h1 className="font-semibold">Análisis de resultados</h1>
          <p className="text-muted-foreground">
            Resultados de la caracterización del terreno y la evaluación
            de la transitabilidad.
          </p>
        </CardHeader>
        <CardBody>
          {!results ? (
            <div className="flex min-h-100 flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                Aún no hay análisis.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Cargue una imagen y haga clic en "Analizar Terreno" para ver los
                resultados.
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
