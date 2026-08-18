(() => {
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyDates = () => {
    const locale = "fa-IR";
    const postDates = document.getElementsByTagName("time");

    for (const date of postDates) {
      if (!date.dateTime) {
        continue;
      }

      date.textContent = new Date(date.dateTime).toLocaleString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const archiveDates = document.getElementsByClassName("archive-date");
    for (const date of archiveDates) {
      const year = (date.getAttribute("data-year") || date.textContent).trim();
      date.setAttribute("data-year", year);
      const parsed = new Date(`${year}-01-01`);
      if (!isNaN(parsed.getTime())) {
        date.textContent = parsed.toLocaleString(locale, {
          year: "numeric",
        });
      } else {
        date.textContent = year;
      }
    }
  };

  const applyTranslations = () => {
    const dict = (window.SITE_I18N && window.SITE_I18N["fa"]) || {};

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const attr = el.getAttribute("data-i18n-attr");
      const value = dict[key];

      if (value == null) {
        return;
      }

      if (value === "") {
        el.hidden = true;
        return;
      }

      el.hidden = false;

      if (attr) {
        el.setAttribute(attr, value);
        if (attr === "aria-label") {
          el.setAttribute("title", value);
        }
        return;
      }

      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = value;
        return;
      }

      el.textContent = value;
    });

    applyDates();
  };

  const initThemeToggle = () => {
    const body = document.body;
    const lamp = document.getElementById("mode");

    if (!lamp) {
      return;
    }

    const toggleTheme = (state) => {
      if (state === "dark") {
        localStorage.setItem("theme", "light");
        body.removeAttribute("data-theme");
      } else if (state === "light") {
        localStorage.setItem("theme", "dark");
        body.setAttribute("data-theme", "dark");
      } else if (typeof initTheme === "function") {
        initTheme(state);
      }
    };

    lamp.addEventListener("click", () =>
      toggleTheme(localStorage.getItem("theme"))
    );
  };

  const initMenuBlur = () => {
    const cbox = document.getElementById("menu-trigger");
    const area = document.querySelector(".wrapper");

    if (!cbox || !area) {
      return;
    }

    cbox.addEventListener("change", function () {
      this.checked
        ? area.classList.add("blurry")
        : area.classList.remove("blurry");
    });
  };

  const createScrollTopButton = () => {
    const button = document.createElement("button");
    button.id = "scroll-top";
    button.type = "button";
    button.className = "scroll-top";
    button.setAttribute("aria-label", "بازگشت به بالا");
    button.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(button);
    return button;
  };

  const initScrollTopButton = () => {
    const button =
      document.getElementById("scroll-top") || createScrollTopButton();

    const toggleVisibility = () => {
      const canScroll =
        document.documentElement.scrollHeight > window.innerHeight + 8;
      button.classList.toggle("is-visible", canScroll && window.scrollY > 120);
    };

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);
    toggleVisibility();
  };

  applyTranslations();
  initThemeToggle();
  initMenuBlur();
  initScrollTopButton();
})();
