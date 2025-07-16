import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-white antialiased">
      <Navbar /> 
      <Hero />
      <main>
        <About />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}

export default App;