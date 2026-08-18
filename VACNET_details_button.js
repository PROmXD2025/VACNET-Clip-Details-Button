// ==UserScript==
// @name         VACNet Clip Details Button
// @namespace    https://www.youtube.com/@prom_molekura
// @version      1.3
// @description  Adds Clip Details button to the VacNet labeling portal!
// @author       PROm Molekura
// @match        https://www.counter-strike.net/vacnet/clips*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function closeModal() {
        const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

        if (pageWindow.detailsModal && typeof pageWindow.detailsModal.hide === 'function') {
            pageWindow.detailsModal.hide();
        } else if (pageWindow.detailsModal && typeof pageWindow.detailsModal.close === 'function') {
            pageWindow.detailsModal.close();
        } else {
            const overlay = document.getElementById('detailsModalOverlay');
            if (overlay) {
                overlay.style.display = 'none';
                overlay.classList.remove('visible');
            }
        }
    }

    function initModalLogic() {

        if (document.getElementById('showDetailsModal')) return;

        const targetContainer = document.querySelector('.ClipCount');
        if (!targetContainer) return;

        const btn = document.createElement('button');
        btn.className = 'detailsbutton';
        btn.id = 'showDetailsModal';
        btn.textContent = 'Clip Details';

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

            if (pageWindow.detailsModal && typeof pageWindow.detailsModal.show === 'function') {
                pageWindow.detailsModal.show();
            } else {
                const overlay = document.getElementById('detailsModalOverlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                    overlay.classList.add('visible');
                }
            }
        });

        targetContainer.appendChild(btn);

        const closeBtn = document.getElementById('closeDetailsButton');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
            });
        }

        const overlay = document.getElementById('detailsModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }
    }

    const observer = new MutationObserver((mutations, obs) => {
        const container = document.querySelector('.ClipCount');
        if (container) {
            initModalLogic();
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    initModalLogic();
})();