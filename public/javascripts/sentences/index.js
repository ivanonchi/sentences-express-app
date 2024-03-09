document.addEventListener("DOMContentLoaded", () => {
  let orderBy = "content";
  let direction = "asc";

  fetchSentences(orderBy, direction);

  document.getElementById("previous").addEventListener("click", (event) => {
    event.preventDefault();
    const cursor = encodeURIComponent(
      document.getElementById("previous").dataset.cursor
    );
    fetchSentences(orderBy, direction, cursor, "previous");
  });

  document.getElementById("next").addEventListener("click", (event) => {
    event.preventDefault();
    const cursor = encodeURIComponent(
      document.getElementById("next").dataset.cursor
    );
    fetchSentences(orderBy, direction, cursor, "next");
  });

  document.getElementById("order").addEventListener("change", (event) => {
    event.preventDefault();
    orderBy = event.target.value;
    fetchSentences(orderBy, direction);
  });

  document.getElementById("direction").addEventListener("change", (event) => {
    event.preventDefault();
    direction = event.target.value;
    fetchSentences(orderBy, direction);
  });
});

function generateRows(sentences) {
  const tbody = document.getElementById("sentences-tbody");
  tbody.innerHTML = "";
  sentences.forEach((sentence) => {
    const row = document.createElement("tr");

    generateCell(row, sentence.id);
    generateCell(row, sentence.content);
    generateCell(row, sentence.cats.join(", "));

    // actions column
    const actions = document.createElement("td");

    const show = createLink("Show", `/sentences/${sentence.id}`);
    const edit = createLink("Edit", `/sentences/${sentence.id}/edit`);
    const destroy = createLink("Delete", `#`);
    destroy.addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`/api/sentences/${sentence.id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.id === sentence.id) {
            row.remove();
          }
        });
    });

    actions.append(show, " ", edit, " ", destroy);

    row.appendChild(actions);
    tbody.appendChild(row);
  });
}

function generateCell(row, content) {
  const cell = document.createElement("td");
  cell.innerText = content;
  row.appendChild(cell);
}

function createLink(text, link) {
  const a = document.createElement("a");
  a.href = link;
  a.innerText = text;
  return a;
}

function updatePagination(data) {
  if (data.sentences.length === 0) {
    return;
  }

  const sentences = data.sentences;
  generateRows(sentences);
  document.getElementById("previous").dataset.cursor = sentences[0].id;
  document.getElementById("next").dataset.cursor =
    sentences[sentences.length - 1].id;
}

function fetchSentences(
  orderBy = null,
  direction = "asc",
  cursor = null,
  page = null
) {
  let url = "/api/sentences";

  url += `?orderBy=${orderBy}&direction=${direction}`;
  if (cursor) {
    url += `&cursor=${cursor}&page=${page}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updatePagination(data);
    });
}
