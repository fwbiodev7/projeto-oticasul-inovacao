# 👓 Manual Prático do Site — Sul Ótica

Bem-vindo ao guia oficial do site da **Sul Ótica** (Rua Alves e Silva, 61 — Centro, Varginha/MG).

Este documento foi preparado especialmente para você, proprietário da loja, e para a sua equipe aprenderem a utilizar todos os recursos da plataforma, encantar os clientes no balcão e gerenciar o catálogo de produtos com facilidade.

---

## 📑 Índice
1. [Visão Geral e Proposta de Valor](#1-visão-geral-e-proposta-de-valor)
2. [Roteiro de Demonstração para Clientes (Passo a Passo no Balcão)](#2-roteiro-de-demonstração-para-clientes)
3. [Como Adicionar Novos Óculos ao Catálogo](#3-como-adicionar-novos-óculos-ao-catálogo)
   - [Método 1: Pelo Próprio Site (Fácil e Sem Código)](#método-1-direto-pelo-site-fácil-e-rápido)
   - [Método 2: De Forma Permanente no Arquivo de Dados](#método-2-permanente-no-código-fonte)
4. [Entendendo o Visagismo com Inteligência Artificial](#4-entendendo-o-visagismo-com-ia)
5. [Como Funcionam os Botões de WhatsApp](#5-como-funcionam-os-botões-de-whatsapp)
6. [Perguntas Frequentes e Dicas do Dia a Dia](#6-perguntas-frequentes)

---

## 1. Visão Geral e Proposta de Valor

O site da Sul Ótica une a **tradição de mais de 45 anos** da família Pressato com **tecnologia de ponta em inteligência artificial**.

### Principais Recursos:
- **Catálogo Dinâmico e Filtrável:** O cliente pode filtrar armações por Grau ou Sol e por formatos anatômicos (Redondo, Gatinho, Aviador e Retangular).
- **Visagismo Facial com IA:** O cliente envia uma foto ou usa a câmera do celular/tablet para receber uma análise das proporções do rosto e recomendações de armações que valorizam seus traços.
- **Integração com WhatsApp:** Cada recomendação e cada produto do catálogo tem um botão direto para o WhatsApp oficial da loja (`35 99889-2492`), já com a mensagem pronta informando o modelo escolhido.
- **Localização e Tradição:** Informações precisas sobre o endereço na Rua Alves e Silva, horários de funcionamento e história da ótica.

---

## 2. Roteiro de Demonstração para Clientes

Quando um cliente entrar na loja ou você estiver apresentando o site em um tablet/celular:

### Etapa 1: Acolhimento e Abertura (1 a 2 minutos)
> *"Temos uma novidade para ajudar você a escolher a armação perfeita. Desenvolvemos uma ferramenta de visagismo com inteligência artificial que avalia o contorno do seu rosto e sugere os modelos que mais valorizam o seu estilo."*

### Etapa 2: A Análise Facial (2 a 3 minutos)
1. Acesse o menu **Visagismo IA** (ou clique em *Analisar meu rosto* na página inicial).
2. Peça permissão ao cliente e clique em **"Usar câmera"** (ou escolha uma foto da galeria dele).
3. Posicione o rosto de frente, com boa iluminação e o cabelo afastado das bochechas e testa.
4. Clique em **"Capturar foto"**.
5. Na prévia, clique no botão azul com brilho: **"Analisar com IA"**.

### Etapa 3: Apresentando o Resultado (3 a 5 minutos)
- O sistema indicará o contorno predominante (por exemplo: *Oval*, *Quadrado*, *Redondo*, *Coração* ou *Alongado*).
- Explique que o visagismo serve como **ponto de partida e sugestão de estilo**, e que o diferencial da Sul Ótica é a experimentação presencial.
- O sistema já lista 3 armações ideais do catálogo para aquele rosto.
- Pegue no mostruário os óculos físicos correspondentes para o cliente provar na hora!

### Etapa 4: Fechamento via WhatsApp
- Se o cliente quiser pensar ou enviar as opções para a família, clique em **"Agendar atendimento"**.
- O WhatsApp abre automaticamente com a lista dos modelos recomendados já digitada para o número da loja.

---

## 3. Como Adicionar Novos Óculos ao Catálogo

Você tem **duas formas** de gerenciar o catálogo: direto na tela do navegador ou pelo arquivo de dados.

### Método 1: Direto pelo Site (Fácil e Rápido)

Você não precisa mexer em nenhuma linha de código para cadastrar armações enquanto demonstra o site!

1. No menu superior, clique em **Catálogo** (`/catalogo`).
2. Logo acima das armações, do lado direito da contagem de modelos, clique no botão escuro **`+ Adicionar Modelo`**.
3. Uma janela se abrirá na tela:
   - **Nome do Modelo:** Digite o nome da peça (ex: *Milano Bronze*, *Capri Tartaruga*).
   - **Tipo:** Escolha se é óculos de **Grau** ou de **Sol**.
   - **Formato:** Selecione o formato (**Redondo**, **Gatinho**, **Aviador** ou **Retangular**).
   - **Preço (R$):** Digite o valor de venda (ex: `389`).
   - **Cor da Armação:** Ex: *Dourado com Havana*, *Preto Fosco*.
   - **Tags:** Detalhes da peça separados por vírgula (ex: *Leve, Acetato Italiano, UV400*).
   - **Foto:** Você pode clicar em um dos modelos visuais prontos ou clicar em *"Enviar foto do seu computador / celular"* para carregar a foto real do óculos tirada na loja!
4. Clique no botão azul **"Salvar Armação"**.
5. **Pronto!** O óculos aparecerá imediatamente no catálogo. O site salva essas alterações na memória do seu navegador.
6. Se quiser remover um modelo que você cadastrou, basta clicar no ícone de **lixeira vermelha** que aparece no canto superior do card.
7. Se quiser voltar ao catálogo original, clique em **"Restaurar catálogo"**.

---

### Método 2: Permanente no Código-Fonte

Para cadastrar produtos que fiquem salvos de forma definitiva para todos os visitantes da internet:

1. Abra o arquivo:
   ```
   src/lib/mock-data.ts
   ```
2. Você verá a lista `export const products: Product[] = [...]`.
3. Cada produto tem o seguinte formato:
   ```ts
   {
     id: '19',
     name: 'Nome do Seu Óculos',
     brand: 'Coleção Sul',
     price: 399,
     image: '/images/frame-champagne.png', // Ou /images/frame-aviator.png, frame-cat-eye.png, frame-rectangular.png
     category: 'Grau', // 'Grau' ou 'Sol'
     frameShape: 'Redondo', // 'Redondo' | 'Gatinho' | 'Aviador' | 'Retangular'
     tags: ['Acetato', 'Leve'],
     color: 'Dourado'
   },
   ```
4. Basta copiar um bloco existente, colar no final antes do `];`, mudar o `id` para o próximo número (ex: `'19'`) e preencher com os dados da armação.
5. Salve o arquivo. O site atualiza na mesma hora!

---

## 4. Entendendo o Visagismo com IA

O sistema da Sul Ótica foi desenvolvido com uma **tecnologia de resiliência quádrupla** única no mercado:

| Camada | Provedor | Como Funciona |
| :--- | :--- | :--- |
| **Plano A (Principal)** | **Google Gemini 3.6 Flash** | Processa a foto em nuvem com alta velocidade e precisão estética. |
| **Plano B (Reserva 1)** | **Hugging Face Router** | Se a cota do Gemini atingir o limite temporário, aciona automaticamente o Hugging Face. |
| **Plano C (Reserva 2)** | **NVIDIA NIM Vision** | Modelo Llama 3.2 11B Vision de alta fidelidade visual hospedado nos servidores da NVIDIA. |
| **Plano D (Offline / Local)** | **MediaPipe FaceLandmarker** | Se a loja estiver sem internet ou todas as APIs em nuvem caírem, o site mede os pontos faciais no próprio aparelho sem consumir dados nem tokens! |

> **Segurança e LGPD:** O site não salva fotos de clientes em banco de dados nem armazena biometria facial permanente. A foto é usada exclusivamente no momento da leitura.

---

## 5. Como Funcionam os Botões de WhatsApp

Todos os botões do site foram configurados para o número oficial da Sul Ótica:
- **Telefone:** `(35) 99889-2492`
- **Link gerado:** `https://wa.me/5535998892492`

### Exemplos de mensagens automáticas que chegam para você:
- **Pelo botão de produto no catálogo:**
  > *"Olá! Tenho interesse na armação Aurora Champagne (01). Pode me ajudar?"*
- **Pelo resultado do Visagismo:**
  > *"Olá! Fiz o visagismo por IA e gostaria de experimentar estas armações: Aurora Champagne, Brisa Cristal, Nina Light."*
- **Pelo formulário de contato:**
  > *"Olá, Sul Ótica! Meu nome é João. Gostaria de saber se vocês têm lentes multifocais digitais. Meu telefone: (35) 99999-9999"*

---

## 6. Perguntas Frequentes

### Como iniciar o site na loja todos os dias?
No computador da loja, basta abrir o terminal e digitar:
```bash
npm run dev
```
Depois, abra o navegador em `http://localhost:3000`.

### Como alterar o telefone ou WhatsApp no futuro?
Basta abrir o arquivo `.env.local` na raiz do projeto e atualizar a linha:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5535998892492
```

### O que fazer se um cliente tiver formato de rosto difícil de classificar?
O visagismo é uma ferramenta de engajamento e inspiração, não um exame médico. Recomende que o cliente experimente os formatos sugeridos e deixe o atendimento caloroso da sua equipe fazer o trabalho final de escolha!

---

*Sul Ótica — Tradição em Varginha desde 1980.*
