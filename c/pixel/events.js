// Funções para disparar eventos do Facebook Pixel
window.FacebookPixelEvents = {
    
    // Dispara evento de PageView
    trackPageView: function() {
        window.waitForFacebookPixel(function() {
            fbq('track', 'PageView');
            console.log('PageView disparado');
        });
    },
    
    // Dispara evento de InitiateCheckout
    trackInitiateCheckout: function() {
        window.waitForFacebookPixel(function() {
            fbq('track', 'InitiateCheckout');
            console.log('InitiateCheckout disparado');
        });
    },
    
    // Dispara evento de Purchase
    trackPurchase: function(value, currency) {
        window.waitForFacebookPixel(function() {
            // Validação dos parâmetros obrigatórios
            if (!value) {
                console.error('Valor obrigatório não fornecido para Purchase');
                return;
            }
            
            // Validação do valor
            if (isNaN(value) || value <= 0) {
                console.error('Valor inválido para Purchase');
                return;
            }
            
            // Garante que a moeda seja sempre BRL se não fornecida
            const defaultCurrency = currency || window.FACEBOOK_PIXEL_CONFIG.currency || 'BRL';
            
            // Parâmetros obrigatórios para o Facebook
            const purchaseParams = {
                value: value,
                currency: defaultCurrency
            };
            
            // Parâmetros opcionais recomendados pelo Facebook
            // content_ids: IDs dos produtos (opcional)
            // content_type: Tipo de conteúdo (opcional)
            // num_items: Número de itens (opcional)
            
            // Dispara o evento com os parâmetros obrigatórios
            fbq('track', 'Purchase', purchaseParams);
            
            console.log('Purchase disparado:', purchaseParams);
        });
    },
    
    // Função para disparar eventos em pixels específicos
    trackEventInPixel: function(pixelId, eventName, params) {
        window.waitForFacebookPixel(function() {
            if (typeof fbq !== 'undefined') {
                fbq('trackSingle', pixelId, eventName, params);
                console.log('Evento disparado no pixel específico:', {
                    pixelId: pixelId,
                    eventName: eventName,
                    params: params
                });
            }
        });
    },
    
    // Função para disparar eventos no pixel principal (único pixel)
    trackEventInMainPixel: function(eventName, params) {
        window.waitForFacebookPixel(function() {
            // Usa apenas o pixel principal
            const mainPixelId = window.FACEBOOK_PIXEL_CONFIG.pixelId;
            
            fbq('track', eventName, params);
            
            console.log('Evento disparado no pixel principal:', {
                eventName: eventName,
                params: params,
                pixelId: mainPixelId
            });
        });
    },
    
    // Função para formatar valor monetário
    formatCurrency: function(value) {
        // Remove caracteres não numéricos e converte para número
        const cleanValue = parseFloat(value.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
        return cleanValue;
    },
    
    // Função para validar moeda
    validateCurrency: function(currency) {
        const validCurrencies = ['BRL', 'USD', 'EUR', 'GBP'];
        return validCurrencies.includes(currency.toUpperCase());
    }
};

// Função global para facilitar o uso
window.trackFacebookEvent = function(eventName, params) {
    switch(eventName) {
        case 'PageView':
            window.FacebookPixelEvents.trackPageView();
            break;
        case 'InitiateCheckout':
            window.FacebookPixelEvents.trackInitiateCheckout();
            break;
        case 'Purchase':
            if (params && params.value) {
                // Garante que a moeda seja sempre enviada (padrão BRL)
                const currency = params.currency || window.FACEBOOK_PIXEL_CONFIG.currency || 'BRL';
                window.FacebookPixelEvents.trackPurchase(params.value, currency);
            } else {
                console.error('Valor obrigatório não fornecido para Purchase');
            }
            break;
        default:
            console.error('Evento não reconhecido:', eventName);
    }
};

// Função para disparar eventos em pixels específicos
window.trackFacebookEventInPixel = function(pixelId, eventName, params) {
    window.FacebookPixelEvents.trackEventInPixel(pixelId, eventName, params);
};

// Função para disparar eventos no pixel principal
window.trackFacebookEventInMainPixel = function(eventName, params) {
    window.FacebookPixelEvents.trackEventInMainPixel(eventName, params);
}; 