// AOS INITIALIZATION
AOS.init({
      duration: 1000,
      once: true,
});

// PARTICLES JS SPECIFICATIONS
particlesJS("particles-js", {
      particles: {
            number: { value: 65 },
            size: { value: 3 },
            move: { speed: 4 },
            color: { value: "#000000" },
            line_linked: { enable: true, distance: 150, color: "#000000" },
      },
      interactivity: {
            events: {
                  onhover: { enable: true, mode: "repulse" },
            },
      },
});

// BLOCKING F12 AND CTRL+SHIFT+I 
document.addEventListener("keydown", function (event) {
      if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && event.key === "I")
      ) {
            event.preventDefault();
      }
});
