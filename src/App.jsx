import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import GithubContributions from "./components/GithubContributions";

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-purple-300 selection:text-purple-900 min-h-screen">
      <div className="fixed top-0 left-0 h-full w-full z-[-1] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Navbar />
      <main className="container mx-auto px-8">
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <GithubContributions />
        <Contact />
      </main>
    </div>
  );
};

export default App;
