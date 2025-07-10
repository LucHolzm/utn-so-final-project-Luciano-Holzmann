document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
document.getElementById("greetButton").addEventListener("click", () => {
  const nombre = document.getElementById("nameInput").value;

  fetch(`/api/greet?name=${nombre}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("saludoResultado").innerText = data.message;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("saludoResultado").innerText = "Error al obtener el saludo.";
    });
});
