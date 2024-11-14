"use client";
import { useState, useEffect } from "react";
import "./../style/heroslider.scss";

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Liste des images et des textes associés
  const slides = [
    { 
      image: "/Image/paw-7231300_1280.jpg", 
      text: "Bienvenue sur YourDogs, votre nouvelle application pour partager de merveilleux moments avec votre chien." 
    },

    { 
      image: "/Image/promenade.jpg", 
      text: "Contactez-nous pour en savoir plus!" 
    },
  ];

  // Change de slide toutes les 8 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 8000); // 8000 ms = 8 secondes

    // Clean-up lors du démontage du composant
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="heroSlider">
      {/* Affichage de l'image de la slide courante */}
      <img src={slides[currentSlide].image} alt="Slide" className="slideImage" />
      
      {/* Texte associé à la slide courante */}
      <div className="slideTextWrapper">
        <h2 className="slideText">{slides[currentSlide].text}</h2>
      </div>
    </section>
  );
}

export default HeroSlider;
