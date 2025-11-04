// Google Sheets Configuration
// IMPORTANTE: Reemplaza estas URLs con las URLs de tus Google Apps Script después de seguir las instrucciones
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbykrjb_RQumswRZiVLev5smYX0cyBq4sZ6J6x9OxfeOAVQ89DYcbPz7p1lATc-uW1Fh/exec'; // RSVP
const GOOGLE_SHEETS_GIFTS_URL = 'https://script.google.com/macros/s/AKfycbyBon_-xCr5X3eKrzX4-FtiNOGhVuQbUQphYgkXyu48VAonpDVTk2ZvixltDZEz0PCy/exec'; // Regalos

// Navigation Toggle (Desktop and Mobile)
const hamburger = document.getElementById('hamburger');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Desktop menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.setAttribute('aria-label', isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        
        // Button text updates automatically via CSS
    });
}

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        hamburger.setAttribute('aria-label', isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    }
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }
    navMenu.classList.remove('active');
}));

// Close menu when clicking outside (desktop)
document.addEventListener('click', (e) => {
    if (menuToggle && navMenu && window.innerWidth > 768) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Countdown Timer Function
function updateCountdown() {
    // Set the wedding date (change this to your actual wedding date)
    const weddingDate = new Date('2026-01-09T13:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        // Wedding day has arrived or passed
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item" style="background: linear-gradient(135deg, #d4af37, #f4e4bc); color: white;">
                <span style="color: white;">¡Es el gran día!</span>
                <p style="color: white;">¡Nos casamos hoy!</p>
            </div>
        `;
        document.querySelector('.countdown-message').textContent = '¡Hoy es nuestro gran día! 💕';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown elements
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Add special styling for final days/hours
    const daysElement = document.getElementById('days').parentElement;
    const hoursElement = document.getElementById('hours').parentElement;
    
    // Remove previous classes
    daysElement.classList.remove('final-days', 'final-hours');
    hoursElement.classList.remove('final-days', 'final-hours');

    // Add special styling based on time remaining
    if (days <= 7) {
        daysElement.classList.add('final-days');
    }
    if (days <= 1) {
        hoursElement.classList.add('final-hours');
    }

    // Update countdown message based on time remaining
    const countdownMessage = document.querySelector('.countdown-message');
    if (days > 30) {
        countdownMessage.textContent = '¡Aún faltan muchos días!';
    } else if (days > 50) {
        countdownMessage.textContent = '¡Faltan pocos días para nuestro gran día!';
    } else if (days > 20) {
        countdownMessage.textContent = '¡Faltan muy pocos días para nuestro gran día!';
    } else if (days === 10) {
        countdownMessage.textContent = '¡Mañana es nuestro gran día!';
    } else if (days === 0) {
        countdownMessage.textContent = '¡Hoy es nuestro gran día!';
    }

    // Add animation when numbers change
    if (seconds === 0) {
        document.getElementById('minutes').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('minutes').parentElement.classList.remove('animate');
        }, 600);
    }
    if (minutes === 0 && seconds === 0) {
        document.getElementById('hours').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('hours').parentElement.classList.remove('animate');
        }, 600);
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
        document.getElementById('days').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('days').parentElement.classList.remove('animate');
        }, 600);
    }
}

// Initialize countdown timer
function initCountdown() {
    updateCountdown();
    setInterval(() => {
        updateCountdown();
        // Update progress bars daily (check once per hour to avoid excessive updates)
        const now = new Date();
        if (now.getMinutes() === 0) {
            updateBaseProgress();
        }
    }, 1000);
}

// Update base progress bars based on current date
function updateBaseProgress() {
    const baseProgress = calculateBaseProgress();
    const baseBars = document.querySelectorAll('.progress-fill-base');
    
    baseBars.forEach(bar => {
        const currentBase = parseInt(bar.getAttribute('data-progress') || '0');
        if (currentBase !== baseProgress) {
            // Find the gift card this bar belongs to
            const giftCard = bar.closest('.gift-card');
            if (!giftCard) return;
            
            // Skip cards without progress
            if (giftCard.classList.contains('gift-card-no-progress')) return;
            
            const cardTitleElement = giftCard.querySelector('h3');
            if (!cardTitleElement) return;
            
            const giftType = cardTitleElement.textContent.trim();
            const differentiation = getProductDifferentiation(giftType);
            
            // Calculate total base (base progress + differentiation)
            const totalBase = Math.min(100, baseProgress + differentiation);
            
            bar.style.width = totalBase + '%';
            bar.setAttribute('data-progress', baseProgress);
            bar.setAttribute('data-differentiation', differentiation);
            bar.setAttribute('data-total-base', totalBase);
            
            // Update contribution bar position
            const contributionBar = giftCard.querySelector('.progress-fill-contribution');
            if (contributionBar) {
                const contributionPercent = parseFloat(contributionBar.style.width?.replace('%', '') || '0');
                contributionBar.style.left = totalBase + '%';
                
                // Update total percentage display
                const progressPercentageElement = giftCard.querySelector('.progress-percentage');
                if (progressPercentageElement) {
                    const totalProgress = Math.min(100, totalBase + contributionPercent);
                    progressPercentageElement.textContent = `${Math.round(totalProgress)}%`;
                }
            }
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.story-item, .event-card, .gift-card, .gallery-item, .recommendation-card, .rsvp-form');
    animateElements.forEach(el => observer.observe(el));
    
    // Initialize progress bars
    initializeProgressBars();
});

// Calculate base progress percentage based on days remaining until wedding
// Formula: 0% at 70 days, 100% at 0 days
function calculateBaseProgress() {
    const weddingDate = new Date('2026-01-09T13:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        // Wedding has passed, show 100%
        return 100;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    // If more than 70 days, show 0%
    if (days > 70) {
        return 0;
    }
    
    // Linear progression from 0% (70 days) to 100% (0 days)
    // Formula: progress = 100 * (1 - days/70)
    const baseProgress = Math.max(0, Math.min(100, 100 * (1 - days / 70)));
    
    return Math.round(baseProgress);
}

// Get product differentiation percentage based on gift type
function getProductDifferentiation(giftType) {
    const differentiation = {
        'Sofás para la sala': 7,
        'Tiquetes de Luna de Miel': 0,
        'Aporte general': 0
    };
    return differentiation[giftType] || 0;
}

// Initialize progress bars with base progress from date + product differentiation
function initializeProgressBars() {
    const baseProgress = calculateBaseProgress();
    const baseBars = document.querySelectorAll('.progress-fill-base');
    
    baseBars.forEach(bar => {
        // Find the gift card this bar belongs to
        const giftCard = bar.closest('.gift-card');
        if (!giftCard) return;
        
        // Skip cards without progress (like "Aporte general")
        if (giftCard.classList.contains('gift-card-no-progress')) return;
        
        const cardTitleElement = giftCard.querySelector('h3');
        if (!cardTitleElement) return;
        
        const giftType = cardTitleElement.textContent.trim();
        const differentiation = getProductDifferentiation(giftType);
        
        // Calculate total base (base progress + differentiation)
        const totalBase = Math.min(100, baseProgress + differentiation);
        
        bar.style.width = totalBase + '%';
        bar.setAttribute('data-progress', baseProgress);
        bar.setAttribute('data-differentiation', differentiation);
        bar.setAttribute('data-total-base', totalBase);
    });
    
    // Initialize contribution bars at 0
    const contributionBars = document.querySelectorAll('.progress-fill-contribution');
    contributionBars.forEach(bar => {
        const giftCard = bar.closest('.gift-card');
        if (!giftCard) return;
        
        // Skip cards without progress
        if (giftCard.classList.contains('gift-card-no-progress')) return;
        
        const baseBar = giftCard.querySelector('.progress-fill-base');
        const totalBase = parseInt(baseBar?.getAttribute('data-total-base') || '0');
        
        bar.style.width = '0%';
        bar.style.left = totalBase + '%';
        bar.setAttribute('data-contribution', 0);
    });
    
    // Update percentage display (base + differentiation initially)
    const percentageElements = document.querySelectorAll('.progress-percentage');
    percentageElements.forEach(el => {
        const giftCard = el.closest('.gift-card');
        if (!giftCard) return;
        
        // Skip cards without progress
        if (giftCard.classList.contains('gift-card-no-progress')) return;
        
        const baseBar = giftCard.querySelector('.progress-fill-base');
        const totalBase = parseInt(baseBar?.getAttribute('data-total-base') || '0');
        
        el.textContent = `${totalBase}%`;
    });
}

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvpForm');
const attendingRadios = document.querySelectorAll('input[name="attending"]');
const additionalOptions = document.getElementById('additional-options');

// Show/hide additional options based on attendance
attendingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'yes') {
            additionalOptions.style.display = 'block';
            additionalOptions.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            additionalOptions.style.display = 'none';
        }
    });
});

// RSVP Form submission - Simplified: Only Netlify Forms
rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.attending) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
        // Validar que la URL de Google Sheets esté configurada
        if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
            throw new Error('Por favor, configura la URL de Google Sheets en script.js. Consulta GOOGLE_SHEETS_SETUP.md para más información.');
        }

        // Preparar datos para Google Sheets
        const payload = {
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            attending: data.attending || '',
            menu: data.menu || '',
            transport: data.transport || '',
            song: data.song || '',
            message: data.message || ''
        };
        
        // Enviar a Google Sheets via Google Apps Script
        // Usamos text/plain para evitar preflight CORS (solicitudes simples no requieren OPTIONS)
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.result === 'success') {
                console.log('✅ RSVP guardado en Google Sheets (fila:', result.row, ')');
            } else {
                throw new Error(result.error || 'Error desconocido');
            }
        } else {
            throw new Error('Error HTTP: ' + response.status);
        }
        
        if (data.attending === 'yes') {
            showNotification('¡Gracias por confirmar tu asistencia! Te esperamos en nuestro gran día. 🎉', 'success');
            createConfetti();
        } else {
            showNotification('Entendemos que no puedas asistir. ¡Gracias por tu mensaje! 💕', 'info');
        }
        
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        showNotification('Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo.', 'error');
    } finally {
        rsvpForm.reset();
        additionalOptions.style.display = 'none';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Gift Modal Functions
function openGiftModal(giftType) {
    const modal = document.getElementById('giftModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Store gift type in modal for later use
    modal.dataset.giftType = giftType;
    
    // Set modal title based on gift type
    const giftTitles = {
        'muebles': 'Sofás para la sala',
        'luna-miel': 'Tiquetes de Luna de Miel',
        'fondo-general': 'Aporte general'
    };
    
    modalTitle.textContent = `Contribuir a ${giftTitles[giftType] || 'el Regalo'}`;
    
    // Update bank information based on gift type
    updateBankInfo(giftType);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update bank information based on gift type
function updateBankInfo(giftType) {
    // Bank information for each gift type
    const bankInfo = {
        'muebles': {
            // Camilo's account (Sofás)
            bank: 'Bancolombia',
            account: '04884246721',
            key: '@otoya232',
            holder: 'Camilo Otoya Cabrera',
            document: 'Cédula 1018459232'
        },
        'luna-miel': {
            // Sofia's account (Tiquetes)
            bank: 'Nu',
            account: '27590419',
            key: '@SLC487',
            holder: 'Sofia Llano Caldas',
            document: 'Cédula 1020790487'
        },
        'fondo-general': {
            // Camilo's account (Aporte general - default)
            bank: 'Bancolombia',
            account: '04884246721',
            key: '@otoya232',
            holder: 'Camilo Otoya Cabrera',
            document: 'Cédula 1018459232'
        }
    };
    
    const info = bankInfo[giftType] || bankInfo['fondo-general'];
    
    // Update bank details
    const bankNameEl = document.getElementById('bank-name');
    const bankAccountEl = document.getElementById('bank-account');
    const bankKeyEl = document.getElementById('bank-key');
    const bankHolderEl = document.getElementById('bank-holder');
    const bankDocumentEl = document.getElementById('bank-document');
    
    if (bankNameEl) bankNameEl.textContent = info.bank;
    if (bankAccountEl) bankAccountEl.textContent = info.account;
    if (bankKeyEl) bankKeyEl.textContent = info.key;
    if (bankHolderEl) bankHolderEl.textContent = info.holder;
    if (bankDocumentEl) bankDocumentEl.textContent = info.document;
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('giftForm').reset();
}

// Gift targets - Update these with your actual targets
const GIFT_TARGETS = {
    'Sofás para la sala': 10000000,
    'Tiquetes de Luna de Miel': 6000000,
    'Aporte general': 8000000
};

// Gift Form submission - Simplified: Only Netlify Forms + Update Progress Bar
document.getElementById('giftForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (!data.contributorName || !data.contributorEmail || !data.contributionAmount) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Registrando...';
    submitBtn.disabled = true;
    
    try {
        // Get gift type from modal
        const modal = document.getElementById('giftModal');
        const giftTypeKey = modal.dataset.giftType;
        const giftTitles = {
            'muebles': 'Sofás para la sala',
            'luna-miel': 'Tiquetes de Luna de Miel',
            'fondo-general': 'Aporte general'
        };
        const giftType = giftTitles[giftTypeKey] || 'Aporte general';
        
        // Validar que la URL de Google Sheets para regalos esté configurada
        if (!GOOGLE_SHEETS_GIFTS_URL || GOOGLE_SHEETS_GIFTS_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_REGALOS_AQUI') {
            throw new Error('Por favor, configura la URL de Google Sheets para regalos en script.js. Consulta GOOGLE_SHEETS_SETUP_GIFTS.md para más información.');
        }

        // Preparar datos para Google Sheets
        const contributionAmount = parseFloat(data.contributionAmount) || 0;
        const payload = {
            contributorName: data.contributorName || '',
            contributorEmail: data.contributorEmail || '',
            contributionAmount: contributionAmount,
            contributionMessage: data.contributionMessage || '',
            giftType: giftType // El tipo se establece automáticamente según el botón presionado
        };
        
        // Enviar a Google Sheets via Google Apps Script (endpoint específico para regalos)
        // Usamos text/plain para evitar preflight CORS (solicitudes simples no requieren OPTIONS)
        const response = await fetch(GOOGLE_SHEETS_GIFTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.result === 'success') {
                console.log('✅ Contribución guardada en Google Sheets (fila:', result.row, ')');
                
                // Update progress bar
                updateProgressBarForGift(giftType, contributionAmount);
                
                showNotification(`¡Gracias por tu contribución de $${contributionAmount.toLocaleString()}! Se ha registrado exitosamente.`, 'success');
                closeGiftModal();
            } else {
                throw new Error(result.error || 'Error desconocido');
            }
        } else {
            throw new Error('Error HTTP: ' + response.status);
        }
        
    } catch (error) {
        console.error('Error submitting gift contribution:', error);
        showNotification('Hubo un error al registrar tu contribución. Por favor, inténtalo de nuevo.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Update progress bar for a specific gift with actual amount
function updateProgressBarForGift(giftType, contributionAmount) {
    try {
        // Find the gift card that matches this gift type
        const giftCards = document.querySelectorAll('.gift-card');
        
        if (!giftCards || giftCards.length === 0) {
            console.warn('No se encontraron tarjetas de regalo');
            return;
        }
        
        giftCards.forEach(card => {
            try {
                // Verificar que la tarjeta tenga un h3 antes de intentar leerlo
                const cardTitleElement = card.querySelector('h3');
                if (!cardTitleElement) {
                    // Esta tarjeta no tiene título h3 (como la tarjeta especial), saltarla
                    return;
                }
                
                // Verificar que textContent existe antes de acceder
                if (!cardTitleElement.textContent) {
                    return;
                }
                
                const cardTitle = cardTitleElement.textContent.trim();
                if (cardTitle === giftType) {
                    // Check if this is "Aporte general" (no progress bar)
                    if (giftType === 'Aporte general') {
                        // For "Aporte general", just highlight the card (no progress bar)
                        if (contributionAmount > 0) {
                            card.classList.add('has-contribution');
                        }
                        return; // Exit early for "Aporte general"
                    }
                    
                    // For other gifts, update progress bar
                    const baseBar = card.querySelector('.progress-fill-base');
                    const contributionBar = card.querySelector('.progress-fill-contribution');
                    const progressPercentageElement = card.querySelector('.progress-percentage');
                    
                    // Solo actualizar si existen las barras y el elemento de porcentaje
                    if (baseBar && contributionBar && progressPercentageElement) {
                        const targetAmount = GIFT_TARGETS[giftType] || 1000000;
                        
                        // Get current total base (base progress + differentiation)
                        const totalBase = parseInt(baseBar.getAttribute('data-total-base') || '0');
                        
                        // Get current contribution progress
                        const currentContributionWidth = contributionBar.style.width || '0%';
                        const currentContributionPercent = parseFloat(currentContributionWidth.replace('%', '')) || 0;
                        
                        // Calculate contribution amount from current width
                        const currentContributionAmount = (currentContributionPercent / 100) * targetAmount;
                        const newContributionAmount = currentContributionAmount + contributionAmount;
                        
                        // Calculate new contribution percentage (max to not exceed 100% total)
                        const maxContributionPercent = Math.min(100 - totalBase, 100);
                        const contributionPercent = Math.min(
                            maxContributionPercent,
                            (newContributionAmount / targetAmount) * 100
                        );
                        
                        // Update contribution bar
                        contributionBar.style.width = contributionPercent + '%';
                        contributionBar.style.left = totalBase + '%';
                        contributionBar.setAttribute('data-contribution', Math.round(contributionPercent));
                        
                        // Calculate total progress (base + differentiation + contribution)
                        const totalProgress = Math.min(100, totalBase + contributionPercent);
                        
                        // Update percentage text (show total)
                        progressPercentageElement.textContent = `${Math.round(totalProgress)}%`;
                        
                        // Add highlight class to card when contribution is made
                        if (contributionPercent > 0) {
                            card.classList.add('has-contribution');
                        }
                    } else {
                        console.warn(`No se encontró barra de progreso para: ${giftType}`);
                    }
                }
            } catch (cardError) {
                console.warn('Error procesando tarjeta de regalo:', cardError);
                // Continuar con la siguiente tarjeta
            }
        });
    } catch (error) {
        console.error('Error en updateProgressBarForGift:', error);
        // No lanzar el error para no interrumpir el flujo
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Confetti effect
function createConfetti() {
    const colors = ['#d4af37', '#f4e4bc', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translateY(100vh) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}

// Google Maps Configuration
const GOOGLE_MAPS_CONFIG = {
    // Replace with your Google Maps API Key
    API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    
    LOCATIONS: {
        CEREMONY: {
            name: 'Gimnasio Moderno',
            address: 'Carrera 9 # 74 – 99, Bogotá, Colombia',
            lat: 4.6533,  // Update with actual coordinates
            lng: -74.0836, // Update with actual coordinates
            description: 'Ceremonia de Matrimonio'
        },
        RECEPTION: {
            name: 'La Pradera de Potosí',
            address: 'Km 19 vía La Calera – Sopó, Cundinamarca, Colombia',
            lat: 4.8000,  // Update with actual coordinates
            lng: -74.0000, // Update with actual coordinates
            description: 'Recepción de Matrimonio'
        }
    }
};

// Initialize Google Maps
function initGoogleMaps() {
    // Check if API key is configured
    if (!GOOGLE_MAPS_CONFIG.API_KEY || GOOGLE_MAPS_CONFIG.API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
        console.warn('⚠️ Google Maps API key not configured. Using fallback (click to open in Google Maps).');
        initMapsFallback();
        return;
    }
    
    // Load Google Maps API
    if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.API_KEY}&callback=initMaps`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
            console.error('Failed to load Google Maps API. Using fallback.');
            initMapsFallback();
        };
        document.head.appendChild(script);
        
        // Set global callback
        window.initMaps = () => {
            createMaps();
        };
    } else {
        createMaps();
    }
}

// Create Google Maps instances
function createMaps() {
    // Ceremony Map
    const ceremonyMapElement = document.getElementById('ceremony-map');
    if (ceremonyMapElement && window.google && window.google.maps) {
        const ceremonyMap = new google.maps.Map(ceremonyMapElement, {
            center: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lng
            },
            zoom: 15,
            mapTypeId: 'roadmap',
            styles: [
                { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] }
            ]
        });
        
        const ceremonyMarker = new google.maps.Marker({
            position: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lng
            },
            map: ceremonyMap,
            title: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#d4af37" stroke="#fff" stroke-width="2"/>
                        <path d="M20 8 L24 16 L32 16 L26 22 L28 30 L20 26 L12 30 L14 22 L8 16 L16 16 Z" fill="#fff"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });
        
        const ceremonyInfoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #d4af37; font-family: 'Playfair Display', serif;">${GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.name}</h3>
                    <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Ceremonia</strong></p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">Viernes 9 de enero de 2026</p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">1:30 PM</p>
                    <p style="margin: 0; font-size: 12px; color: #666;">${GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.address}</p>
                </div>
            `
        });
        
        ceremonyMarker.addListener('click', () => {
            ceremonyInfoWindow.open(ceremonyMap, ceremonyMarker);
        });
        
        // Open info window automatically
        ceremonyInfoWindow.open(ceremonyMap, ceremonyMarker);
    }
    
    // Reception Map
    const receptionMapElement = document.getElementById('reception-map');
    if (receptionMapElement && window.google && window.google.maps) {
        const receptionMap = new google.maps.Map(receptionMapElement, {
            center: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lng
            },
            zoom: 15,
            mapTypeId: 'roadmap',
            styles: [
                { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] }
            ]
        });
        
        const receptionMarker = new google.maps.Marker({
            position: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lng
            },
            map: receptionMap,
            title: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#d4af37" stroke="#fff" stroke-width="2"/>
                        <path d="M20 8 L24 16 L32 16 L26 22 L28 30 L20 26 L12 30 L14 22 L8 16 L16 16 Z" fill="#fff"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });
        
        const receptionInfoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #d4af37; font-family: 'Playfair Display', serif;">${GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.name}</h3>
                    <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Recepción</strong></p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">Viernes 9 de enero de 2026</p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">4:00 PM – 2:00 AM</p>
                    <p style="margin: 0; font-size: 12px; color: #666;">${GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.address}</p>
                </div>
            `
        });
        
        receptionMarker.addListener('click', () => {
            receptionInfoWindow.open(receptionMap, receptionMarker);
        });
        
        // Open info window automatically
        receptionInfoWindow.open(receptionMap, receptionMarker);
    }
}

// Fallback function for when Google Maps API is not available
function initMapsFallback() {
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        placeholder.style.cursor = 'pointer';
        placeholder.addEventListener('click', () => {
            const isCeremony = placeholder.id === 'ceremony-map';
            const location = isCeremony 
                ? GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY
                : GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION;
            
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
            window.open(mapUrl, '_blank');
        });
    });
}

// Image placeholder click handlers
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        showNotification('Haz clic aquí para agregar tus propias fotos. Puedes reemplazar estos placeholders con tus imágenes reales.', 'info');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
        }
        
        // Close modal if open
        const modal = document.getElementById('giftModal');
        if (modal && modal.style.display === 'block') {
            closeGiftModal();
        }
    }
    
    // Handle Enter key on map placeholders
    if (e.key === 'Enter' && e.target.classList.contains('map-placeholder')) {
        e.target.click();
    }
});

// Register Service Worker for PWA
// Deshabilitado temporalmente - Descomentar cuando sw.js esté disponible
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize countdown timer
    initCountdown();
    
    // Animate progress bars on load
    setTimeout(() => {
        initializeProgressBars();
    }, 500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.gift-card, .event-card, .gallery-item, .recommendation-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation with better UX
function setupFormValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', () => {
            const isValid = !input.value || validateEmail(input.value);
            if (!isValid) {
                input.style.borderColor = '#dc3545';
                input.setAttribute('aria-invalid', 'true');
                showNotification('Por favor, ingresa un email válido.', 'error');
            } else {
                input.style.borderColor = input.value ? '#28a745' : '#e0e0e0';
                input.setAttribute('aria-invalid', 'false');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                const isValid = validateEmail(input.value);
                if (isValid) {
                    input.style.borderColor = '#28a745';
                    input.setAttribute('aria-invalid', 'false');
                }
            }
        });
    });

    // Phone validation
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('blur', () => {
            const isValid = !input.value || validatePhone(input.value);
            if (!isValid) {
                input.style.borderColor = '#dc3545';
                input.setAttribute('aria-invalid', 'true');
                showNotification('Por favor, ingresa un teléfono válido.', 'error');
            } else {
                input.style.borderColor = input.value ? '#28a745' : '#e0e0e0';
                input.setAttribute('aria-invalid', 'false');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                const isValid = validatePhone(input.value);
                if (isValid) {
                    input.style.borderColor = '#28a745';
                    input.setAttribute('aria-invalid', 'false');
                }
            }
        });
    });
    
    // Required field validation
    document.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
        field.addEventListener('invalid', (e) => {
            e.preventDefault();
            field.style.borderColor = '#dc3545';
            field.setAttribute('aria-invalid', 'true');
        });
        
        field.addEventListener('input', () => {
            if (field.checkValidity()) {
                field.style.borderColor = '#28a745';
                field.setAttribute('aria-invalid', 'false');
            }
        });
    });
}

// Initialize form validation
setupFormValidation();

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(section);
});

