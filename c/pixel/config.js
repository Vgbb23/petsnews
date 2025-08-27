// Configuração centralizada dos Pixels do Facebook
window.FACEBOOK_PIXEL_CONFIG = {
    // Pixel ID principal - usando o ID do UTMify que está ativo
    pixelId: "758290256559612",
    
    // Token da API de Conversões
    accessToken: "TJhXI2XSHGWtjaEsxbjKCBy7zOTWH3Ayfvt5",
    
    // Array de pixels adicionais (vazio - apenas 1 pixel)
    additionalPixels: [
        // Removido todos os pixels adicionais para usar apenas 1
    ],
    
    // Configurações de eventos
    events: {
        pageView: {
            name: "PageView",
            required: false
        },
        initiateCheckout: {
            name: "InitiateCheckout",
            required: false
        },
        purchase: {
            name: "Purchase",
            required: true,
            requiredParams: ["value", "currency"]
        }
    },
    
    // Configurações de moeda
    currency: "BRL",
    
    // Configurações de debug
    debug: false
};

// Função para verificar se o Facebook Pixel está carregado
window.isFacebookPixelLoaded = function() {
    return typeof fbq !== 'undefined';
};

// Função para aguardar o carregamento do pixel
window.waitForFacebookPixel = function(callback) {
    if (window.isFacebookPixelLoaded()) {
        callback();
    } else {
        setTimeout(function() {
            window.waitForFacebookPixel(callback);
        }, 100);
    }
};

// Função para adicionar novos pixels dinamicamente (desabilitada - apenas 1 pixel)
window.addFacebookPixel = function(pixelId) {
    console.warn('Adição de pixels adicionais desabilitada - usando apenas 1 pixel principal');
};

// Função para remover pixels (desabilitada - apenas 1 pixel)
window.removeFacebookPixel = function(pixelId) {
    console.warn('Remoção de pixels desabilitada - usando apenas 1 pixel principal');
}; 