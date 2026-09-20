document.addEventListener("DOMContentLoaded", function () {

    const openButton =
        document.getElementById("open-invitation");

    const opening =
        document.getElementById("opening");

    const mainContent =
        document.getElementById("main-content");

    const weddingMusic =
        document.getElementById("wedding-music");

        // ==========================================
// CUSTOM GUEST NAME
// ==========================================

const guestNameElement =
    document.getElementById("guest-name");

const urlParams =
    new URLSearchParams(window.location.search);

const guestName =
    urlParams.get("to");

if (guestNameElement && guestName) {
    guestNameElement.textContent =
        guestName;
}

    openButton.addEventListener("click", function () {

        console.log("OPEN DIKLIK");


        // ==========================================
        // 1. TAMPILKAN PAGE 2
        // ==========================================

        if (mainContent) {
            mainContent.hidden = false;
            console.log("✅ PAGE 2 MUNCUL");
        }


        // ==========================================
        // 2. HILANGKAN OPENING
        // ==========================================

        if (opening) {
            opening.style.display = "none";
            console.log("✅ OPENING HILANG");
        }


        // ==========================================
        // 3. PLAY MUSIC
        // ==========================================

        if (weddingMusic) {

            weddingMusic.volume = 0.7;

            weddingMusic.play()
                .then(function () {

                    console.log("🎵 MUSIC BERHASIL PLAY");

                })
                .catch(function (error) {

                    console.error(
                        "❌ MUSIC TIDAK BISA PLAY:",
                        error
                    );

                });

        } else {

            console.error(
                "❌ ELEMENT WEDDING MUSIC TIDAK DITEMUKAN"
            );

        }

    });

});
// ==================================================
// COUNTDOWN
// ==================================================

// GANTI DENGAN TANGGAL DAN JAM ACARA KAMU
const weddingDate = new Date(
    "2026-12-12T08:00:00+07:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    // Jika waktu sudah habis
    if (distance <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;
    }


    // ==============================
    // DAYS
    // ==============================

    const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );


    // ==============================
    // HOURS
    // ==============================

    const hours = Math.floor(
        (distance %
            (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    // ==============================
    // MINUTES
    // ==============================

    const minutes = Math.floor(
        (distance %
            (1000 * 60 * 60)) /
        (1000 * 60)
    );


    // ==============================
    // SECONDS
    // ==============================

    const seconds = Math.floor(
        (distance %
            (1000 * 60)) /
        1000
    );


    // ==============================
    // DISPLAY
    // ==============================

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


// Jalankan saat halaman dibuka
updateCountdown();


// Update setiap 1 detik
setInterval(updateCountdown, 1000);

(function () {

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbwfbsll8e6d-8nI_EbO7vIzf35UikkhQrKXpJs9wiG1cGVcIaYihdD1FkAQydpnGoZS/exec";


    const nameInput =
        document.getElementById("rsvp-guest-name");

    const wishInput =
        document.getElementById("guest-wish");

    const submitButton =
        document.getElementById("rsvp-submit");

    const statusText =
        document.getElementById("rsvp-status");

    const attendanceButtons =
        document.querySelectorAll(
            "#section-7 .attendance-button"
        );

    const wishesList =
        document.getElementById("wishes-list");

    const wishesCount =
        document.getElementById("wishes-count");

    const wishesPagination =
        document.getElementById(
            "wishes-pagination"
        );


    if (
        !nameInput ||
        !wishInput ||
        !submitButton ||
        !statusText
    ) {
        console.error(
            "❌ RSVP elements tidak ditemukan."
        );
        return;
    }


    let selectedAttendance = "";
    let wishes = [];
    let currentPage = 1;

    const wishesPerPage = 3;


    /* =========================
       ATTENDANCE BUTTON
    ========================= */

    attendanceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                attendanceButtons.forEach(
                    function (item) {
                        item.classList.remove(
                            "selected"
                        );
                    }
                );

                button.classList.add("selected");

                selectedAttendance =
                    button.getAttribute(
                        "data-attendance"
                    );
            }
        );

    });


    /* =========================
       RENDER WISHES
    ========================= */

    function renderWishes() {

        if (!wishesList) return;

        wishesList.innerHTML = "";


        if (wishes.length === 0) {

            wishesList.innerHTML = `
                <div class="wish-item">
                    <div class="wish-message">
                        Be the first to send a wish 🤍
                    </div>
                </div>
            `;

            if (wishesCount) {
                wishesCount.textContent =
                    "0 Wishes";
            }

            if (wishesPagination) {
                wishesPagination.innerHTML = "";
            }

            return;
        }


        if (wishesCount) {

            wishesCount.textContent =
                wishes.length + " Wishes";

        }


        const startIndex =
            (currentPage - 1) * wishesPerPage;

        const endIndex =
            startIndex + wishesPerPage;


        const currentWishes =
            wishes.slice(
                startIndex,
                endIndex
            );


        currentWishes.forEach(
            function (wish) {

                const item =
                    document.createElement("div");

                item.className =
                    "wish-item";


                const name =
                    document.createElement("div");

                name.className =
                    "wish-name";

                name.textContent =
                    wish.name;


                const message =
                    document.createElement("div");

                message.className =
                    "wish-message";

                message.textContent =
                    wish.message;


                item.appendChild(name);
                item.appendChild(message);

                wishesList.appendChild(item);

            }
        );


        renderPagination();
    }


    /* =========================
       PAGINATION
    ========================= */

    function renderPagination() {

        if (!wishesPagination) return;

        wishesPagination.innerHTML = "";


        const totalPages =
            Math.ceil(
                wishes.length /
                wishesPerPage
            );


        if (totalPages <= 1) return;


        const previous =
            document.createElement("button");

        previous.type = "button";

        previous.className =
            "page-button";

        previous.textContent =
            "← Previous";

        previous.disabled =
            currentPage === 1;


        previous.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    renderWishes();

                }

            }
        );


        wishesPagination.appendChild(
            previous
        );


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const pageButton =
                document.createElement("button");

            pageButton.type = "button";

            pageButton.className =
                "page-button";

            pageButton.textContent =
                page;


            if (page === currentPage) {

                pageButton.classList.add(
                    "active"
                );

            }


            pageButton.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    renderWishes();

                }
            );


            wishesPagination.appendChild(
                pageButton
            );

        }


        const next =
            document.createElement("button");

        next.type = "button";

        next.className =
            "page-button";

        next.textContent =
            "Next →";

        next.disabled =
            currentPage === totalPages;


        next.addEventListener(
            "click",
            function () {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderWishes();

                }

            }
        );


        wishesPagination.appendChild(next);

    }


    /* =========================
       LOAD WISHES FROM GOOGLE SHEET
    ========================= */

    function loadWishes() {

        const callbackName =
            "weddingWishesCallback_" +
            Date.now();


        window[callbackName] =
            function (data) {

                try {

                    wishes =
                        Array.isArray(data)
                            ? data.reverse()
                            : [];

                    currentPage = 1;

                    renderWishes();

                } catch (error) {

                    console.error(
                        "❌ Gagal membaca wishes:",
                        error
                    );

                }


                delete window[callbackName];

                if (script.parentNode) {
                    script.parentNode.removeChild(
                        script
                    );
                }

            };


        const script =
            document.createElement("script");


        script.src =
            GOOGLE_SCRIPT_URL +
            "?callback=" +
            callbackName +
            "&t=" +
            Date.now();


        script.onerror =
            function () {

                console.error(
                    "❌ Tidak dapat mengambil data Google Sheets."
                );

                delete window[callbackName];

                if (script.parentNode) {
                    script.parentNode.removeChild(
                        script
                    );
                }

            };


        document.body.appendChild(script);

    }


    /* =========================
       SUBMIT RSVP
    ========================= */

    submitButton.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();
            event.stopPropagation();


            const name =
                nameInput.value.trim();

            const wish =
                wishInput.value.trim();


            /* VALIDASI */

            if (!name) {

                statusText.textContent =
                    "Please enter your name.";

                nameInput.focus();

                return;
            }


            if (!selectedAttendance) {

                statusText.textContent =
                    "Please select your attendance.";

                return;
            }


            if (!wish) {

                statusText.textContent =
                    "Please write your wish.";

                wishInput.focus();

                return;
            }


            /* DATA */

            const formData = {

                name: name,

                attendance:
                    selectedAttendance,

                wish: wish

            };


            /* BUTTON */

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";

            statusText.textContent =
                "Please wait...";


            try {

                /*
                 * Kirim ke Google Sheets.
                 *
                 * text/plain dipakai agar
                 * tidak memicu CORS preflight.
                 */

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )
                    }
                );


                /* 
                 * Tampilkan langsung
                 * di website.
                 */

                wishes.unshift({

                    name: name,

                    attendance:
                        selectedAttendance,

                    message: wish

                });


                currentPage = 1;

                renderWishes();


                /* SUCCESS */

                statusText.textContent =
                    "Thank you for your RSVP 🤍";


                /* RESET */

                nameInput.value = "";

                wishInput.value = "";

                selectedAttendance = "";


                attendanceButtons.forEach(
                    function (button) {

                        button.classList.remove(
                            "selected"
                        );

                    }
                );


                submitButton.textContent =
                    "Submitted ✓";


                /*
                 * Ambil ulang data dari
                 * Google Sheets setelah beberapa
                 * saat agar data terbaru masuk.
                 */

                setTimeout(
                    function () {
                        loadWishes();
                    },
                    1500
                );


                setTimeout(
                    function () {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Submit RSVP";

                    },
                    1800
                );


            } catch (error) {

                console.error(
                    "❌ RSVP ERROR:",
                    error
                );


                statusText.textContent =
                    "Something went wrong. Please try again.";


                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Submit RSVP";

            }

        }
    );


    /* =========================
       LOAD DATA SAAT WEBSITE DIBUKA
    ========================= */

    renderWishes();

    loadWishes();


})();