import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageUpload from "@/components/ImageUpload";
import Chatbot from "@/components/Chatbot";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ImageUpload />
        <GovernmentSchemes />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
