/*
  full publication list: year buttons show only that year's papers.
  "All" shows everything. the choice is kept in the url (#year-2025).
*/

{
  const onLoad = () => {
    const bar = document.querySelector(".pub-years");
    if (!bar) return;
    const buttons = [...bar.querySelectorAll("[data-year]")];
    const items = [...document.querySelectorAll(".pub-list > li[data-year]")];

    const show = (year) => {
      if (!buttons.some((b) => b.dataset.year === year)) year = "all";
      for (const b of buttons)
        b.setAttribute("aria-pressed", String(b.dataset.year === year));
      for (const li of items)
        li.hidden = year !== "all" && li.dataset.year !== year;
    };

    bar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-year]");
      if (!button) return;
      event.preventDefault();
      const year = button.dataset.year;
      show(year);
      const hash = year === "all" ? "" : "#year-" + year;
      history.replaceState(null, "", location.pathname + location.search + hash);
    });

    // open on the year in the url, if any
    show(location.hash.replace("#year-", "") || "all");
  };

  window.addEventListener("DOMContentLoaded", onLoad);
}
