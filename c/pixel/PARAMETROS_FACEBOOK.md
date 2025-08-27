# 📊 Parâmetros Obrigatórios do Facebook Pixel

## 🎯 Resumo dos Parâmetros por Evento

### ✅ **PageView**
- **Parâmetros obrigatórios**: Nenhum
- **Parâmetros opcionais**: Todos os parâmetros padrão
- **Status**: ✅ Configurado corretamente

### ✅ **InitiateCheckout**
- **Parâmetros obrigatórios**: Nenhum
- **Parâmetros opcionais**: Todos os parâmetros padrão
- **Status**: ✅ Configurado corretamente

### ✅ **Purchase**
- **Parâmetros obrigatórios**: 
  - `value` (número) - Valor da transação
  - `currency` (string) - Moeda da transação
- **Parâmetros opcionais**:
  - `content_ids` - IDs dos produtos
  - `content_type` - Tipo de conteúdo
  - `num_items` - Número de itens
- **Status**: ✅ Configurado corretamente com BRL como padrão

---

## 🔧 Configuração Atual

### Moeda Padrão: BRL
```javascript
// Sempre enviado automaticamente
currency: "BRL"
```

### Parâmetros Enviados no Purchase
```javascript
{
    value: 100.50,        // Valor da transação (obrigatório)
    currency: "BRL"       // Moeda (obrigatório, sempre BRL)
}
```

---

## 📋 Parâmetros Padrão do Facebook

### Parâmetros Automáticos (não precisam ser enviados)
- `event_time` - Timestamp do evento
- `event_source_url` - URL da página
- `user_data` - Dados do usuário (se disponível)
- `custom_data` - Dados customizados

### Parâmetros Opcionais Recomendados
- `content_ids` - Array de IDs dos produtos
- `content_type` - Tipo de conteúdo (product, product_group)
- `num_items` - Número de itens na transação
- `content_name` - Nome do conteúdo
- `content_category` - Categoria do conteúdo

---

## 🎯 Validação dos Parâmetros

### Purchase Event
```javascript
// Validação implementada
if (!value) {
    console.error('Valor obrigatório não fornecido para Purchase');
    return;
}

if (isNaN(value) || value <= 0) {
    console.error('Valor inválido para Purchase');
    return;
}

// Moeda sempre BRL
const defaultCurrency = currency || 'BRL';
```

---

## 🔍 Verificação no Facebook

### 1. Facebook Pixel Helper
- Instale a extensão no Chrome
- Verifique se os parâmetros estão sendo enviados
- Confirme se `value` e `currency` estão presentes

### 2. Facebook Events Manager
- Acesse [business.facebook.com](https://business.facebook.com)
- Vá para **Eventos** > **Pixels**
- Verifique os eventos recebidos
- Confirme se os valores estão corretos

### 3. Teste Manual
```javascript
// Teste no console do navegador
window.trackFacebookEvent('Purchase', {
    value: 100.50,
    currency: 'BRL'
});
```

---

## ✅ Checklist de Validação

- [ ] **PageView**: Disparando sem parâmetros (correto)
- [ ] **InitiateCheckout**: Disparando sem parâmetros (correto)
- [ ] **Purchase**: Disparando com `value` e `currency` (correto)
- [ ] **Moeda**: Sempre BRL (correto)
- [ ] **Valor**: Número válido > 0 (correto)
- [ ] **Facebook Pixel Helper**: Mostrando parâmetros corretos
- [ ] **Events Manager**: Recebendo eventos corretamente

---

## 🚨 Problemas Comuns

### Erro: "Missing required parameter: value"
**Solução**: Verifique se o valor está sendo capturado corretamente

### Erro: "Invalid currency"
**Solução**: Moeda sempre será BRL (configurado automaticamente)

### Erro: "Event not received"
**Solução**: Verifique se o pixel está carregado corretamente

---

## 📞 Suporte

Se encontrar problemas com parâmetros:

1. **Ative o debug**: `debug: true` no config.js
2. **Use a página de teste**: `pixel/test.html`
3. **Verifique o console**: Para logs detalhados
4. **Teste com Facebook Pixel Helper**: Para validação visual

---

**Status**: ✅ Todos os parâmetros obrigatórios configurados corretamente  
**Moeda**: BRL (sempre enviada automaticamente)  
**Última verificação**: Dezembro 2024 