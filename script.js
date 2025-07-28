// Add scroll snap dynamically for main and sections
document.addEventListener('DOMContentLoaded', () => {
  // Add scroll snap to main
  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    const firstSection = document.querySelector('section');
    if (firstSection) {
      firstSection.parentNode.insertBefore(main, firstSection);
      while (main.nextSibling && main.nextSibling.tagName === 'SECTION') {
        main.appendChild(main.nextSibling);
      }
    }
  }
  if (main) {
    main.style.scrollSnapType = 'y mandatory';
  }
  document.querySelectorAll('section').forEach(sec => {
    sec.style.scrollSnapAlign = 'start';
  });

  // Improve scroll indicator visibility
  const scrollDown = document.getElementById('scroll-down');
  if (scrollDown) {
    scrollDown.style.filter = 'drop-shadow(0 2px 8px #6dd5fa88)';
    scrollDown.style.opacity = '0.85';
    scrollDown.addEventListener('mouseenter', () => scrollDown.style.opacity = '1');
    scrollDown.addEventListener('mouseleave', () => scrollDown.style.opacity = '0.85');
    scrollDown.addEventListener('focus', () => scrollDown.style.opacity = '1');
    scrollDown.addEventListener('blur', () => scrollDown.style.opacity = '0.85');
  }
});

// Enhanced scroll and navigation highlighting
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Fade-in effect for sections
  function revealSections() {
    const trigger = window.innerHeight * 0.85;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) {
        sec.classList.add('visible');
      } else {
        sec.classList.remove('visible');
      }
    });
  }

  // Highlight nav link on scroll
  function highlightNav() {
    let scrollPos = window.scrollY + 150;
    let found = false;
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('text-cyan-400');
        });
        const activeLink = document.querySelector('nav a[href="#' + section.id + '"]');
        if (activeLink) activeLink.classList.add('text-cyan-400');
        found = true;
      }
    });
    // If at bottom, highlight last
    if (!found && window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      navLinks.forEach(link => link.classList.remove('text-cyan-400'));
      navLinks[navLinks.length - 1].classList.add('text-cyan-400');
    }
  }

  // Smooth scroll for nav links (for browsers that don't support CSS scroll-behavior)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // For accessibility, focus the section
        setTimeout(() => target.focus && target.focus(), 700);
      }
    });
  });

  window.addEventListener('scroll', () => {
    highlightNav();
    revealSections();
  });
  // Initial run
  highlightNav();
  revealSections();
});

// Example: Smooth scroll to top on load
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log("Portfolio loaded successfully!");
});

// Auto-scroll up and down when mouse pointer is near the top or bottom edge
let autoScrollDirection = null;
let autoScrollInterval = null;

document.addEventListener('mousemove', (e) => {
  const threshold = 60; // px from edge
  const y = e.clientY;
  const winH = window.innerHeight;
  // Scroll down
  if (winH - y < threshold) {
    if (autoScrollDirection !== 'down') {
      clearInterval(autoScrollInterval);
      autoScrollDirection = 'down';
      autoScrollInterval = setInterval(() => {
        window.scrollBy({ top: 10, behavior: 'smooth' });
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
          clearInterval(autoScrollInterval);
          autoScrollDirection = null;
        }
      }, 16);
    }
  }
  // Scroll up
  else if (y < threshold) {
    if (autoScrollDirection !== 'up') {
      clearInterval(autoScrollInterval);
      autoScrollDirection = 'up';
      autoScrollInterval = setInterval(() => {
        window.scrollBy({ top: -10, behavior: 'smooth' });
        if (window.scrollY <= 0) {
          clearInterval(autoScrollInterval);
          autoScrollDirection = null;
        }
      }, 16);
    }
  }
  // Stop scrolling
  else {
    clearInterval(autoScrollInterval);
    autoScrollDirection = null;
  }
});
