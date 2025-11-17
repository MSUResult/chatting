export default function Landing() {
  return (
    <main className="h-screen relative">
      <video
        src="/sch.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover brightness-125 contrast-110"
      />

      {/* Soft bright overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>

      <div>
        <p className="bg-blue-600 p-4 px-8 text-white font-bold text-lg z-10 absolute bottom-0 right-20">
          NEWS & EVENTS
        </p>
      </div>
    </main>
  );
}
