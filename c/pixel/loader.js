// Carregador do Facebook Pixel
(function() {
    'use strict';
    
    // Carrega o script do UTMify para capturar UTMs
    function loadUTMify() {
        const utmifyScript = document.createElement('script');
        utmifyScript.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
        utmifyScript.setAttribute('data-utmify-prevent-xcod-sck', '');
        utmifyScript.setAttribute('data-utmify-prevent-subids', '');
        utmifyScript.async = true;
        utmifyScript.defer = true;
        document.head.appendChild(utmifyScript);
    }
    
    // Carrega o Facebook Pixel
    function loadFacebookPixel() {
        // Código base do Facebook Pixel
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        // Inicializa o pixel principal
        fbq('init', window.FACEBOOK_PIXEL_CONFIG.pixelId);
        
        // Inicializa pixels adicionais
        if (window.FACEBOOK_PIXEL_CONFIG.additionalPixels && window.FACEBOOK_PIXEL_CONFIG.additionalPixels.length > 0) {
            window.FACEBOOK_PIXEL_CONFIG.additionalPixels.forEach(function(pixelId) {
                fbq('init', pixelId);
                console.log('Pixel adicional inicializado:', pixelId);
            });
        }
        
        // Envia PageView inicial para todos os pixels
        fbq('track', 'PageView');
        
        console.log('Facebook Pixel carregado com sucesso');
        console.log('Pixels ativos:', [window.FACEBOOK_PIXEL_CONFIG.pixelId].concat(window.FACEBOOK_PIXEL_CONFIG.additionalPixels));
    }
    
    // Função principal de inicialização
    function initialize() {
        if (!window.FACEBOOK_PIXEL_CONFIG) {
            console.error("Configuração do Pixel não encontrada. Carregue pixel/config.js primeiro.");
            return;
        }
        loadUTMify();
        loadFacebookPixel();
    }
    
    // Inicia o carregamento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})(); 