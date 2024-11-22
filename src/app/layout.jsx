"use client";

import { ThemeProvider } from "../components/ThemeProvider";
import { ProjectProvider } from "../components/ProjectContext";
import { Toaster } from "../components/ui/toaster";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import "../styles/auth.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50" suppressHydrationWarning>
        <ThemeProvider>
          <ProjectProvider>
            {children}
            <Toaster />
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}