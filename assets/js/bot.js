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
        "software": "🛠️ <b>Software Design Kami:</b>\n\n• Adobe Photoshop\n• Figma\n• CorelDRAW\n• Alight Motion\n• IbisPaintX\n• Canva",
        "harga": "💰 <b>Daftar Harga:</b>\n\n• Logo Design: Rp 50.000-100.000\n• Banner: Rp 30.000-60.000\n• Social Media: Rp 30.000\n• Website Basic: Rp 100.000\n• Website Premium: Rp 150.000+\n\n*Harga bisa nego untuk project besar",
        "portofolio": "🎨 <b>Portfolio Kami:</b>\n\n• Behance: <a href='https://behance.net/xynelsdesign' target='_blank' style='color:#00ff88;'>behance.net/xynelsdesign</a>\n• Dribbble: <a href='https://dribbble.com/nelsen' target='_blank' style='color:#00ff88;'>dribbble.com/nelsen</a>\n• Instagram: @n31sen.st",
        "testimoni": "🌟 <b>Testimoni Klien:</b>\n\n\"Hasil desain sangat memuaskan!\" - PT. Abadi Jaya\n\"Pelayanan cepat dan profesional\" - CV. Mandiri Sejahtera\n\"Logo yang dibuat sangat unik\" - Toko Online Sinar Baru",
        "proses": "🔄 <b>Proses Kerja:</b>\n\n1. Konsultasi kebutuhan\n2. Pembayaran DP 50%\n3. Pengerjaan draft awal\n4. Revisi (max 3x)\n5. Finalisasi & pelunasan\n6. Pengiriman file final",
        "faq": "❓ <b>FAQ:</b>\n\nQ: Berapa lama pengerjaan?\nA: 3-7 hari tergantung kompleksitas\n\nQ: Format file apa saja yang diberikan?\nA: JPG, PNG, PDF, PSD (sesuai kebutuhan)\n\nQ: Bisa revisi berapa kali?\nA: Maksimal 3x revisi, selebihnya dikenakan biaya",
        "sosmed": "📱 <b>Sosial Media:</b>\n\n• Instagram: @n31sen.st\n• WhatsApp: +6287811007088\n• Behance: behance.net/xynelsdesign\n• Dribbble: dribbble.com/nelsen",
        "jasa": "💼 <b>Jasa Lainnya:</b>\n\n• Desain Merchandise\n• Desain Kemasan\n• Desain Banner Event\n• Desain Kartu Nama\n• Desain Undangan Digital",
        "pembayaran": "💳 <b>Metode Pembayaran:</b>\n\n• Transfer Bank (BCA, BRI, Mandiri)\n• QRIS (Scan & Pay)\n• Dana/OVO/GoPay\n• PayPal (untuk klien luar negeri)",
        "waktu": "⏰ <b>Jam Operasional:</b>\n\nSenin-Jumat: 09.00 - 17.00 WIB\nSabtu: 09.00 - 14.00 WIB\nMinggu & Hari Libur: Tutup",
        "promo": "🎉 <b>Promo Spesial:</b>\n\n• Diskon 10% untuk order pertama\n• Paket bundling logo + social media kit\n• Free 1x revisi tambahan untuk order >Rp 1jt\n\nGunakan kode: <b>#NERUSEN10</b>",
        "qris": {
            type: "image",
            url: "assets/images/qris.jpg",
            caption: "💳 <b>QRIS</b>\nScan Here",
            class: "qris-image"
        },
        "kontak": {
            type: "contact",
            profile: "assets/images/profile.jpg",
            name: "Nelsen Chandra",
            phone: "+6287811007088",
            bio: "Graphic & Web Designer"
        },
        "menu": {
            type: "menu",
            items: [
                { id: "software", text: "Software", keywords: ["software", "app"] },
                { id: "harga", text: "Harga", keywords: ["harga", "price"] },
                { id: "portfolio", text: "Portfolio", keywords: ["portfolio", "karya"] },
                { id: "qris", text: "QRIS", keywords: ["qris", "payment"] },
                { id: "kontak", text: "Kontak", keywords: ["kontak", "contact"] }
            ]
        },
        "default": "🤖 <b>Maaf saya tidak mengerti</b>\n\nKetik <b>menu</b> untuk melihat opsi yang tersedia"
    };

    // Initialize Chat
    function initChat() {
        elements.messages.innerHTML = '';
        addMessage("Welcome to Nerusen, apa yang bisa saya bantu?", 'bot');
        setTimeout(() => {
            addMessage("Ketik <b>menu</b> jika ingin melihat daftar menu", 'bot');
        }, 800);
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
                message.innerHTML = `
                    <div class="ai-message-content">
                        <img src="${content}" class="${imgClass}">
                        <div class="image-caption">${meta.caption || ''}</div>
                    </div>`;
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
                            <i class="fas fa-list"></i> Menu yang tersedia:
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
    elements.container.addEventListener('transitionend', () => {
        if (elements.container.classList.contains('active')) {
            elements.input.focus();
        }
    });
});
