// Script específico para a página de pagamento
(function() {
    'use strict';
    
    // Variável global para armazenar o valor do pagamento
    window.paymentAmount = 0;
    
    // Função igual ao modelo do usuário para pegar parâmetros da URL
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Função para capturar o valor do pagamento
    function capturePaymentAmount() {
        const valueParam = new URLSearchParams(window.location.search).get('value');
        if (valueParam) {
            const cleanValue = valueParam.replace(/[^\d]/g, '');
            window.paymentAmount = parseInt(cleanValue, 10) / 100;
        } else {
            const amountElement = document.getElementById('displayAmount');
            if (amountElement) {
                const amountText = amountElement.textContent;
                const match = amountText.match(/R\$\s*([\d,]+\.?\d*)/);
                if (match) {
                    window.paymentAmount = parseFloat(match[1].replace(',', '.'));
                }
            }
        }
        if (window.FACEBOOK_PIXEL_CONFIG.debug) {
            console.log('Valor do pagamento capturado:', window.paymentAmount);
        }
    }
    
    let purchaseEventFired = false;
    // Função para gerar um event_id único por transação
    function generateEventId() {
        // Usa o ID da transação se disponível, senão gera um aleatório
        if (window.lastTransactionId) return 'purchase_' + window.lastTransactionId;
        return 'purchase_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    // Armazena o event_id globalmente para deduplicação
    window.uniqueEventId = generateEventId();
    
    // Função para enviar evento para a API de Conversões (server-side)
    function sendConversionAPI(value, currency, eventId) {
        fetch('pixel/fb_conversion.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                value: value,
                currency: currency,
                event_id: eventId,
                num_items: 1,
                source_url: window.location.href,
                pixel_id: window.FACEBOOK_PIXEL_CONFIG.pixelId,
                access_token: window.FACEBOOK_PIXEL_CONFIG.accessToken
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log('[API CONVERSÕES] Evento enviado com sucesso:', data);
            } else {
                console.warn('[API CONVERSÕES] Falha ao enviar evento:', data);
            }
        })
        .catch(err => {
            console.error('[API CONVERSÕES] Erro ao enviar evento:', err);
        });
    }
    
    // Função para disparar evento de Purchase com tentativas e event_id
    function trackPurchase(attempt = 1) {
        if (purchaseEventFired) {
            console.log('[PIXEL] Evento Purchase já disparado, ignorando novas tentativas.');
            return;
        }
        if (window.paymentAmount > 0) {
            const currency = window.FACEBOOK_PIXEL_CONFIG.currency || 'BRL';
            const eventId = window.uniqueEventId;
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                    value: window.paymentAmount,
                    currency: currency,
                    num_items: 1,
                    event_id: eventId
                });
                fbq('track', 'Donate', {
                    value: window.paymentAmount,
                    currency: currency,
                    event_id: eventId
                });
                // Dispara também para a API de Conversões
                sendConversionAPI(window.paymentAmount, currency, eventId);
                purchaseEventFired = true;
                console.log(`[PIXEL] Evento Purchase e Donate disparados (tentativa ${attempt}) com valor:`, window.paymentAmount, 'moeda:', currency, 'event_id:', eventId);
            } else {
                if (attempt < 5) {
                    console.warn(`[PIXEL] fbq não está pronto, tentando novamente em 400ms (tentativa ${attempt + 1})`);
                    setTimeout(() => trackPurchase(attempt + 1), 400);
                } else {
                    console.error('[PIXEL] fbq não carregou após 5 tentativas. Evento não enviado.');
                }
            }
        } else {
            console.error('[PIXEL] Valor do pagamento não foi capturado para disparar o evento de Compra.');
        }
    }
    
    // Função para monitorar o status do pagamento
    function monitorPaymentStatus() {
        // Monitora mudanças no elemento de sucesso
        const successElement = document.getElementById('paymentSuccess');
        if (successElement) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const isVisible = successElement.style.display !== 'none';
                        if (isVisible) {
                            // Pagamento aprovado - dispara evento de Purchase
                            setTimeout(function() {
                                trackPurchase();
                                // Disparo redundante antes do redirect
                                setTimeout(function() {
                                    trackPurchase();
                                }, 300);
                            }, 500);
                        }
                    }
                });
            });
            observer.observe(successElement, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
        // Também monitora a função startVerification existente
        const originalStartVerification = window.startVerification;
        if (typeof originalStartVerification === 'function') {
            window.startVerification = function(transactionId) {
                window.lastTransactionId = transactionId; // Salva para o event_id
                window.uniqueEventId = generateEventId(); // Atualiza event_id
                const verifyUrl = `https://api.rublion.com.br/v1/transactions/${transactionId}`;
                const verificationInterval = setInterval(async () => {
                    try {
                        const response = await fetch(verifyUrl, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "api-secret": "sk_4b65eed420ae704a69de809b325e8340c4f56a48e066b688aaafad55208c7e3d8eab735b2bade95863312885085438f146a7a17e0e27ed7e68a6177892e5bac1"
                            }
                        });
                        const result = await response.json();
                        console.log("[Rublion Consulta] Resposta:", result);
                        if (result && result.status === "AUTHORIZED") {
                            clearInterval(verificationInterval);
                            trackPurchase();
                            // Marca conversão na UTMIFY
                            if (window.utmifyConversion) {
                                window.utmifyConversion();
                                console.log('[UTMIFY] Conversão marcada!');
                            } else {
                                console.warn('[UTMIFY] utmifyConversion não está disponível.');
                            }
                            // Disparo redundante antes do redirect
                            setTimeout(function() {
                                trackPurchase();
                            }, 300);
                            document.getElementById("paymentSuccess").style.display = "flex";
                            setTimeout(() => { 
                                window.location.href = "../upback"; 
                            }, 3000);
                        }
                    } catch (err) {
                        if (window.FACEBOOK_PIXEL_CONFIG.debug) {
                            console.warn("[Rublion Consulta] Erro ao verificar pagamento:", err);
                        }
                    }
                }, 1000); // Verifica a cada 1 segundo
            };
        }
    }
    
    // Função para sobrescrever a função generatePixCode para incluir UTMs
    function overrideGeneratePixCode() {
        const originalGeneratePixCode = window.generatePixCode;
        if (typeof originalGeneratePixCode === 'function') {
            window.generatePixCode = async function() {
                const valueParam = getUrlParameter("value");
                let localAmount = 3000;
                if(window.globalAmount) {
                    localAmount = window.globalAmount;
                }

                if (valueParam) {
                    const cleanValue = valueParam.replace(/[^\d]/g, "");
                    localAmount = parseInt(cleanValue, 10);
                    document.getElementById("displayAmount").textContent = "Valor: " + formatCurrency(localAmount / 100);
                }
                // UTMs exatamente como no modelo do usuário
                const utm = {
                    source: getUrlParameter("utm_source") || "",
                    medium: getUrlParameter("utm_medium") || "",
                    campaign: getUrlParameter("utm_campaign") || "",
                    content: getUrlParameter("utm_content") || "",
                    term: getUrlParameter("utm_term") || ""
                };
                // Gerar um external_id único para a transação
                const externalId = "ext_" + Date.now() + Math.floor(Math.random() * 10000);
                const payload = {
                    external_id: externalId,
                    total_amount: localAmount / 100,
                    payment_method: "PIX",
                    webhook_url: "https://oficial-lojasegura.site/webhook-rublion.php",
                    items: [
                        {
                            id: "item1",
                            title: "Renda extra Front",
                            description: "Pagamento via PIX",
                            price: localAmount / 100,
                            quantity: 1,
                            is_physical: false
                        }
                    ],
                    ip: "127.0.0.1", // Opcional: pode ser dinâmico se desejar
                    customer: {
                        name: "Cliente front",
                        email: "cliente@gmail.com",
                        phone: "11999999999",
                        document_type: "CPF",
                        document: generateValidCPF(),
                        utm_source: utm.source,
                        utm_medium: utm.medium,
                        utm_campaign: utm.campaign,
                        utm_content: utm.content,
                        utm_term: utm.term
                    }
                    // splits: [] // Adicione se necessário
                };
                try {
                    const response = await fetch("https://api.rublion.com.br/v1/transactions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "api-secret": "sk_4b65eed420ae704a69de809b325e8340c4f56a48e066b688aaafad55208c7e3d8eab735b2bade95863312885085438f146a7a17e0e27ed7e68a6177892e5bac1"
                        },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();
                    if (result && result.pix && result.pix.payload && result.id) {
                        updatePixCode(result.pix.payload);
                        startVerification(result.id);
                    } else {
                        document.getElementById("pix-loading").textContent = "Erro ao gerar PIX. Tente novamente.";
                        throw new Error("Resposta inválida da API.");
                    }
                } catch (error) {
                    document.getElementById("pix-loading").textContent = "Erro ao gerar PIX. Tente novamente mais tarde.";
                    console.error("Erro ao gerar PIX:", error);
                }
            };
        }
    }
    
    // Inicialização
    function initPaymentTracking() {
        // Captura o valor do pagamento
        capturePaymentAmount();
        
        // Monitora o status do pagamento
        monitorPaymentStatus();
        
        // Sobrescreve a função de geração do PIX para incluir UTMs
        overrideGeneratePixCode();
    }
    
    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPaymentTracking);
    } else {
        initPaymentTracking();
    }
})(); 