document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filter-btn");
  const filterOptions = document.getElementById("filter-options");
  const applyFilterBtn = document.getElementById("apply-filter");

  // Mostrar u ocultar el menú de filtros
  filterBtn.addEventListener("click", () => {
    filterOptions.style.display = filterOptions.style.display === "block" ? "none" : "block";
  });

  // Filtrar recetas
  applyFilterBtn.addEventListener("click", () => {
    const selectedCulture = document.getElementById("filter-culture").value;
    const selectedTime = document.getElementById("filter-time").value;
    const selectedDifficulty = document.getElementById("filter-difficulty").value;
    const recipes = document.querySelectorAll(".recipe-card");

    recipes.forEach(recipe => {
      const recipeCulture = recipe.getAttribute("data-culture");
      const recipeTime = recipe.getAttribute("data-time");
      const recipeDifficulty = recipe.getAttribute("data-difficulty");

      const matchesCulture = !selectedCulture || selectedCulture === recipeCulture;
      const matchesTime = !selectedTime || selectedTime === recipeTime;
      const matchesDifficulty = !selectedDifficulty || selectedDifficulty === recipeDifficulty;

      if (matchesCulture && matchesTime && matchesDifficulty) {
        recipe.style.display = "inline-block";
      } else {
        recipe.style.display = "none";
      }
    });
  });
});
