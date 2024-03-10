document.addEventListener("DOMContentLoaded", () => {
  const id = document.querySelector('meta[name="sentence_id"]').content;
  fetch(`/api/sentences/${id}`,  { headers: headers() }).then(response => response.json()).then(data => {
    fillData(data);
  });

  const destroy = document.getElementById('delete');
  destroy.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`/api/sentences/${id}`, { method: 'DELETE', headers: headers() }).then(response => response.json()).then(data => {
      if (data.id === id) {
        window.location.href = '/sentences';
      }
    });
  });
});

function fillData(sentence) {
  const id = document.getElementById('id');
  id.append(sentence.id);


  const content = document.getElementById('content');
  content.append(sentence.content);

  const cats = document.getElementById('cats');
  cats.append(sentence.cats.join(', '));
}
