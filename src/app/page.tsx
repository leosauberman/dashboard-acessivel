"use client";
import Dashboard from "@/components/ui/dashboard";
import VLibras from "vlibras-nextjs";
import StoreProvider from "@/app/StoreProvider";

export default function Home() {

    return (
        <StoreProvider>
            <main className="min-h-screen p-10">
                <Dashboard />
            </main>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </StoreProvider>
    );
}
