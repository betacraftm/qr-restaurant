const getTheme = () => {
  const theme = localStorage.getItem("theme") || "light";
  document.querySelector("html").setAttribute("data-theme", theme);
};

export default getTheme;
