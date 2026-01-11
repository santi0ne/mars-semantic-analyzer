import Analyzier from "@/components/analyzier";
import SystemDescription from "@/components/system-description";
import TerrainInfo from "@/components/terrain-info";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SystemDescription />
      <Analyzier />
      <TerrainInfo />
    </div>
  );
}
