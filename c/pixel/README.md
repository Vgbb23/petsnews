# Sistema de Pixels do Facebook - Configuração Unificada

## 📊 Configuração Atual

### Pixel Principal
- **ID**: `687d28c779a373c410d98100`
- **Tipo**: UTMify + Facebook
- **Status**: Ativo em todas as páginas

### Páginas Configuradas
1. **`index.html`** - Página principal
2. **`c/checkout/index.html`** - Página de checkout
3. **`c/pagamento/index.html`** - Página de pagamento
4. **`c/upback/index.html`** - Página de sucesso

## 🎯 Eventos Configurados

### PageView
- **Disparado**: Automaticamente em todas as páginas
- **Parâmetros**: Nenhum obrigatório

### InitiateCheckout
- **Disparado**: Quando usuário inicia checkout
- **Parâmetros**: Nenhum obrigatório

### Purchase
- **Disparado**: Quando pagamento é confirmado
- **Parâmetros Obrigatórios**:
  - `value`: Valor da transação
  - `currency`: Moeda (padrão: BRL)

## 🚀 Como Usar

### Disparar Evento Manualmente
```javascript
// Evento de compra
window.trackFacebookEvent('Purchase', {
    value: 50.00,
    currency: 'BRL'
});

// Evento de checkout
window.trackFacebookEvent('InitiateCheckout');

// Evento de visualização de página
window.trackFacebookEvent('PageView');
```

### Verificar Status do Pixel
```javascript
// Verifica se o pixel está carregado
if (window.isFacebookPixelLoaded()) {
    console.log('Pixel carregado com sucesso');
}
```

## ⚙️ Configurações

### Moeda Padrão
- **BRL** (Real Brasileiro)

### Debug
- **Desabilitado** por padrão
- Para ativar: `window.FACEBOOK_PIXEL_CONFIG.debug = true`

## 📝 Notas Importantes

1. **Apenas 1 pixel** está configurado para evitar duplicação
2. **Sistema unificado** em todas as páginas
3. **Fallbacks** implementados para garantir funcionamento
4. **Logs detalhados** para debug quando necessário

## 🔧 Manutenção

### Adicionar Nova Página
1. Incluir os scripts do pixel:
```html
<script src="../pixel/config.js"></script>
<script src="../pixel/loader.js"></script>
<script src="../pixel/events.js"></script>
```

2. Disparar eventos conforme necessário

### Modificar Configurações
- Editar `c/pixel/config.js`
- Reiniciar páginas para aplicar mudanças 