// Dark mode
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.innerHTML = document.body.classList.contains('dark')
      ? '<i class="fas fa-sun"></i> Light'
      : '<i class="fas fa-moon"></i> Dark';
  });
}

// Helper: update file list
function updateFileList(containerId, files) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  Array.from(files).forEach((f) => {
    const div = document.createElement('div');
    div.textContent = f.name + (f.size ? ` (${(f.size / 1024).toFixed(1)} KB)` : '');
    container.appendChild(div);
  });
}

// Set active nav link based on current page
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const href = btn.getAttribute('href');
    if (href === currentPage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);