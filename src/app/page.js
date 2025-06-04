import HomeContainer from "@/components/HomeContainer";

export default function Home() {
  return (
    
    <div>
        <HomeContainer />
      
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 bg-sky-800 flex justify-center items-center">hola</div>
        <div className="col-span-4">chau</div>
        <div className="col-span-4">robert</div>
      </div>
   
    </div>
  );
}
