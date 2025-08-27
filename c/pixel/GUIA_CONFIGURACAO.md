# 🎯 Guia de Configuração do Pixel do Facebook

## 📋 Resumo da Configuração Atual

✅ **Status**: Sistema configurado e funcionando  
🔧 **Pixel Principal**: `697876539759619`  
🌐 **Páginas Ativas**: 3 páginas (principal, checkout, pagamento)  
📊 **Eventos**: PageView, InitiateCheckout, Purchase  
🔗 **UTM**: Sistema de captura automática ativo  

---

## 🚀 Como Testar o Pixel

### 1. Página de Teste
Acesse: `pixel/test.html` para testar todos os eventos e configurações.

### 2. Teste Manual no Console
```javascript
// Verificar se o pixel está carregado
window.isFacebookPixelLoaded()

// Disparar eventos manualmente
window.trackFacebookEvent('PageView')
window.trackFacebookEvent('InitiateCheckout')
window.trackFacebookEvent('Purchase', {value: 100.50, currency: 'BRL'})
```

### 3. Teste com UTMs
Acesse qualquer página com parâmetros UTM:
```
https://seudominio.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=teste&value=5000
```

---

## ⚙️ Configurações Disponíveis

### Arquivo: `pixel/config.js`

```javascript
window.FACEBOOK_PIXEL_CONFIG = {
    // Pixel ID principal
    pixelId: "697876539759619",
    
    // Pixels adicionais (opcional)
    additionalPixels: [
        // "123456789012345",
        // "987654321098765"
    ],
    
    // Moeda padrão
    currency: "BRL",
    
    // Modo debug (true/false)
    debug: true
};
```

---

## 📊 Eventos Configurados

### 1. PageView
- **Quando**: Carregamento de qualquer página
- **Páginas**: Todas
- **Parâmetros**: Nenhum

### 2. InitiateCheckout
- **Quando**: Carregamento da página de checkout
- **Páginas**: Apenas checkout
- **Parâmetros**: Nenhum

### 3. Purchase
- **Quando**: Pagamento aprovado
- **Páginas**: Apenas pagamento
- **Parâmetros obrigatórios**:
  - `value`: Valor do pagamento (número)
  - `currency`: Moeda (BRL, USD, EUR, GBP)

---

## 🔧 Como Adicionar Novos Pixels

### Opção 1: Adicionar Estaticamente
Edite o arquivo `pixel/config.js`:

```javascript
additionalPixels: [
    "123456789012345",  // Novo pixel 1
    "987654321098765"   // Novo pixel 2
]
```

### Opção 2: Adicionar Dinamicamente
Use JavaScript no console:

```javascript
// Adicionar novo pixel
window.addFacebookPixel("123456789012345");

// Remover pixel
window.removeFacebookPixel("123456789012345");
```

---

## 🎯 Como Disparar Eventos Específicos

### Eventos em Todos os Pixels
```javascript
window.trackFacebookEvent('PageView');
window.trackFacebookEvent('InitiateCheckout');
window.trackFacebookEvent('Purchase', {
    value: 100.50,
    currency: 'BRL'
});
```

### Eventos em Pixel Específico
```javascript
window.trackFacebookEventInPixel("123456789012345", "Purchase", {
    value: 100.50,
    currency: "BRL"
});
```

### Eventos em Todos os Pixels
```javascript
window.trackFacebookEventInAllPixels("Purchase", {
    value: 100.50,
    currency: "BRL"
});
```

---

## 🔍 Troubleshooting

### Problema: Pixel não carrega
**Solução**:
1. Verifique se o arquivo `pixel/config.js` está sendo carregado
2. Verifique se o arquivo `pixel/loader.js` está sendo carregado
3. Abra o console do navegador e verifique erros
4. Use `window.isFacebookPixelLoaded()` para verificar status

### Problema: Eventos não disparando
**Solução**:
1. Ative o modo debug: `debug: true` no config.js
2. Verifique se os parâmetros obrigatórios estão sendo fornecidos
3. Use a página de teste: `pixel/test.html`

### Problema: UTMs não sendo capturadas
**Solução**:
1. Verifique se o script UTMify está carregando
2. Verifique se os parâmetros UTM estão na URL
3. Use `console.log(window.utmify)` para verificar

---

## 📱 Verificação no Facebook Ads Manager

### 1. Acesse o Facebook Ads Manager
- Vá para [business.facebook.com](https://business.facebook.com)
- Selecione sua conta de anúncios

### 2. Verifique o Pixel
- Vá para **Eventos** > **Pixels**
- Procure pelo pixel ID: `697876539759619`
- Verifique se os eventos estão sendo recebidos

### 3. Teste com Facebook Pixel Helper
- Instale a extensão [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedmjlcbhdnplpahbom)
- Acesse suas páginas e verifique os eventos

---

## 🎨 Personalização

### Mudar Pixel Principal
Edite `pixel/config.js`:
```javascript
pixelId: "SEU_NOVO_PIXEL_ID"
```

### Mudar Moeda
Edite `pixel/config.js`:
```javascript
currency: "USD" // ou EUR, GBP
```

### Ativar/Desativar Debug
Edite `pixel/config.js`:
```javascript
debug: false // true para ativar, false para desativar
```

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique o console** do navegador para erros
2. **Use a página de teste**: `pixel/test.html`
3. **Ative o modo debug** para ver logs detalhados
4. **Verifique se todos os arquivos** estão sendo carregados
5. **Teste com Facebook Pixel Helper** para validação

---

## ✅ Checklist de Verificação

- [ ] Pixel carregando corretamente
- [ ] Eventos PageView disparando
- [ ] Eventos InitiateCheckout disparando
- [ ] Eventos Purchase disparando com valor correto
- [ ] UTMs sendo capturadas
- [ ] Múltiplos pixels funcionando (se aplicável)
- [ ] Debug mode funcionando
- [ ] Facebook Pixel Helper mostrando eventos
- [ ] Facebook Ads Manager recebendo dados

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0  
**Status**: ✅ Funcionando 