"use client";
import Dashboard from "@/components/ui/dashboard";
import VLibras from "vlibras-nextjs";

export default function Home() {

    return (
        <>
            <main className="min-h-screen p-10">
                <Dashboard />
            </main>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </>
    );
}
