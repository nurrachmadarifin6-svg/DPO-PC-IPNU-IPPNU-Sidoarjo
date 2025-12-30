// ===============================
// NAVIGASI SINGLE PAGE
// ===============================
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // hapus active di menu
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // ambil target halaman
    const page = link.dataset.page;

    // sembunyikan semua section
    sections.forEach((sec) => sec.classList.remove("active"));

    // tampilkan section tujuan
    document.getElementById(page).classList.add("active");
  });
});

document.querySelectorAll(".fitur-card").forEach((card) => {
  card.addEventListener("click", () => {
    const page = card.dataset.page;

    // sembunyikan semua section
    document.querySelectorAll("section").forEach((sec) => {
      sec.classList.remove("active");
    });

    // tampilkan section tujuan
    document.getElementById(page).classList.add("active");

    // update menu aktif
    document.querySelectorAll("nav a").forEach((a) => {
      a.classList.remove("active");
      if (a.dataset.page === page) {
        a.classList.add("active");
      }
    });

    // update URL (opsional, tapi keren)
    history.pushState(null, "", `#${page}`);

    // scroll ke atas
    window.scrollTo(0, 0);
  });
});

const API_UPLOAD =
  "https://script.google.com/macros/s/AKfycbyoC6nBY24BE-qNNAAh_aQ7xSRVp00te25TduJXZiVw5GSajRx4SDydhqQib91n9uE/exec";

const form = document.getElementById("formPengumpulan");
const statusDiv = document.getElementById("statusUpload");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("fileUpload");
  const jenis = document.getElementById("jenisBerkas").value;

  if (!fileInput.files.length || !jenis) {
    alert("Lengkapi data!");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    statusDiv.innerHTML = "⏳ Mengunggah file...";

    const base64 = reader.result.split(",")[1];

    try {
      const res = await fetch(API_UPLOAD, {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type,
          data: base64,
          folder: jenis,
        }),
      });

      const result = await res.json();

      if (result.success) {
        statusDiv.innerHTML = "✅ Upload berhasil!";
        form.reset();
      } else {
        statusDiv.innerHTML = "❌ Upload gagal.";
      }
    } catch (err) {
      statusDiv.innerHTML = "❌ Error koneksi.";
    }
  };

  reader.readAsDataURL(file);
});

const API_URL =
  "https://script.google.com/macros/s/AKfycbx-GeaC1sl5_uh_zotCg56mlik_5WPXAPZRx7_Y37xmUSE0Wgdyr6CnXO57VCE-igY/exec";

async function loadKonferensi() {
  const container = document.getElementById("konferensiContainer");
  container.innerHTML = "<p>Memuat data...</p>";

  try {
    const res = await fetch(API_URL);
    const files = await res.json();

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${file.thumbnail}" alt="${file.name}">
        <div class="card-title">${file.name}</div>
        <a href="${file.url}" target="_blank" class="download-btn">Download</a>
      `;

      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

const API_URL_K =
  "https://script.google.com/macros/s/AKfycbwCc9fxexIMPEraBa08xhOxQzM7MddQIzaE9KEK2W1w0FyU5-LmDHGa-JAreM9Mb8Y/exec";

async function loadPedoman() {
  const container = document.getElementById("pedomanContainer");
  container.innerHTML = "<p>Memuat data...</p>";

  try {
    const res = await fetch(API_URL_K);
    const files = await res.json();

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${file.thumbnail}" alt="${file.name}">
        <div class="card-title">${file.name}</div>
        <a href="${file.url}" target="_blank" class="download-btn">Download</a>
      `;

      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

const API_URL_foto =
  "https://script.google.com/macros/s/AKfycbya25n9pWrxzgzmYBC0RIg-GltaHaG9X2c7ZoZhj8NmATM43jqM9AXecWS7Rq0LVSg/exec";

async function loadDokumentasi() {
  const container = document.getElementById("dokumentasiContainer");
  container.innerHTML = "<p>Memuat dokumentasi...</p>";

  try {
    const res = await fetch(API_URL_foto);
    const files = await res.json();

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("doc-card");

      card.innerHTML = `
        <a href="${file.url}" target="_blank" title="${file.name}">
          <img src="${file.thumbnail}" alt="${file.name}">
        </a>
        <div class="doc-title">${file.name}</div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red'>Gagal memuat dokumentasi.</p>";
  }
}

window.onload = () => {
  loadKonferensi();
  loadPedoman();
  loadDokumentasi();
};

const menuToggle = document.getElementById("menuToggle");
const navUl = document.querySelector("nav ul");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // ⛔ hentikan bubbling
  navUl.classList.toggle("show");
});

document.addEventListener("click", function (e) {
  if (!menuToggle.contains(e.target) && !navUl.contains(e.target)) {
    navUl.classList.remove("show");
  }
});

function openWA(nomor) {
  window.open(
    "https://wa.me/" +
      nomor +
      "?text=Assalamu%27alaikum%20Admin%2C%20saya%20ingin%20bertanya.",
    "_blank"
  );
}

// Show button after scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".wa-button").forEach((btn) => {
    if (window.scrollY > 200) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });
});
