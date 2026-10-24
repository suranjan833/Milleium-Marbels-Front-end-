import AwardClient from "./AwardClient";

export default function AwardPage() {
  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      <div className="bg-[#101010] text-white h-40"></div>
      <div className="bg-[#101010] text-white pb-8">
        <div className="container mx-auto flex justify-center items-center">
          <h4 className="text-[42px] text-center font-serif">Awards</h4>
        </div>
      </div>
      <AwardClient />
    </main>
  );
}

