import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="font-heading text-4xl tracking-tight">Esa página no está</h1>
      <p className="max-w-md text-muted-foreground">
        Probá Comparar, Pronóstico o Fuentes.
      </p>
      <Button render={<Link href="/" />} size="lg">
        Volver al inicio
      </Button>
    </div>
  );
}
