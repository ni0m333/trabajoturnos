// Obtener referencias a las pantallas
const screenLogin = document.getElementById('screen-login');
const screenSelectTurn = document.getElementById('screen-select-turn');
const screenConfirmTurn = document.getElementById('screen-confirm-turn');
const screenMisTurnos = document.getElementById('screen-mis-turnos');
const screenAdmin = document.getElementById('screen-admin');

const btnLogin = document.getElementById('btn-login');
const btnConfirmTurn = document.getElementById('btn-confirm-turn');
const btnGoMisTurnos = document.getElementById('btn-go-mis-turnos');
const btnLogout = document.getElementById('btn-logout');
const btnLogoutAdmin = document.getElementById('btn-logout-admin');

const listTurns = document.getElementById('list-turns');

let turns = []; // Aquí guardamos turnos para mostrar en "Mis Turnos"

// Función para mostrar una pantalla y ocultar las demás
function showScreen(screenToShow) {
  const screens = [screenLogin, screenSelectTurn, screenConfirmTurn, screenMisTurnos, screenAdmin];
  screens.forEach(screen => {
    if (screen === screenToShow) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });
}

// Al hacer clic en iniciar sesión (sin validación real)
btnLogin.addEventListener('click', () => {
  const username = document.getElementById('input-username').value.trim();
  const password = document.getElementById('input-password').value.trim();

  if (username && password) {
    // Aquí puedes agregar validación real de usuario
    showScreen(screenSelectTurn);
  } else {
    alert('Por favor, ingresa usuario y contraseña');
  }
});

// Confirmar turno
btnConfirmTurn.addEventListener('click', () => {
  const specialty = document.getElementById('specialty').value;
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;

  if (!date) {
    alert('Por favor, selecciona una fecha');
    return;
  }

  // Guardar turno en array
  turns.push({
    specialty,
    doctor,
    date
  });

  showScreen(screenConfirmTurn);
});

// Ir a "Mis Turnos"
btnGoMisTurnos.addEventListener('click', () => {
  renderTurns();
  showScreen(screenMisTurnos);
});

// Cerrar sesión
btnLogout.addEventListener('click', () => {
  showScreen(screenLogin);
  clearLoginForm();
  clearTurns();
});

btnLogoutAdmin.addEventListener('click', () => {
  showScreen(screenLogin);
  clearLoginForm();
  clearTurns();
});

function clearLoginForm() {
  document.getElementById('input-username').value = '';
  document.getElementById('input-password').value = '';
}

function clearTurns() {
  turns = [];
  listTurns.innerHTML = '';
}

// Renderizar turnos en pantalla "Mis Turnos"
function renderTurns() {
  listTurns.innerHTML = '';
  if (turns.length === 0) {
    listTurns.innerHTML = '<li>No tienes turnos reservados.</li>';
    return;
  }
  turns.forEach((turn, index) => {
    const li = document.createElement('li');
    li.textContent = `${turn.specialty} - ${turn.doctor} - ${turn.date}`;
    listTurns.appendChild(li);
  });
}
