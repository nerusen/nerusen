document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('animatedTitle');
    const originalText = 'nerusen';
    const targetText = 'n31sen.st';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const delayBetweenTitles = 2500; // Delay when full text is shown
    const transitionSpeed = 1; // Speed of character changes in ms

    // Helper to generate random char
    function randomChar() {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Create span elements for each character to allow styling
    function createSpans(text) {
        titleElement.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            titleElement.appendChild(span);
        }
    }

    // Apply color styles for "31" in targetText
    function style31(spans) {
        // Clear all styles first
        spans.forEach(span => {
            span.style.background = '';
            span.style.backgroundClip = '';
            span.style.color = '';
            span.style.webkitBackgroundClip = '';
            span.style.webkitTextFillColor = '';
            span.style.animation = '';
            span.style.textShadow = '';
        });

        // Style "vol." part (index 0 to 3) in yellow with glow
        for (let i = 0; i <= 3; i++) {
            spans[i].style.color = '#ffffffff'; // Yellow color
            spans[i].style.background = '';
            spans[i].style.backgroundClip = '';
            spans[i].style.webkitBackgroundClip = '';
            spans[i].style.webkitTextFillColor = '';
            spans[i].style.animation = 'glowPulseYellow 2.5s ease-in-out infinite';
            // spans[i].style.textShadow = ''; // Removed shadow
        }

        // Style "02" part (index 4 and 5) in red gradient animated style with glow
        if (spans.length >= 3) {
            const span1 = spans[1];
            const span2 = spans[2];

            const gradient = 'linear-gradient(120deg, #ffee00ff, #bbff00ff)';
            span1.style.background = gradient;
            span1.style.backgroundClip = 'text';
            span1.style.webkitBackgroundClip = 'text';
            span1.style.color = 'transparent';
            span1.style.webkitTextFillColor = 'transparent';
            span1.style.animation = 'redGradientMove 3s linear infinite, glowPulseRed 2.5s ease-in-out infinite';
            // span1.style.textShadow = ''; // Removed shadow

            span2.style.background = gradient;
            span2.style.backgroundClip = 'text';
            span2.style.webkitBackgroundClip = 'text';
            span2.style.color = 'transparent';
            span2.style.webkitTextFillColor = 'transparent';
            span2.style.animation = 'redGradientMove 3s linear infinite, glowPulseRed 2.5s ease-in-out infinite';
            // span2.style.textShadow = ''; // Removed shadow
        }
    }

    // Remove color styles (set to white) for originalText
    function styleOriginal(spans) {
        spans.forEach(span => {
            span.style.background = '';
            span.style.backgroundClip = '';
            span.style.color = 'white';
            span.style.webkitBackgroundClip = '';
            span.style.webkitTextFillColor = '';
            span.style.animation = '';
        });
    }

    // Animate transition from current text to target text with random chars
    async function animateTransition(fromText, toText) {
        return new Promise(resolve => {
            const length = Math.max(fromText.length, toText.length);
            createSpans(fromText.padEnd(length, ' '));
            const spans = Array.from(titleElement.querySelectorAll('span'));

            let iteration = 0;
            const maxIterations = 300;

            const interval = setInterval(() => {
                for (let i = 0; i < length; i++) {
                    if (iteration >= maxIterations) {
                        spans[i].textContent = toText[i] || ' ';
                    } else {
                        if (toText[i] !== fromText[i]) {
                            spans[i].textContent = randomChar();
                        } else {
                            spans[i].textContent = fromText[i];
                        }
                    }
                }
                iteration++;
                if (iteration > maxIterations) {
                    clearInterval(interval);
                    resolve();
                }
            }, transitionSpeed);
        });
    }

    // Main loop to alternate between originalText and targetText
    async function loopAnimation() {
        while (true) {
            // Show originalText with white color
            createSpans(originalText);
            styleOriginal(Array.from(titleElement.querySelectorAll('span')));
            await new Promise(r => setTimeout(r, delayBetweenTitles));

            // Transition to targetText with random chars
            await animateTransition(originalText, targetText);
            style31(Array.from(titleElement.querySelectorAll('span')));
            await new Promise(r => setTimeout(r, delayBetweenTitles));

            // Transition back to originalText with random chars
            await animateTransition(targetText, originalText);
            styleOriginal(Array.from(titleElement.querySelectorAll('span')));
            await new Promise(r => setTimeout(r, delayBetweenTitles));
        }
    }

    loopAnimation();
});

const style = document.createElement('style');
style.textContent = `
@keyframes redGradientMove {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* Removed glowPulseYellow and glowPulseRed keyframes for shadow removal */

#animatedTitle span {
    display: inline-block;
    transition: color 0.2s ease;
    background-size: 200% 200%;
}
`;
document.head.appendChild(style);
