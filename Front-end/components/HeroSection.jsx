import AboutSection from './AboutSection'
import SearchNotes from './SearchNotes';
import BlogSection from './BlogSection';
import ServiceSection from './ServiceSection'
const HeroSection = () => {
   
  return<>
  <section className="bg-gradient-to-r from-green-400 to-blue-500 h-[80vh] text-white flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn">
      Welcome to Note Vault
    </h1>
    <p className="mt-4 text-lg sm:text-xl lg:text-2xl animate__animated animate__fadeIn animate__delay-1s text-center">
      Your one-stop platform for educational resources, notes, exam papers, and more!
    </p>
    <button className="mt-6 px-6 py-2 bg-white text-black rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
      Get Started
    </button>
  </section>

  {/* // about section  */}
      <AboutSection/>
  {/* Service section  */}
      <ServiceSection/>
  {/* Blog section  */}
      <BlogSection/>

  {/* Search Section  */}
      <SearchNotes/>

      {/* Footer section  */}
      <footer className="bg-blue-600 text-white p-6 text-center">
    <p>&copy; 2025 Note Vault | All Rights Reserved</p>
    <p>Contact Us: support@notevault.com</p>
  </footer>
  </>};

export default HeroSection;
