document.addEventListener('DOMContentLoaded', function(){

    // Minimal helper utilities and initial data
    const form = document.getElementById('reviewForm');
    const starGroup = document.getElementById('starGroup');
    const commentInput = document.getElementById('comment');
    const nameInput = document.getElementById('name');
    const speedInput = document.getElementById('speed');

    const tickerA = document.getElementById('tickerA');
    const tickerB = document.getElementById('tickerB');
    const tickerWrap = document.getElementById('tickerWrap');

    let reviews = [
        {name:'Alex', rating:5, text:'Fast service and excellent support.'},
        {name:'Priya', rating:4, text:'Great service, quality as described.'},
        {name:'Jordan', rating:5, text:'Exceeded expectations — will book again!'},
        {name:'Sam', rating:4, text:'Good experience.'}
    ];

    // Star rating interaction
    let currentRating = 5;
    function updateStarVisual() {
        [...starGroup.children].forEach(s => {
            const v = Number(s.dataset.value);
            s.classList.toggle('selected', v <= currentRating);
        });
    }
    starGroup.addEventListener('click', e => {
        const s = e.target.closest('.star');
        if (!s) return;
        currentRating = Number(s.dataset.value);
        updateStarVisual();
    });
    starGroup.addEventListener('mouseover', e => {
        const s = e.target.closest('.star');
        if (!s) return;
        const hoverVal = Number(s.dataset.value);
        [...starGroup.children].forEach(st => st.classList.toggle('selected', Number(st.dataset.value) <= hoverVal));
    });
    starGroup.addEventListener('mouseleave', updateStarVisual);
    updateStarVisual();

    // Render reviews into both tickers for seamless loop
    function renderTickers(){
        const html = reviews.map(r => reviewHTML(r)).join('');
        tickerA.innerHTML = html;
        tickerB.innerHTML = html;
    }

    function reviewHTML(r){
        const initials = (r.name || 'U').trim().split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
        const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        // stars.style.color = '#ffb6d2';
        // Keep text short for ticker readability
        const short = (r.text || '').replace(/\s+/g,' ').trim();
        return `<div class="review boxshadow3" title="${escapeHtml(short)}">
                            <div class="avatar">${escapeHtml(initials)}</div>
                            <div class="meta">
                                <div class="who" style="color:#faa4c5">${escapeHtml(r.name)}</div>
                                <div class="rating" style="color:#ffb6d2;">${stars}</div>
                                <div class="msg" style="color:black;">${escapeHtml(short)}</div>
                            </div>
                        </div>`;
    }

    function escapeHtml(s){
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    // Add review handler
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = nameInput.value.trim() || 'Anonymous';
        const text = commentInput.value.trim();
        if (!text) return;
        reviews.unshift({name, rating: currentRating, text});
        // keep the list reasonably sized for performance
        if (reviews.length > 100) reviews = reviews.slice(0,100);
        renderTickers();
        // clear inputs
        commentInput.value = '';
        nameInput.value = '';
        currentRating = 5;
        updateStarVisual();
        // adjust widths to account for new content
        recalc();
    });

    // Scrolling logic using requestAnimationFrame for smooth continuous scroll
    let px = 0;
    let lastTimestamp = null;
    let speed = Number(speedInput.value); // pixels per second
    let paused = false;

    function recalc(){
        // ensure both tickers have been rendered
        // small delay ensures DOM updated widths are correct
        requestAnimationFrame(() => {
            const aWidth = tickerA.scrollWidth;
            const wrapWidth = tickerWrap.clientWidth;
            // If content smaller than wrap, duplicate the content enough to fill plus extra
            if (aWidth < wrapWidth) {
                // replicate reviews to increase width
                const times = Math.ceil((wrapWidth * 1.5) / Math.max(aWidth,1));
                let html = '';
                for (let i=0;i<times;i++) html += reviews.map(r => reviewHTML(r)).join('');
                tickerA.innerHTML = html;
                tickerB.innerHTML = html;
            }
        });
    }

    function step(ts){
        if (lastTimestamp === null) lastTimestamp = ts;
        const dt = (ts - lastTimestamp) / 1000; // seconds
        lastTimestamp = ts;
        if (!paused) {
            px -= speed * dt;
            // when shifted by width of one ticker (A), reset px to 0 to loop seamlessly
            const resetAt = tickerA.scrollWidth;
            if (resetAt && px <= -resetAt) px += resetAt;
            tickerA.style.transform = `translateX(${px}px)`;
            tickerB.style.transform = `translateX(${px + 19}px)`;
            // tickerB.style.transform = `translateX(${px + tickerA.scrollWidth}px)`;
        }
        requestAnimationFrame(step);
    }

    // Pause on hover
    tickerWrap.addEventListener('mouseenter', () => paused = true);
    tickerWrap.addEventListener('mouseleave', () => paused = false);

    // Speed control
    speedInput.addEventListener('input', () => {
        speed = Number(speedInput.value);
    });

    // Initial render and start
    renderTickers();
    // allow layout to stabilize
    setTimeout(recalc, 50);
    requestAnimationFrame(step);

    // Accessibility: keyboard focus pause
    tickerWrap.addEventListener('focusin', () => paused = true);
    tickerWrap.addEventListener('focusout', () => paused = false);


});
