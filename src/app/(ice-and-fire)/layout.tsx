import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="px-0 mt-20">{children}</div>
      
      <Footer />
    </main>
  );
}
