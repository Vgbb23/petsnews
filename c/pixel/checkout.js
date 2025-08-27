// Script específico para a página de checkout
(function() {
    'use strict';
    
    // Variável de controle para evitar duplicidade
    let checkoutEventFired = false;

    function fireInitiateCheckout() {
        if (!checkoutEventFired) {
            window.FacebookPixelEvents.trackInitiateCheckout();
            checkoutEventFired = true;
        }
    }

    // Aguarda o carregamento completo da página
    function initCheckoutTracking() {
        // Dispara o evento de InitiateCheckout quando a página carrega
        window.waitForFacebookPixel(function() {
            setTimeout(fireInitiateCheckout, 1000);
        });
        
        // Também pode disparar quando o usuário interage com elementos específicos
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn-pagar, .payment-button, [data-payment]')) {
                fireInitiateCheckout();
            }
        });
    }
    
    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckoutTracking);
    } else {
        initCheckoutTracking();
    }
})(); 