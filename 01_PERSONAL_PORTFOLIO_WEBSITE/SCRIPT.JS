AOS.init({
  duration: 1000,
  once: true,
});

particlesJS("particles-js", {
  particles: {
    number: { value: 65 },
    size: { value: 3 },
    move: { speed: 4 },
    color: { value: "#1a1a1a" },
    line_linked: { enable: true, distance: 150, color: "#1a1a1a" },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
    },
  },
});
