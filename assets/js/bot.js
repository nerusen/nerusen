document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        button: document.getElementById('aiButton'),
        container: document.getElementById('aiChatContainer'),
        messages: document.getElementById('aiChatMessages'),
        input: document.getElementById('aiInput'),
        send: document.getElementById('aiSend')
    };

    // Enhanced Responses Database
    const RESPONSES = {
        // Text Responses
        "software": "🛠️ <b>Software Design Kami:</b>\n\n• Adobe Photoshop\n• Adobe Illustrator\n• Figma (UI/UX)\n• CorelDRAW\n• Procreate\n• Blender (3D)\n• Canva (Quick Design)",
        "harga": "💰 <b>Daftar Harga:</b>\n\n• Logo Design: Rp 300.000-800.000\n• Banner: Rp 150.000-300.000\n• Social Media Kit: Rp 500.000\n• Website Basic: Rp 1.500.000\n• Website Premium: Rp 3.500.000+\n\n*Harga bisa nego untuk project besar",
        "portfolio": "🎨 <b>Portfolio Kami:</b>\n\n• Behance: <a href='https://behance.net/xynelsdesign' target='_blank'>behance.net/xynelsdesign</a>\n• Dribbble: <a href='https://dribbble.com/nelsen' target='_blank'>dribbble.com/nelsen</a>\n• Instagram: @n31sen.st",
        "menu": {
            type: "menu",
            items: [
                "Software", "Harga", "Portfolio", 
                "QRIS", "Kontak", "Testimoni",
                "Proses Kerja", "FAQ"
            ]
        },
        
        // Image Responses
        "qris": {
            type: "image",
            url: "assets/images/qris.jpg",
            caption: "💳 <b>QRIS Payment</b>\nScan untuk pembayaran cepat dan aman"
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

    // Add Message Function
    function addMessage(content, sender, type = "text", meta = {}) {
        const message = document.createElement('div');
        message.className = `ai-message ai-message-${sender}`;
        
        switch(type) {
            case "image":
                message.innerHTML = `
                    <div class="ai-message-content">
                        <img src="${content}" class="bot-image">
                        <div class="image-caption">${meta.caption || ''}</div>
                    </div>`;
                break;
                
            case "menu":
                message.innerHTML = `
                    <div class="ai-menu-container">
                        <div class="ai-menu-title">
                            <i class="fas fa-list"></i> Menu yang tersedia:
                        </div>
                        <div class="ai-menu-items">
                            ${meta.items.map(item => `
                                <div class="ai-menu-item" onclick="handleMenuClick('${item.toLowerCase()}')">
                                    ${item}
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
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
                
            default: // Text
                message.innerHTML = `
                    <div class="ai-message-content">
                        ${content.replace(/\n/g, '<br>')}
                    </div>`;
        }
        
        elements.messages.appendChild(message);
        scrollToBottom();
    }

    // Handle Menu Click (global function)
    window.handleMenuClick = function(option) {
        elements.input.value = option;
        sendMessage();
    };

    // Get Bot Response
    function getBotResponse(prompt) {
        const lowerPrompt = prompt.toLowerCase().trim();
        
        // Exact matches
        if (RESPONSES[lowerPrompt]) return RESPONSES[lowerPrompt];
        
        // Partial matches
        if (/software|aplikasi|tool|program/.test(lowerPrompt)) return RESPONSES.software;
        if (/harga|biaya|price|fee|tarif/.test(lowerPrompt)) return RESPONSES.harga;
        if (/portfolio|karya|desain|work|hasil/.test(lowerPrompt)) return RESPONSES.portfolio;
        if (/qris|pembayaran|bayar|donasi|payment/.test(lowerPrompt)) return RESPONSES.qris;
        if (/kontak|whatsapp|wa|call|hubung|contact/.test(lowerPrompt)) return RESPONSES.kontak;
        if (/menu|option|pilihan|bantuan|help/.test(lowerPrompt)) return RESPONSES.menu;
        
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

    // Event Listeners
    elements.button.addEventListener('click', () => {
        elements.container.classList.toggle('active');
        if (elements.container.classList.contains('active') && elements.messages.children.length === 0) {
            initChat();
        }
    });

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