document.addEventListener("DOMContentLoaded", () => {
  const id = document.querySelector('meta[name="sentence_id"]').content;
  fetch(`/api/sentences/${id}`).then(response => response.json()).then(data => {
    fillForm(data);
  });
});

function fillForm(sentence) {
  const content = document.getElementById('content');
  content.value = sentence.content;

  const cats = document.getElementById('cats');
  cats.value = sentence.cats.join(', ');

  const options = document.querySelectorAll('#cats option');
  for (const option of options) {
    if (sentence.cats.includes(option.value)) {
      option.selected = true;
    }
  }
}
