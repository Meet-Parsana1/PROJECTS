/*========================= FOR FAVICON UPDATION =========================*/
const defaultTitle = 'Portfolio | Meet Parsana';
const awayTitle = 'Come Back To Portfolio';

const defaultFavicon = 'ASSETS/Main_Favicon.png';
const awayFavicon = 'ASSETS/Come_Back_Favicon.png';

function changeFavicon(src) {
      const link = document.getElementById('favicon');

      // Create a clone to ensure refresh
      const newLink = link.cloneNode(true);
      newLink.href = src + '?v=' + new Date().getTime(); // bust cache

      link.parentNode.replaceChild(newLink, link);
      newLink.id = 'favicon'; // Re-assign ID for future access
}

// Reset favicon on initial load
window.addEventListener('load', () => {
      changeFavicon(defaultFavicon);
      document.title = defaultTitle;
});

document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
            document.title = awayTitle;
            changeFavicon(awayFavicon);
      } else {
            document.title = defaultTitle;
            changeFavicon(defaultFavicon);
      }
});

/*========================= FOR MENU ICON =========================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');

      // Toggle overflow on body when menu is open
      if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
      } else {
            document.body.style.overflow = '';
      }
};

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach((link) => {
      link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
      });
});

/*========================= FOR SCROLL SECTIONS ACTIVE LINK =========================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
      sections.forEach((sec) => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                  navLinks.forEach((links) => {
                        links.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                  });
            }
      });

      // STICKY NAVBAR

      let header = document.querySelector('header');
      header.classList.toggle('sticky', window.scrollY > 100);

      //REMOVE TOGGLE ICON AND NAVBAR WHEN CLICK NAVBAR LINK (SCROLL)

      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
};

/*========================= FOR TYPING ANIMATION(Home Section) =========================*/
const el = document.querySelector('.typewrite');
const words = JSON.parse(el.getAttribute('data-words'));
let i = 0,
      j = 0,
      isDeleting = false;

function type() {
      const currentWord = words[i];
      el.textContent = currentWord.substring(0, j);

      if (!isDeleting) {
            j++;
            if (j > currentWord.length) {
                  isDeleting = true;
                  setTimeout(type, 1800);
                  return;
            }
      } else {
            j--;
            if (j === 0) {
                  isDeleting = false;
                  i = (i + 1) % words.length;
            }
      }

      setTimeout(type, isDeleting ? 50 : 120);
}

type();

/*========================= FOR READ MORE BUTTON(About Section) =========================*/
const btn = document.getElementById('readMoreBtn');
const extra = document.getElementById('extraContent');

btn.addEventListener('click', () => {
      extra.classList.toggle('show');

      if (extra.classList.contains('show')) {
            btn.textContent = 'Read Less';
      } else {
            btn.textContent = 'Read More';
      }
});

/*========================= FOR SCROLL REVEAL ANIMATION =========================*/
ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*========================= FOR PORTFOLIO CAROUSEL CHANGE ON CLICK =========================*/
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;
const maxIndex = 1; // Because you have 2 images: index 0 and 1

const updateArrowState = () => {
      // Disable left arrow if at the beginning
      if (index === 0) {
            arrowLeft.disabled = true;
            arrowLeft.style.opacity = '0.5';
            arrowLeft.style.cursor = 'not-allowed';
      } else {
            arrowLeft.disabled = false;
            arrowLeft.style.opacity = '1';
            arrowLeft.style.cursor = 'pointer';
      }

      // Disable right arrow if at the end
      if (index === maxIndex) {
            arrowRight.disabled = true;
            arrowRight.style.opacity = '0.5';
            arrowRight.style.cursor = 'not-allowed';
      } else {
            arrowRight.disabled = false;
            arrowRight.style.opacity = '1';
            arrowRight.style.cursor = 'pointer';
      }
};

const activePortfolio = () => {
      const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
      const details = document.querySelectorAll('.portfolio-box .portfolio-detail');

      // Slide image
      imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

      // Update text content
      details.forEach((detail, idx) => {
            if (idx === index) {
                  detail.classList.add('active');
            } else {
                  detail.classList.remove('active');
            }
      });

      // Update arrow states
      updateArrowState();
};

arrowRight.addEventListener('click', () => {
      if (index < maxIndex) {
            index++;
            activePortfolio();
      }
});

arrowLeft.addEventListener('click', () => {
      if (index > 0) {
            index--;
            activePortfolio();
      }
});

// 🔁 INITIALIZE ARROW STATE ON LOAD
window.addEventListener('DOMContentLoaded', () => {
      updateArrowState(); // 🚫 Disables left arrow initially
});

/*========================= FOR TECHNICAL SKILLS CONTAINER ANIMATION =========================*/
function animateSkills() {
      const skills = document.querySelectorAll('.progress');

      skills.forEach((skill) => {
            const value = parseInt(skill.getAttribute('data-value'));
            const counter = skill.querySelector('.counter');
            skill.style.setProperty('--progress', value + '%');

            let current = 0;
            const interval = setInterval(() => {
                  if (current >= value) {
                        clearInterval(interval);
                        counter.textContent = value + '%';
                  } else {
                        current++;
                        counter.textContent = current + '%';
                  }
            }, 15);
      });
}

// Run when in view
const observer = new IntersectionObserver(
      (entries) => {
            entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                        animateSkills();
                        observer.disconnect(); // Run once
                  }
            });
      },
      { threshold: 0.3 }
);

observer.observe(document.querySelector('#skills'));

/*========================= FOR CONTACT FORM VIA EmailJS =========================*/
const form = document.querySelector('form');
const emailInput = document.getElementById('email');

// 🔄 Auto-lowercase email input while typing
emailInput.addEventListener('input', () => {
      emailInput.value = emailInput.value.toLowerCase();
});

form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = emailInput.value.trim().toLowerCase(); // converted to lowercase
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // ✅ Validate for empty fields
      if (!name || !email || !phone || !subject || !message) {
            Swal.fire({
                  icon: 'warning',
                  title: 'Missing Fields',
                  text: 'Please fill in all fields.',
                  confirmButtonColor: '#3085d6',
            });
            return;
      }

      // ✅ Field-specific validations
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!nameRegex.test(name)) {
            Swal.fire({
                  icon: 'error',
                  title: 'Invalid Name',
                  text: 'Name should contain only letters and spaces.',
                  confirmButtonColor: '#d33',
            });
            return;
      }

      if (!emailRegex.test(email)) {
            Swal.fire({
                  icon: 'error',
                  title: 'Invalid Email',
                  text: 'Please enter a valid email address.',
                  confirmButtonColor: '#d33',
            });
            return;
      }

      if (!phoneRegex.test(phone)) {
            Swal.fire({
                  icon: 'error',
                  title: 'Invalid Phone Number',
                  text: 'Phone number should be 10 digits.',
                  confirmButtonColor: '#d33',
            });
            return;
      }

      if (subject.length < 3) {
            Swal.fire({
                  icon: 'error',
                  title: 'Invalid Subject',
                  text: 'Subject should be at least 3 characters long.',
                  confirmButtonColor: '#d33',
            });
            return;
      }

      if (message.length < 5) {
            Swal.fire({
                  icon: 'error',
                  title: 'Invalid Message',
                  text: 'Message should be at least 5 characters long.',
                  confirmButtonColor: '#d33',
            });
            return;
      }

      // 🕐 Show "Sending..." popup
      Swal.fire({
            title: 'Sending...',
            text: 'Please wait while we send your message.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                  Swal.showLoading();
            },
      });

      // 📧 Send via EmailJS
      emailjs
            .send('service_yeageuq', 'template_l558kbl', {
                  name: name,
                  email: email,
                  phone: phone,
                  title: subject,
                  message: message,
            })
            .then(
                  () => {
                        Swal.fire({
                              icon: 'success',
                              title: 'Message Sent!',
                              text: 'Your message has been sent successfully.',
                              confirmButtonColor: '#3085d6',
                        }).then(() => {
                              form.reset();
                        });
                  },
                  () => {
                        Swal.fire({
                              icon: 'error',
                              title: 'Failed',
                              text: 'Something went wrong. Please try again.',
                              confirmButtonColor: '#d33',
                        });
                  }
            );
});

// 🔐 Initialize EmailJS
(function () {
      emailjs.init('lGJS0uJyqnhAvc1xG'); // Replace with your actual EmailJS public key
})();

// ✨ Highlight input fields on focus
const inputs = document.querySelectorAll('.field .item');

inputs.forEach((input) => {
      input.addEventListener('focus', () => {
            input.style.borderColor = 'black';
      });

      input.addEventListener('blur', () => {
            // input.style.borderColor = '#007bff';
            input.style.borderColor = 'blue';
      });
});

/*========================= FOR PARTICLES JS =========================*/
particlesJS('particles-js', {
      particles: {
            number: {
                  value: 90,
                  density: {
                        enable: true,
                        value_area: 800,
                  },
            },
            color: {
                  // value: ['#00BFFF', '#1E90FF', '#007bff'], // Blue gradient
                  value: '#000',
            },
            shape: {
                  type: ['circle', 'triangle', 'polygon'], // Mixed shapes
            },
            opacity: {
                  // value: 0.6,
                  value: 0.3,
                  random: false,
            },
            size: {
                  value: 4,
                  random: false,
            },
            line_linked: {
                  enable: true,
                  distance: 150,
                  // color: '#1E90FF',
                  color: '#000',
                  // opacity: 0.4,
                  opacity: 0.6,
                  width: 1,
            },
            move: {
                  enable: true,
                  speed: 5,
                  direction: 'none',
                  random: false,
                  straight: false,
                  out_mode: 'out',
            },
      },
      interactivity: {
            detect_on: 'canvas',
            events: {
                  onhover: {
                        enable: true,
                        mode: 'repulse', // Push away effect on hover
                  },
                  onclick: {
                        enable: true,
                        mode: 'push', // Add particles on click
                  },
                  resize: true,
            },
            modes: {
                  repulse: {
                        distance: 100,
                        duration: 0.4,
                  },
                  push: {
                        particles_nb: 5,
                  },
            },
      },
      retina_detect: true,
});

/*========================= FOR SCROLL UP BUTTON =========================*/
const scrollUpBtn = document.getElementById('scrollUpBtn');

window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
            if (!scrollUpBtn.classList.contains('visible')) {
                  scrollUpBtn.style.display = 'block';
                  scrollUpBtn.classList.add('visible');
                  scrollUpBtn.style.animation = 'slideFromTopRight 0.6s ease forwards';
            }
      } else {
            scrollUpBtn.classList.remove('visible');
            scrollUpBtn.style.display = 'none';
            scrollUpBtn.style.animation = 'none';
      }
});

/*========================= FOR BLOCKING F12 AND CTRL+SHIFT+I  =========================*/
document.addEventListener('keydown', function (event) {
      if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
            event.preventDefault();
      }
});

/*========================= FOR DISABLING DEVELOPER MODE =========================*/
document.onkeydown = function (e) {
      if (e.code === 'F12') {
            return false;
      }
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
            return false;
      }
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
            return false;
      }
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyJ') {
            return false;
      }
      if (e.ctrlKey && e.code === 'KeyU') {
            return false;
      }
};
