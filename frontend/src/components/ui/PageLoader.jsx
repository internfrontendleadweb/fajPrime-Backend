export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
        <p className="font-serif text-navy-900/60 text-small tracking-widest uppercase">FAJ Prime</p>
      </div>
    </div>
  );
}
