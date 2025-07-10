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

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value;
  const status = document.getElementById("addStatus");

  try {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const result = await response.json();
      status.textContent = `Estudiante agregado con ID: ${result.id}`;
      status.style.color = "green";
      document.getElementById("studentName").value = "";

      // Opcional: recargar la tabla automáticamente
      document.getElementById("loadButton").click();
    } else {
      const error = await response.json();
      status.textContent = error.error || "Error al agregar estudiante";
      status.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Error de conexión";
    status.style.color = "red";
  }
});

