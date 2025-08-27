# 🎯 Verificação de Campanhas do Facebook

## 📊 Como Verificar se os Eventos Chegam nas Campanhas

### ✅ **Passo 1: Verificar no Facebook Events Manager**

1. **Acesse o Facebook Business Manager**
   - Vá para [business.facebook.com](https://business.facebook.com)
   - Faça login com sua conta

2. **Navegue até Eventos**
   - Menu lateral → **Eventos** → **Pixels**
   - Procure pelo pixel: `697876539759619`

3. **Verifique os Eventos Recebidos**
   - Clique no seu pixel
   - Vá para a aba **Eventos**
   - Verifique se aparecem:
     - ✅ PageView
     - ✅ InitiateCheckout  
     - ✅ Purchase

### ✅ **Passo 2: Verificar no Facebook Ads Manager**

1. **Acesse o Ads Manager**
   - Vá para [adsmanager.facebook.com](https://adsmanager.facebook.com)

2. **Verifique as Campanhas**
   - Selecione suas campanhas
   - Vá para **Resultados** ou **Métricas**
   - Procure por:
     - **Inícios de Checkout**
     - **Compras**
     - **Conversões**

3. **Configurar Eventos de Conversão**
   - Vá para **Configurações da Campanha**
   - Selecione **Otimização e Entrega**
   - Em **Otimizar para**, escolha:
     - **Inícios de Checkout** (para campanhas de tráfego)
     - **Compras** (para campanhas de conversão)

### ✅ **Passo 3: Teste com Facebook Pixel Helper**

1. **Instale a Extensão**
   - [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedmjlcbhdnplpahbom)

2. **Teste nas Suas Páginas**
   - Acesse suas páginas
   - Clique na extensão
   - Verifique se aparecem os eventos

3. **Verifique os Parâmetros**
   - Confirme que `value` e `currency: "BRL"` estão sendo enviados

---

## 🎯 Configuração de Campanhas para Receber Eventos

### **Campanha de Tráfego**
```javascript
// Eventos que serão rastreados:
- PageView ✅
- InitiateCheckout ✅
```

### **Campanha de Conversão**
```javascript
// Eventos que serão rastreados:
- PageView ✅
- InitiateCheckout ✅
- Purchase ✅ (com valor e moeda BRL)
```

---

## 📈 Como Configurar Eventos de Conversão

### **1. No Facebook Ads Manager**

1. **Criar Campanha**
   - Escolha **Conversões** como objetivo

2. **Configurar Evento de Conversão**
   - **Otimizar para**: Purchase
   - **Valor da conversão**: Sim
   - **Janela de atribuição**: 1 dia de clique

3. **Configurar Orçamento**
   - **Orçamento diário**: Defina seu valor
   - **Lance**: Otimizado para conversões

### **2. Verificar Configurações**

```javascript
// Eventos que devem aparecer:
{
    "event_name": "Purchase",
    "event_time": "2024-12-XX",
    "value": 100.50,
    "currency": "BRL",
    "content_type": "product",
    "content_ids": ["doacao_janaina"]
}
```

---

## 🔍 Troubleshooting - Se os Eventos Não Chegarem

### **Problema 1: Eventos não aparecem no Events Manager**

**Soluções:**
1. **Verifique o Pixel ID**
   ```javascript
   // Confirme se está correto
   pixelId: "697876539759619"
   ```

2. **Teste o Pixel**
   ```javascript
   // No console do navegador
   window.isFacebookPixelLoaded() // Deve retornar true
   ```

3. **Verifique Bloqueadores**
   - Desative AdBlock temporariamente
   - Teste em modo incógnito

### **Problema 2: Eventos aparecem mas não nas campanhas**

**Soluções:**
1. **Verifique Configuração da Campanha**
   - Objetivo deve ser **Conversões**
   - Evento de conversão deve ser **Purchase**

2. **Verifique Janela de Atribuição**
   - Configure para 1-7 dias de clique
   - Aguarde 24-48 horas para dados

3. **Verifique Filtros**
   - Confirme que não há filtros de data
   - Verifique se a campanha está ativa

### **Problema 3: Valores não aparecem corretamente**

**Soluções:**
1. **Verifique Parâmetros**
   ```javascript
   // Deve estar sendo enviado
   {
       value: 100.50,
       currency: "BRL"
   }
   ```

2. **Teste Manual**
   ```javascript
   // No console
   window.trackFacebookEvent('Purchase', {
       value: 100.50,
       currency: 'BRL'
   });
   ```

---

## 📊 Métricas Importantes para Monitorar

### **No Events Manager**
- **Eventos recebidos**: Quantidade de cada evento
- **Taxa de erro**: Se há eventos com erro
- **Latência**: Tempo entre evento e recebimento

### **No Ads Manager**
- **Conversões**: Número de compras
- **Valor de conversão**: Valor total das compras
- **CPA**: Custo por aquisição
- **ROAS**: Retorno sobre investimento

---

## 🎯 Checklist de Verificação

### **Antes de Lançar Campanhas**
- [ ] Pixel carregando corretamente
- [ ] Eventos aparecendo no Events Manager
- [ ] Parâmetros corretos (value + currency BRL)
- [ ] Facebook Pixel Helper mostrando eventos
- [ ] Teste de conversão funcionando

### **Após Lançar Campanhas**
- [ ] Campanha configurada para conversões
- [ ] Evento de conversão selecionado (Purchase)
- [ ] Orçamento e lances configurados
- [ ] Aguardar 24-48 horas para dados
- [ ] Verificar métricas de conversão

---

## 🚀 Dicas para Melhor Performance

### **1. Otimização de Conversão**
```javascript
// Use eventos específicos
- InitiateCheckout: Para campanhas de consideração
- Purchase: Para campanhas de conversão
```

### **2. Segmentação**
```javascript
// Crie públicos baseados em eventos
- Pessoas que iniciaram checkout
- Pessoas que compraram
- Pessoas que visualizaram página
```

### **3. Remarketing**
```javascript
// Use eventos para remarketing
- Abandono de checkout
- Visualizadores de página
- Compradores (para upsell)
```

---

## 📞 Suporte Rápido

### **Se os eventos não chegarem:**

1. **Teste Imediato**
   ```javascript
   // No console do navegador
   window.trackFacebookEvent('Purchase', {value: 100.50, currency: 'BRL'});
   ```

2. **Verifique Facebook Pixel Helper**
   - Instale a extensão
   - Teste nas páginas

3. **Verifique Events Manager**
   - Acesse business.facebook.com
   - Vá para Eventos > Pixels

4. **Contate Suporte**
   - Use a página de teste: `pixel/test.html`
   - Ative debug: `debug: true` no config.js

---

**🎯 Resumo**: Se os eventos estão chegando no Events Manager, eles DEVEM chegar nas campanhas configuradas corretamente. O importante é configurar as campanhas para otimizar para os eventos corretos (Purchase para conversões). 