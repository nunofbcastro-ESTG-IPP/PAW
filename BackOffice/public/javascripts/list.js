function paginationSelect(page) {
  const pageSelect = document.getElementById(page);
  if (typeof pageSelect != "undefined") {
    pageSelect.classList.add("text-blue-600");
    pageSelect.classList.add("bg-blue-50");
  }
}
