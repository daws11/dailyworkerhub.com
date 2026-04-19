export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-6">
          Maaf, halaman yang Anda cari tidak ada.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
