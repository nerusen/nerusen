document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        button: document.getElementById('aiButton'),
        container: document.getElementById('aiChatContainer'),
        messages: document.getElementById('aiChatMessages'),
        input: document.getElementById('aiInput'),
        send: document.getElementById('aiSend'),
        close: document.getElementById('aiClose')
    };

    // Enhanced Responses Database
    const RESPONSES = {
        // Text Responses
        "software": "🛠️ <b>Software Design Kami:</b>\n\n• Adobe Photoshop\n• Adobe Illustrator\n• Figma (UI/UX)\n• CorelDRAW\n• Procreate\n• Blender (3D)\n• Canva (Quick Design)",
        "harga": "💰 <b>Daftar Harga:</b>\n\n• Logo Design: Rp 300.000-800.000\n• Banner: Rp 150.000-300.000\n• Social Media Kit: Rp 500.000\n• Website Basic: Rp 1.500.000\n• Website Premium: Rp 3.500.000+\n\n*Harga bisa nego untuk project besar",
        "portfolio": "🎨 <b>Portfolio Kami:</b>\n\n• Behance: <a href='https://behance.net/xynelsdesign' target='_blank' style='color:#00ff88;'>behance.net/xynelsdesign</a>\n• Dribbble: <a href='https://dribbble.com/nelsen' target='_blank' style='color:#00ff88;'>dribbble.com/nelsen</a>\n• Instagram: @n31sen.st",
        "testimoni": "🌟 <b>Testimoni Klien:</b>\n\n\"Hasil desain sangat memuaskan!\" - PT. Abadi Jaya\n\"Pelayanan cepat dan profesional\" - CV. Mandiri Sejahtera\n\"Logo yang dibuat sangat unik\" - Toko Online Sinar Baru",
        "proses": "🔄 <b>Proses Kerja:</b>\n\n1. Konsultasi kebutuhan\n2. Pembayaran DP 50%\n3. Pengerjaan draft awal\n4. Revisi (max 3x)\n5. Finalisasi & pelunasan\n6. Pengiriman file final",
        "faq": "❓ <b>FAQ:</b>\n\nQ: Berapa lama pengerjaan?\nA: 3-7 hari tergantung kompleksitas\n\nQ: Format file apa saja yang diberikan?\nA: JPG, PNG, PDF, AI, PSD (sesuai kebutuhan)\n\nQ: Bisa revisi berapa kali?\nA: Maksimal 3x revisi",
        "sosmed": "📱 <b>Sosial Media:</b>\n\n• Instagram: @n31sen.st\n• WhatsApp: +6287811007088\n• Behance: behance.net/xynelsdesign\n• Dribbble: dribbble.com/nelsen",
        "jasa": "💼 <b>Jasa Lainnya:</b>\n\n• Desain Merchandise\n• Desain Kemasan\n• Desain Banner Event\n• Desain Kartu Nama\n• Desain Undangan Digital",
        "pembayaran": "💳 <b>Metode Pembayaran:</b>\n\n• Transfer Bank (BCA, BRI, Mandiri)\n• QRIS (Scan & Pay)\n• Dana/OVO/GoPay\n• PayPal (untuk klien luar negeri)",
        "waktu": "⏰ <b>Jam Operasional:</b>\n\nSenin-Jumat: 09.00 - 17.00 WIB\nSabtu: 09.00 - 14.00 WIB\nMinggu & Hari Libur: Tutup",
        "promo": "🎉 <b>Promo Spesial:</b>\n\n• Diskon 10% untuk order pertama\n• Paket bundling logo + social media kit\n• Free 1x revisi tambahan untuk order >Rp 1jt\n\nGunakan kode: <b>NERUSEN10</b>",
        
        // Menu System - Diperbarui Total dengan Grid Layout
        "menu": {
            type: "menu",
            items: [
                { 
                    id: "software", 
                    text: "Software",
                    keywords: ["software", "aplikasi", "tool", "program", "perangkat", "alat", "desain", "design", "app"]
                },
                { 
                    id: "harga", 
                    text: "Harga",
                    keywords: ["harga", "biaya", "price", "fee", "tarif", "bayar", "uang", "mahal", "murah", "cost", "budget"]
                },
                { 
                    id: "portfolio", 
                    text: "Portfolio",
                    keywords: ["portfolio", "karya", "desain", "work", "hasil", "contoh", "sample", "referensi", "hasil kerja", "project"]
                },
                { 
                    id: "qris", 
                    text: "QRIS",
                    keywords: ["qris", "pembayaran", "bayar", "donasi", "payment", "transfer", "uang", "dana", "scan", "qrcode"]
                },
                { 
                    id: "kontak", 
                    text: "Kontak",
                    keywords: ["kontak", "whatsapp", "wa", "call", "hubung", "contact", "telepon", "nomor", "alamat", "info", "customer service"]
                },
                { 
                    id: "testimoni", 
                    text: "Testimoni",
                    keywords: ["testimoni", "review", "ulasan", "komentar", "klien", "pelanggan", "feedback", "rating", "penilaian"]
                },
                { 
                    id: "proses", 
                    text: "Proses Kerja",
                    keywords: ["proses", "kerja", "cara", "alur", "tahap", "langkah", "pengerjaan", "workflow", "sistem", "metode"]
                },
                { 
                    id: "faq", 
                    text: "FAQ",
                    keywords: ["faq", "tanya", "pertanyaan", "bantuan", "help", "tutorial", "how to", "cara", "question", "answer"]
                },
                { 
                    id: "sosmed", 
                    text: "Sosmed",
                    keywords: ["sosmed", "sosial media", "media sosial", "instagram", "facebook", "twitter", "tiktok", "behance", "dribbble", "social"]
                },
                { 
                    id: "jasa", 
                    text: "Jasa Lain",
                    keywords: ["jasa", "lainnya", "service", "layanan", "servis", "produk", "tambahan", "other", "additional", "extra"]
                },
                { 
                    id: "pembayaran", 
                    text: "Pembayaran",
                    keywords: ["pembayaran", "metode", "bayar", "transfer", "qris", "dana", "ovo", "gopay", "paypal", "payment method"]
                },
                { 
                    id: "waktu", 
                    text: "Jam Operasi",
                    keywords: ["waktu", "jam", "operasional", "buka", "tutup", "kerja", "hari", "open", "close", "office hour", "operating"]
                },
                { 
                    id: "promo", 
                    text: "Promo",
                    keywords: ["promo", "diskon", "voucher", "kupon", "potongan", "harga khusus", "spesial", "discount", "offer", "deal"]
                }
            ]
        },
        
        // Image Responses
        "qris": {
            type: "image",
            url: "assets/images/qris.jpg",
            caption: "💳 <b>QRIS Payment</b>\nScan untuk pembayaran cepat dan aman",
            class: "qris-image"
        },
        
        // Contact Card
        "kontak": {
            type: "contact",
            profile: "assets/images/profile.jpg",
            name: "Nelsen Chandra",
            phone: "+6287811007088",
            bio: "Graphic & Web Designer"
        },
        
        // Default Response
        "default": "🤖 <b>Maaf saya tidak mengerti</b>\n\nKetik <b>menu</b> untuk melihat opsi yang tersedia\nAtau langsung tanyakan tentang:\n• Software design\n• Harga jasa\n• Portfolio karya"
    };

    // Initialize Chat
    function initChat() {
        addMessage("Welcome to Nerusen, apa yang bisa saya bantu?", 'bot');
        setTimeout(() => {
            addMessage("Ketik <b>menu</b> jika ingin melihat daftar menu", 'bot');
        }, 800);
    }

    // Add Message Function with Typing Indicator
    function addMessage(content, sender, type = "text", meta = {}) {
        // Show typing indicator for bot messages
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
                message.innerHTML = `
                    <div class="ai-message-content">
                        <img src="${content}" class="bot-image mobile-image">
                        <div class="image-caption">${meta.caption || ''}</div>
                    </div>`;
                break;
                
            case "menu":
                const menuItems = meta.items.map(item => 
                    `<div class="ai-menu-item" data-id="${item.id}">
                        <div class="menu-text">${item.text}</div>
                        <div class="menu-keywords">${item.keywords.slice(0, 3).join(', ')}...</div>
                    </div>`
                ).join('');
                
                message.innerHTML = `
                    <div class="ai-menu-container">
                        <div class="ai-menu-title">
                            <i class="fas fa-list"></i> Menu yang tersedia:
                        </div>
                        <div class="ai-menu-grid">
                            ${menuItems}
                        </div>
                    </div>`;
                
                // Add event listeners after menu is created
                setTimeout(() => {
                    const menuItems = message.querySelectorAll('.ai-menu-item');
                    menuItems.forEach(item => {
                        item.addEventListener('click', () => {
                            const id = item.getAttribute('data-id');
                            handleMenuClick(id);
                        });
                    });
                }, 10);
                break;
                
            case "contact":
                message.innerHTML = `
                    <div class="ai-contact-card">
                        <img src="${meta.profile}" class="ai-contact-profile">
                        <div class="ai-contact-name">${meta.name}</div>
                        <div class="ai-contact-bio">${meta.bio}</div>
                        <div class="ai-contact-phone">${meta.phone}</div>
                        <div class="ai-contact-buttons">
                            <button class="ai-contact-btn ai-contact-chat" onclick="window.open('https://wa.me/${meta.phone.replace(/\D/g,'')}')">
                                <i class="fab fa-whatsapp"></i> Chat
                            </button>
                            <button class="ai-contact-btn ai-contact-copy" onclick="navigator.clipboard.writeText('${meta.phone}')">
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

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'typingIndicator';
        typingIndicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        elements.messages.appendChild(typingIndicator);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function calculateTypingDelay(content) {
        const wordCount = content.split(/\s+/).length;
        const minDelay = 800;
        const maxDelay = 3000;
        const calculatedDelay = wordCount * 200;
        
        return Math.min(Math.max(calculatedDelay, minDelay), maxDelay);
    }

    // Handle Menu Click - Diperbarui Total
    function handleMenuClick(id) {
        const response = RESPONSES[id];
        
        if (response) {
            if (typeof response === 'object') {
                addMessage(response.url || response.items || response.profile, 'bot', response.type, response);
            } else {
                addMessage(response, 'bot');
            }
        } else {
            addMessage(RESPONSES.default, 'bot');
        }
    }

    // Get Bot Response - Diperbarui dengan Keyword Matching
    function getBotResponse(prompt) {
        const lowerPrompt = prompt.toLowerCase().trim();
        
        // Check menu command first
        if (lowerPrompt === 'menu') {
            return RESPONSES.menu;
        }
        
        // Check all menu items for keyword matches
        for (const item of RESPONSES.menu.items) {
            for (const keyword of item.keywords) {
                if (lowerPrompt.includes(keyword)) {
                    return RESPONSES[item.id];
                }
            }
        }
        
        // Check exact matches
        if (RESPONSES[lowerPrompt]) {
            return RESPONSES[lowerPrompt];
        }
        
        return RESPONSES.default;
    }

    // Send Message
    function sendMessage() {
        const message = elements.input.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        elements.input.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            
            if (typeof response === 'object') {
                addMessage(response.url || response.items || response.profile, 'bot', response.type, response);
            } else {
                addMessage(response, 'bot');
            }
        }, 500);
    }

    // Helper Functions
    function scrollToBottom() {
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function toggleChat() {
        elements.container.classList.toggle('active');
        if (elements.container.classList.contains('active') && elements.messages.children.length <= 2) {
            initChat();
        }
    }

    // Event Listeners
    elements.button.addEventListener('click', toggleChat);
    elements.close.addEventListener('click', toggleChat);
    
    elements.send.addEventListener('click', sendMessage);
    elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-focus input when chat opens
    elements.container.addEventListener('transitionend', () => {
        if (elements.container.classList.contains('active')) {
            elements.input.focus();
        }
    });
});