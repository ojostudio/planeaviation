# Plane Aviation — Guia de Edição de Conteúdo
**Versão atual | Junho 2026**

Guia para Pedro, Fred e equipe editarem o site sem precisar mexer em lógica ou estrutura técnica.

---

## Índice
1. Estrutura de arquivos
2. Onde editar cada coisa
3. Como mudar cores, fontes e espaçamento (tokens)
4. Como mudar os botões
5. Como mudar o header glassmorphism
6. Como adicionar imagens nas páginas estáticas
7. Painel administrativo — aeronaves e frota Cirrus
8. Fluxo de publicação no GitHub
9. Dicas rápidas (tabela de referência)

---

## 1. Estrutura de arquivos

```
plane-aviation/
│
├── ★ styles.css          → Design system completo (tokens, componentes)
├── ★ i18n.js             → Todos os textos traduzíveis (PT / EN / ES)
│
├── site.js               → Header, footer, menu mobile — logos embutidas
├── firebase-config.js    → Chaves do Firebase (não editar)
├── firestore.rules       → Regras de segurança Firestore (publicar no console)
├── storage.rules         → Regras do Storage (publicar no console)
│
├── index.html            → Home
├── aeronaves.html        → Listagem de aeronaves (filtros dinâmicos)
├── aeronave.html         → Detalhe de uma aeronave
├── universo-cirrus.html  → Universo Cirrus / frota demonstração
├── sobre.html            → Sobre a Plane Aviation
├── servicos.html         → Serviços
├── contato.html          → Contato
├── configurador.html     → Configurador de aeronave
├── news.html             → News & Podcast
│
├── admin.html            → Painel administrativo (não editar manualmente)
│
├── SETUP.md              → Guia técnico de configuração Firebase
└── EDITORIAL.md          → Este arquivo
```

**Os arquivos marcados com ★ são os que você mais vai editar.**

---

## 2. Onde editar cada coisa

### Textos do menu, rodapé e botões globais
**Arquivo:** `i18n.js`

Cada texto traduzível tem este formato:
```js
nome_da_chave: { pt:"Texto em português", en:"English text", es:"Texto en español" },
```

Edite apenas os valores entre aspas. **Nunca mude as chaves** (a parte antes dos dois pontos).

**Exemplo — mudar o texto do botão de contato no menu:**
```js
// Antes:
nav_cta: { pt:"Falar com um Especialista", en:"Talk to a Specialist", es:"Hablar con un Especialista" },

// Depois:
nav_cta: { pt:"Fale com um Consultor", en:"Talk to a Consultant", es:"Hable con un Consultor" },
```

---

### Textos de parágrafos e seções dentro das páginas
**Arquivo:** o `.html` da página correspondente.

Existem dois tipos de elemento:

**Com `data-i18n` → edite em `i18n.js`:**
```html
<h1 data-i18n="sobre_title">Sobre a Plane Aviation</h1>
```
Encontre a chave `sobre_title` no `i18n.js` e edite lá.

**Sem `data-i18n` → edite diretamente no HTML:**
```html
<p>Há mais de 20 anos, a Plane Aviation é a representante exclusiva...</p>
```
Edite o texto entre as tags `<p>` e `</p>`.

---

### Informações de contato (endereço, telefone, e-mail)
**Arquivo:** `site.js` — procure o bloco do footer:
```js
<p>Hangar Plane Aviation</p>
<p>Aeroporto de Jundiaí — SP</p>
<p>contato@planeaviation.com.br</p>
<p>+55 (11) 9999-0000</p>
```
Edite os valores entre as tags `<p>`.

---

### Aeronaves à venda e Frota Cirrus
**Acesse pelo painel:** `https://pedro-ojo.github.io/planeaviation/admin.html`

Login com e-mail e senha do Firebase. Não é necessário editar nenhum arquivo.

---

## 3. Como mudar cores, fontes e espaçamento

**Tudo em um único lugar:** `styles.css`, seção `2. TOKENS` no topo do arquivo.
Mudar uma variável aqui reflete em **todo o site automaticamente**.

### Cores
```css
--background:        0 0% 97%;   /* fundo da página */
--foreground:        0 0% 10%;   /* texto principal / preto */
--muted:             0 0% 94%;   /* fundo de seções cinza claro */
--muted-foreground:  0 0% 45%;   /* textos secundários */
--border:            0 0% 82%;   /* cor das bordas */
--card:              0 0% 100%;  /* fundo de cards */
```
Formato: `H S% L%` (matiz, saturação, luminosidade).
- `L%` mais alto = mais claro. `L%` mais baixo = mais escuro.
- `S%` em 0% = escala de cinza. Adicionar saturação coloca cor.

**Exemplo — adicionar uma cor de destaque vermelha:**
```css
/* Adicione dentro de :root { } */
--accent-red: 0 85% 50%;

/* Use em qualquer elemento: */
color: hsl(var(--accent-red));
background: hsl(var(--accent-red));
```

### Fonte
```css
--font: 'Inter', ui-sans-serif, system-ui, sans-serif;
```
Para trocar para outra Google Font:
1. Substitua o `@import` no topo do `styles.css` pela nova fonte
2. Atualize `--font` com o novo nome

### Tamanhos de texto
```css
--font-size-body:  1rem;        /* 16px — parágrafos */
--font-size-small: .875rem;     /* 14px — textos secundários */
--font-size-xs:    .75rem;      /* 12px — labels, legendas */
--font-size-h2:    clamp(1.5rem, 3vw, 2.25rem);
--font-size-h3:    1.125rem;
--font-size-hero:  clamp(1.875rem, 5vw, 3.75rem); /* responsivo */
```
`clamp(mínimo, preferido, máximo)` — o valor do meio é responsivo (vw = % da largura da tela).

---

## 4. Como mudar os botões

**Arquivo:** `styles.css` → seção `2. TOKENS`

```css
--btn-bg:       hsl(var(--foreground));  /* cor de fundo — padrão: preto */
--btn-fg:       hsl(var(--background));  /* cor do texto — padrão: branco */
--btn-padding:  .75rem 1.75rem;          /* espaço interno (vertical horizontal) */
--btn-weight:   700;                     /* espessura da fonte: 400=normal, 700=negrito */
--btn-tracking: .06em;                   /* espaço entre letras */
```

Mudar `--btn-bg` altera a cor de **todos** os botões sólidos do site de uma vez.

**Tipos de botão disponíveis:**
- `.btn-solid` → preenchido (ação principal)
- `.btn-outline` → contorno (ação secundária)
- `.btn-invert` → preenchido branco (em fundos escuros)

**Tamanhos:**
- `.btn-xs` → menu e lugares compactos
- `.btn-sm` → ações secundárias
- `.btn-md` → CTAs de seção
- `.btn-lg` → CTAs principais

---

## 5. Como mudar o header glassmorphism

**Arquivo:** `styles.css` → seção `2. TOKENS`

```css
--glass-bg:      rgba(255, 255, 255, 0.72); /* transparência: 0=invisível, 1=sólido */
--glass-blur:    18px;                       /* intensidade do desfoque */
--glass-border:  rgba(255, 255, 255, 0.45); /* cor da borda interna */
--glass-shadow:  0 4px 32px rgba(0,0,0,.10);/* sombra (x y blur cor) */
--header-top:    1.25rem;                    /* distância do topo da tela */
--header-h:      3.5rem;                    /* altura da pill */
--radius-xl:     1.5rem;                    /* arredondamento dos cantos */
```

**Exemplos de variações:**

Header mais opaco (menos transparência):
```css
--glass-bg: rgba(255, 255, 255, 0.92);
```

Header com fundo escuro (ex: para fotos de fundo escuras):
```css
--glass-bg: rgba(15, 15, 15, 0.75);
/* Também ajuste a cor do texto dos links no header para claro */
```

Header menos arredondado:
```css
--radius-xl: 0.5rem;
```

---

## 6. Como adicionar imagens nas páginas estáticas

As páginas têm placeholders `<div class="ph">` onde imagens reais entrarão.

**Como substituir um placeholder por imagem real:**
```html
<!-- Antes (placeholder): -->
<div class="ph" style="aspect-ratio:16/9">
  <span class="lbl">[Imagem aqui]</span>
</div>

<!-- Depois (imagem real): -->
<img src="images/nome-da-imagem.jpg"
     alt="Descrição acessível da imagem"
     style="width:100%;aspect-ratio:16/9;object-fit:cover">
```

**Onde colocar as imagens:**
- Crie uma pasta `/images/` na raiz do repositório GitHub
- Faça upload das imagens lá
- Referencie como `src="images/nome-do-arquivo.jpg"`

Ou use URL de serviço externo (Cloudinary, ImgBB, etc.):
```html
<img src="https://res.cloudinary.com/seuprojeto/image/upload/foto.jpg" alt="...">
```

**Formatos recomendados:**
- `.jpg` ou `.webp` para fotos (menor tamanho)
- `.png` para logos e imagens com transparência
- Largura máxima recomendada: 1600px
- Peso máximo recomendado: 400 KB por imagem

---

## 7. Painel administrativo

**URL:** `https://pedro-ojo.github.io/planeaviation/admin.html`

### Aeronaves à venda
Campos disponíveis ao cadastrar/editar uma aeronave:

| Campo | Descrição | Obrigatório |
|---|---|---|
| Modelo | Ex: SR22T, Vision Jet | ✅ |
| Ano | Ano de fabricação | ✅ |
| Condição | Novo ou Seminovo | — |
| Horas totais (célula) | Horas da célula da aeronave | — |
| Motor (horas) | Horas do motor | — |
| Hélice (horas) | Horas da hélice | — |
| Localização | Cidade — UF | — |
| Moeda | USD ou BRL | — |
| Preço | Só o número (ex: 850000) | — |
| Selo (tag) | Ex: EXCLUSIVO PLANE | — |
| Imagens | Até 3 fotos (modo sem Storage) | — |
| Descrição | Texto livre longo | — |
| Ficha técnica | Linhas de rótulo + valor | — |
| Tecnologias a bordo | Ícone + título + descrição | — |

**Como os campos aparecem no site:**
- **Metas (pills):** Ano, Célula, Motor e Hélice aparecem como tags abaixo do nome — só os que tiverem valor preenchido
- **Preço:** formatado automaticamente com símbolo da moeda (USD 850,000 ou R$ 850.000)
- **Horas:** formatadas automaticamente com a palavra "horas" após o número
- **Descrição:** aparece abaixo da galeria de imagens
- **Ficha técnica e Tecnologias:** aparecem abaixo da descrição — seções ocultadas automaticamente se vazias
- **Outras opções:** no final da página de cada aeronave, aparecem cards das demais aeronaves do estoque automaticamente

### Traduções (PT / EN / ES)
Ao cadastrar, clique em **"Revisar Traduções →"** antes de salvar.
Uma segunda tela abre com três abas:
- **🇧🇷 PT** — readonly, mostra o original que você preencheu
- **🇺🇸 EN** — tradução automática via MyMemory, editável
- **🇪🇸 ES** — tradução automática via MyMemory, editável

Revise, corrija se necessário, depois clique **"Salvar com traduções"**.
O botão "↻ Traduzir novamente" refaz a tradução automática caso queira.

### Frota Cirrus (Universo Cirrus)
Na aba **Frota Cirrus** do admin, clique em **"↓ Popular modelos padrão"** para criar os 4 modelos base (Vision Jet, SR22T, SR22, SR20) de uma vez. Depois edite cada um para adicionar imagem e ajustar o conteúdo.

### Usuários
Apenas admins veem essa aba.
- **Admin:** acesso total, pode gerenciar usuários
- **Editor:** pode adicionar/editar/remover aeronaves e frota Cirrus

Ao convidar um novo usuário, ele recebe um e-mail para definir a própria senha. Nenhuma senha é digitada ou armazenada pelo admin.

---

## 8. Fluxo de publicação no GitHub

1. Edite os arquivos localmente ou diretamente no GitHub.com
2. Faça commit (salve) as alterações
3. O GitHub Pages publica automaticamente em ~1 minuto
4. Force refresh no navegador: **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows)

**Atenção:** os arquivos devem ficar na **raiz** do repositório, não dentro de subpastas. A raiz do repo deve conter diretamente `index.html`, `styles.css`, `site.js`, etc.

---

## 9. Dicas rápidas

| O que mudar | Onde | Como |
|---|---|---|
| Texto do menu e botões | `i18n.js` | Chaves `nav_*` |
| Texto do rodapé | `i18n.js` | Chaves `f_*` |
| Telefone / endereço | `site.js` | Bloco `FOOTER`, tags `<p>` |
| Cor dos botões | `styles.css` | `--btn-bg` e `--btn-fg` |
| Fonte do site | `styles.css` | `--font` + `@import` |
| Tamanho do título hero | `styles.css` | `--font-size-hero` |
| Transparência do header | `styles.css` | `--glass-bg` |
| Blur do header | `styles.css` | `--glass-blur` |
| Distância do topo | `styles.css` | `--header-top` |
| Espaço entre seções | `styles.css` | `--section-py` |
| Aeronaves à venda | Admin | `admin.html` |
| Frota Cirrus | Admin | `admin.html` |
| Regras de segurança | Firebase Console | Firestore → Regras |

