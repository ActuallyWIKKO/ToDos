import React from "react";
import {HelloWorld, Footer, Header, Jokes} from "ui";
export default function App() {
    return (

      <> 
      <Header />
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello from the Frontend DaisyUI + Vite + React!</h1>
      </div>
      <Jokes />
      <Footer />
      </>
    );
  }