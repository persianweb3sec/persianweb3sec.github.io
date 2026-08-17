(() => {
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getLang = () => (localStorage.getItem("lang") === "en" ? "en" : "fa");

  const applyDates = (lang) => {
    const locale = lang === "en" ? "en-US" : "fa-IR";
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
      const year = date.getAttribute("data-year") || date.textContent;
      date.setAttribute("data-year", year);
      date.textContent = new Date(`${year}-01-01`).toLocaleString(locale, {
        year: "numeric",
      });
    }
  };

  const applyLanguage = (lang) => {
    const dict = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
    const html = document.documentElement;

    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
    localStorage.setItem("lang", lang);

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

    const licenseLink = document.querySelector("#license a[rel='license']");
    if (licenseLink) {
      licenseLink.href =
        lang === "en"
          ? "http://creativecommons.org/licenses/by/4.0/deed.en"
          : "http://creativecommons.org/licenses/by/4.0/deed.fa";
    }

    applyDates(lang);
  };

  const initLanguageToggle = () => {
    const toggle = document.getElementById("lang-toggle");
    applyLanguage(getLang());

    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", () => {
      applyLanguage(getLang() === "en" ? "fa" : "en");
    });
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
    button.setAttribute("data-i18n", "scroll.top");
    button.setAttribute("data-i18n-attr", "aria-label");
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

  initThemeToggle();
  initMenuBlur();
  initScrollTopButton();
  initLanguageToggle();
})();
