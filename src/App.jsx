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
      {/*
        First focusable element in the DOM, so one Tab from page load offers it.
        `focus:` rather than `focus-visible:` — the link is only ever reachable
        by keyboard, so it should show whenever it holds focus.

        It is `fixed` at z-[100], above the sticky header's z-50: the header
        spans the full width at the top, so an element that appears at the top
        necessarily sits over it. Overlaying it with an opaque background and a
        higher stacking order keeps the link fully legible, which is what the
        requirement is protecting against; taking it out of the overlap by
        putting it in normal flow would shift the whole page down on focus.
      */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-purple-400 focus:bg-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:text-neutral-100"
      >
        Skip to main content
      </a>
      <Navbar />
      {/*
        tabIndex={-1} is what makes the skip link actually move FOCUS rather
        than only the scroll position — without it a screen reader's virtual
        cursor stays in the header in several browsers.
      */}
      <main id="main" tabIndex={-1} className="container mx-auto px-8">
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
