let elements;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded'); // Debugging point 1

    try {
        // DOM Elements dengan pengecekan
        elements = {
            button: document.getElementById('aiButton'),
            container: document.getElementById('aiChatContainer'),
            messages: document.getElementById('aiChatMessages'),
            input: document.getElementById('aiInput'),
            send: document.getElementById('aiSend'),
            close: document.getElementById('aiClose')
        };

        // Verifikasi semua elemen ditemukan
        for (const [key, element] of Object.entries(elements)) {
            if (!element) {
                console.error(`Element ${key} not found!`);
                return;
            }
        }

        console.log('All elements found:', elements);

        // Add event listeners after elements are defined
        elements.button.addEventListener('click', toggleChat);
        elements.close.addEventListener('click', toggleChat);
        elements.send.addEventListener('click', sendMessage);
        elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        elements.container.addEventListener('transitionend', () => {
            if (elements.container.classList.contains('active')) {
                elements.input.focus();
            }
        });

    } catch (error) {
        console.error('Error in AI chat owner:', error);
    }

    // Enhanced Responses Database
    const RESPONSES = {
        "toxic": [
            "Dan janganlah kamu memalingkan wajah dari manusia (karena sombong) dan janganlah berjalan di bumi dengan angkuh. Sungguh, Allah tidak menyukai orang yang sombong dan membanggakan diri.(QS. Luqman: 18)",
            "<a href='https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.detik.com/hikmah/doa-dan-hadits/d-7855713/rasulullah-saw-larang-muslim-berkata-kasar-ini-haditsnya%23:~:text%3DBerkata%2520kasar%2520atau%2520kotor%2520adalah,kata%252Dkata%2520yang%2520tak%2520pantas.%26text%3DAbu%2520Usamah%2520Salim%2520melalui%2520Syarah,berkata%2520kasar%2520adalah%2520perbuatan%2520tercela.&ved=2ahUKEwixo-3UopiPAxXpTmwGHVhTElAQFnoECCAQBQ&usg=AOvVaw1IOf9jY64EeUQyfto3CmAI' target='_blank' style='color:#00ff88; text-decoration:none;'>Konsekuensi Berkata Kasar:</a>\n\nDimurkai Allah SWT: Berkata kasar dan kotor adalah perbuatan yang dibenci Allah SWT.\n\nMerusak Hubungan: Perkataan kasar dapat merusak hubungan baik antar sesama manusia dan menimbulkan kebencian. \n\nMerusak Diri Sendiri: Perkataan kasar dapat mencerminkan akhlak yang buruk dan menjauhkan diri dari rahmat Allah SWT.",
            "Berkata kasar atau kotor adalah perbuatan tercela. Islam melarang umatnya untuk melontarkan kata-kata yang tak pantas.",
            "Ga boleh kasar ya! Mari kita jaga percakapan tetap sopan.",
            "Wah, kata-katanya tidak pantas nih. Yuk, kita bicara dengan baik-baik.",
            "Mohon hindari penggunaan kata-kata kasar. Kami di sini untuk membantu dengan profesional."
        ],
        "software": "🧩 <b>Software Design Kami:</b>\n\n• Adobe Photoshop\n• Figma\n• CorelDRAW\n• Alight Motion\n• IbisPaintX\n• Canva",
        "harga": "💰 <b>Daftar Harga:</b>\n\n• Logo Design: Rp 50.000-100.000\n• Poster: Rp 30.000-50.000\n• Banner: Rp 40.000-60.000\n• Social Media: Rp 30.000\n• Website Basic: Rp 100.000\n• Website Premium: Rp 150.000+\n\n*Harga bisa nego untuk project besar",
        "portofolio": "🎨 <b>Portfolio Kami:</b>\n\n• Behance: <a href='https://behance.net/xynelsdesign' target='_blank' style='color:#00ff88; text-decoration:none;'>nerusen graph</a>\n• Pinterest: <a href='https://pin.it/1qGkr8DKj' target='_blank' style='color:#00ff88; text-decoration:none;'>Nerusen</a>\n• Instagram: <a href='https://instagram.com/n31sen.st' target='_blank' style='color:#00ff88; text-decoration:none;'>n31sen.st</a>\n\nklik username berwarna <b style='color:#00ff88;'>hijau</b> untuk mengunjungi portofolio.",
        "testimoni": "💌 <b>Testimoni Klien:</b>\n\n\"Hasil desain sangat memuaskan!\" - Valz Store\n\"Pelayanan cepat dan profesional\" - M Dirgantara\n\"Logo yang dibuat sangat unik dan kreatif\" - Genom Shop",
        "proses": "⏱️ <b>Proses Kerja:</b>\n\n1. Konsultasi kebutuhan\n2. Pembayaran DP 50%\n3. Pengerjaan draft awal\n4. Revisi (max 3x)\n5. Finalisasi & pelunasan\n6. Pengiriman file final",
        "faq": "❓ <b>FAQ:</b>\n\nQ: Berapa lama pengerjaan?\nA: 3-7 hari tergantung kompleksitas\n\nQ: Format file apa saja yang diberikan?\nA: JPG, PNG, PDF, PSD (sesuai kebutuhan)\n\nQ: Bisa revisi berapa kali?\nA: Maksimal 3x revisi, selebihnya dikenakan biaya",
        "sosmed": "📱 <b>Sosial Media:</b>\n\n• Instagram: @n31sen.st\n• WhatsApp: +6287811007088\n• Behance: behance.net/xynelsdesign\n• Pinterest: https://pin.it/1qGkr8DKj",
        "jasa": "💼 <b>Jasa Lainnya:</b>\n\n• Desain Merchandise\n• Desain Kemasan\n• Desain Banner Event\n• Desain Kartu Nama\n• Desain Poster Game",
        "pembayaran": "💳 <b>Metode Pembayaran:</b>\n\n• Transfer Bank (not available)\n• QRIS (Scan & Pay)\n• Dana/OVO/GoPay\n• PayPal (untuk klien luar negeri)",
        "waktu": "⏰ <b>Jam Operasional:</b>\n\nSenin-Jumat: 09.00 - 20.00 WIB\nSabtu: 09.00 - 17.00 WIB\nMinggu & Hari Libur: Tutup",
        "promo": "🎫 <b>Promo Spesial:</b>\n\n• Diskon 10% untuk order pertama\n• Paket bundling poster + social media\n• Free 1x revisi tambahan untuk order >Rp 100.000\n\nGunakan kode: <b>#NERUSEN31</b> untuk mendapatkan diskon 31%",
        "qris": {
            type: "image",
            url: "assets/images/qris.jpg",
            caption: "💳 <b>QRIS</b>\nfor pay or support",
            class: "qris-image"
        },
        "kontak": {
            type: "contact",
            profile: "assets/images/profile.jpg",
            name: "Nelsen Chandra",
            phone: "+6287811007088",
            bio: "Graphic Designer"
        },
        "menu": {
            type: "menu",
            items: [
                { id: "software", text: "Software", keywords: ["software", "app", "aplikasi", "tools", "program", "editing"] },
                { id: "harga", text: "Harga", keywords: ["harga", "price", "biaya", "fee", "tarif", "rate", "budget"] },
                { id: "portofolio", text: "Portofolio", keywords: ["portofolio", "karya", "project", "sample", "gallery", "koleksi"] },
                { id: "qris", text: "QRIS", keywords: ["qris", "scan", "qr", "qrcode"] },
                { id: "kontak", text: "Kontak", keywords: ["kontak", "contact", "hubungi", "nomor", "whatsapp", "wa", "telepon", "cs"] },
                { id: "testimoni", text: "Testimoni", keywords: ["testimoni", "review", "ulasan", "komentar", "rating", "client", "feedback", "penilaian", "testimony"] },
                { id: "proses", text: "Proses", keywords: ["proses", "tahapan", "alur", "prosedur", "mekanisme", "timeline"] },
                { id: "faq", text: "FAQ", keywords: ["faq", "pertanyaan", "qna", "bantuan", "help", "tanya", "question", "helpdesk"] },
                { id: "sosmed", text: "Sosial Media", keywords: ["sosmed", "ig", "tiktok", "instagram", "akun", "follow"] },
                { id: "jasa", text: "Jasa", keywords: ["jasa", "layanan", "service", "penawaran", "list", "katalog"] },
                { id: "pembayaran", text: "Payment", keywords: ["pembayaran", "payment", "bayar", "transfer", "gopay", "dana", "paypal"] },
                { id: "waktu", text: "Waktu", keywords: ["waktu", "jadwal", "operasional", "open", "jam", "durasi"] },
                { id: "promo", text: "Promo", keywords: ["promo", "diskon", "voucher", "potongan", "promosi", "deal", "bonus", "giveaway", "hadiah"] },
                // Item "toxic" dihapus dari menu tapi tetap dipertahankan dalam database RESPONSES
            ]
        },
        "default": "❌ <b>Maaf saya tidak mengerti</b>\n\nKetik <b style='color:#ffeb3b;'> menu</b> untuk melihat opsi yang tersedia\n\n<a href='https://github.com/nerusen' target='_blank' style='color:#00ff88; text-decoration:none;'>© Nelsen Chandra 2025</a>"
    };

    // Daftar kata-kata toxic yang lebih lengkap
    const TOXIC_KEYWORDS = [
        "cok", "kontol", "memek", "puki", "asu", "anjing", "bangsat", "goblok", "tolol", 
        "bodoh", "setan", "jancok", "jancuk", "bajingan", "kampret", "kirik", "tai", 
        "bego", "idiot", "gblk", "ngentot", "pepek", "pantek", "babi", "bangsad",
        "fuck", "shit", "asshole", "bitch", "dick", "pussy", "motherfucker", "cunt",
        "dumb", "stupid", "retard", "bastard", "son of a bitch", "damn", "hell"
    ];

    // Initialize Chat
    function initChat() {
        elements.messages.innerHTML = '';
        addMessage("👋🏻 Welcome to <b>Nerusen AI</b>, Ini adalah bot yang dibuat oleh <b style='color:#00ff88;'>Nelsen Chandra</b>. Bot ini masih tahap pengembangan.\n\nKetik <b style='color:#ffeb3b;'> menu</b> untuk melihat opsi yang tersedia\n\n<a href='https://github.com/nerusen' target='_blank' style='color:#ffffff; opacity:0.7; text-decoration:none; font-size:10px;'>© Nelsen Chandra 2025</a>", 'bot');
    }

    // Add Message Function
    function addMessage(content, sender, type = "text", meta = {}) {
        if (sender === 'bot') {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                createMessageElement(content, sender, type, meta);
                scrollToBottom();
            }, calculateTypingDelay(content));
        } else {
            createMessageElement(content, sender, type, meta);
            scrollToBottom();
        }
    }

    function createMessageElement(content, sender, type, meta) {
        const message = document.createElement('div');
        message.className = `ai-message ai-message-${sender}`;
        
        switch(type) {
            case "image":
                const imgClass = meta.class || 'bot-image';
                if (imgClass === 'qris-image') {
                    message.innerHTML = `
                        <div class="ai-message-content">
                            <div class="qris-container">
                                <img src="${content}" class="${imgClass}">
                                <button class="view-qris-btn" onclick="window.open('/qris.jpg', '_blank')">
                                    <i class="fas fa-eye"></i> View
                                </button>
                            </div>
                            <div class="image-caption">${meta.caption || ''}</div>
                        </div>`;
                } else {
                    message.innerHTML = `
                        <div class="ai-message-content">
                            <img src="${content}" class="${imgClass}">
                            <div class="image-caption">${meta.caption || ''}</div>
                        </div>`;
                }
                break;
                
            case "menu":
                const menuItems = RESPONSES.menu.items.map(item => 
                    `<div class="ai-menu-item" data-id="${item.id}">
                        <div class="menu-text">${item.text}</div>
                    </div>`
                ).join('');
                
                message.innerHTML = `
                    <div class="ai-menu-container">
                        <div class="ai-menu-title">
                            <i class="fas fa-list"></i> Menu yang tersedia
                        </div>
                        <div class="ai-menu-grid">
                            ${menuItems}
                        </div>
                    </div>`;
                
                setTimeout(() => {
                    document.querySelectorAll('.ai-menu-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const id = item.getAttribute('data-id');
                            handleMenuSelection(id);
                        });
                    });
                }, 50);
                break;
                
            case "contact":
                message.innerHTML = `
                    <div class="ai-contact-card">
                        <img src="${meta.profile}" class="ai-contact-profile">
                        <div class="ai-contact-name">${meta.name}</div>
                        <div class="ai-contact-bio">${meta.bio}</div>
                        <div class="ai-contact-phone">${meta.phone}</div>
                        <div class="ai-contact-buttons">
                            <button class="ai-contact-btn ai-contact-chat">
                                <i class="fab fa-whatsapp"></i> Chat
                            </button>
                            <button class="ai-contact-btn ai-contact-copy">
                                <i class="fas fa-copy"></i> Salin
                            </button>
                        </div>
                    </div>`;
                break;
                
            default:
                message.innerHTML = `
                    <div class="ai-message-content">
                        ${content.replace(/\n/g, '<br>')}
                    </div>`;
        }
        
        elements.messages.appendChild(message);
    }

    function handleMenuSelection(id) {
        const response = RESPONSES[id];
        if (!response) return;
        
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            if (typeof response === 'object') {
                addMessage(response.url || response.items || response.profile, 'bot', response.type, response);
            } else {
                addMessage(response, 'bot');
            }
        }, 800);
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'typingIndicator';
        typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
        elements.messages.appendChild(typingIndicator);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) typingIndicator.remove();
    }

    function calculateTypingDelay(content) {
        const wordCount = content.split(/\s+/).length;
        return Math.min(Math.max(wordCount * 200, 800), 3000);
    }

    function getBotResponse(prompt) {
        const lowerPrompt = prompt.toLowerCase().trim();
        
        if (lowerPrompt === 'menu') return RESPONSES.menu;
        if (RESPONSES[lowerPrompt]) return RESPONSES[lowerPrompt];
        
        // Memeriksa kata-kata toxic
        if (TOXIC_KEYWORDS.some(kw => lowerPrompt.includes(kw))) {
            // Memilih respons toxic secara acak
            const randomIndex = Math.floor(Math.random() * RESPONSES.toxic.length);
            return RESPONSES.toxic[randomIndex];
        }
        
        for (const item of RESPONSES.menu.items) {
            if (item.keywords.some(kw => lowerPrompt.includes(kw))) {
                return RESPONSES[item.id];
            }
        }
        
        return RESPONSES.default;
    }

    function sendMessage() {
        const message = elements.input.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        elements.input.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            if (response?.type === "menu") {
                createMenu();
            } else if (typeof response === 'object') {
                addMessage(response.url || response.items || response.profile, 'bot', response.type, response);
            } else {
                addMessage(response, 'bot');
            }
        }, 500);
    }

    function createMenu() {
        hideTypingIndicator();
        addMessage("", 'bot', "menu");
    }

    function scrollToBottom() {
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function toggleChat() {
        elements.container.classList.toggle('active');
        if (elements.container.classList.contains('active') && elements.messages.children.length <= 2) {
            initChat();
        }
    }
});
