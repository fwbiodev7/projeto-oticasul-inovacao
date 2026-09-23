# 👓 Manual Prático do Site — Sul Ótica

Bem-vindo ao guia oficial do site da **Sul Ótica** (Rua Alves e Silva, 61 — Centro, Varginha/MG).

Este documento foi preparado especialmente para você, proprietário da loja, e para a sua equipe aprenderem a utilizar todos os recursos da plataforma, encantar os clientes no balcão e gerenciar o catálogo de produtos com facilidade.

---

## 📑 Índice
1. [Visão Geral e Proposta de Valor](#1-visão-geral-e-proposta-de-valor)
2. [Roteiro de Demonstração para Clientes (Passo a Passo no Balcão)](#2-roteiro-de-demonstração-para-clientes)
3. [Como Adicionar, Editar e Remover Óculos do Catálogo](#3-como-adicionar-editar-e-remover-óculos-do-catálogo)
   - [⭐ Painel Administrativo Secreto (`/admsecreto`) — Recomendado](#31-painel-administrativo-secreto-admsecreto--recomendado)
   - [Método Rápido: Pelo Catálogo Público do Site](#32-método-rápido-pelo-catálogo-público)
   - [Método Técnico: Permanente no Código-Fonte](#33-método-técnico-permanente-no-código-fonte)
4. [Entendendo o Visagismo com Inteligência Artificial](#4-entendendo-o-visagismo-com-ia)
5. [Como Funcionam os Botões de WhatsApp](#5-como-funcionam-os-botões-de-whatsapp)
6. [Perguntas Frequentes e Dicas do Dia a Dia](#6-perguntas-frequentes)

---

## 1. Visão Geral e Proposta de Valor

O site da Sul Ótica une a **tradição de mais de 45 anos** da família Pressato com **tecnologia de ponta em inteligência artificial**.

### Principais Recursos:
- **Catálogo Dinâmico e Filtrável:** O cliente pode filtrar armações por Grau ou Sol e por formatos anatômicos (Redondo, Gatinho, Aviador, Retangular, Oval e Quadrado).
- **Visagismo Facial com IA:** O cliente envia uma foto ou usa a câmera do celular/tablet para receber uma análise das proporções do rosto e recomendações de armações que valorizam seus traços.
- **Painel Administrativo Reservado:** Uma página exclusiva (`/admsecreto`) para você adicionar, editar preços, alterar fotos e excluir armações sem burocracia nem necessidade de senha.
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
5. Na prévia, clique no botão azul: **"Analisar com IA"**.

### Etapa 3: Apresentando o Resultado (3 a 5 minutos)
- O sistema indicará o contorno predominante (por exemplo: *Oval*, *Quadrado*, *Redondo*, *Coração* ou *Alongado*).
- Explique que o visagismo serve como **ponto de partida e sugestão de estilo**, e que o diferencial da Sul Ótica é a experimentação presencial.
- O sistema já lista 3 armações ideais do catálogo para aquele rosto.
- Pegue no mostruário os óculos físicos correspondentes para o cliente provar na hora!

### Etapa 4: Fechamento via WhatsApp
- Se o cliente quiser pensar ou enviar as opções para a família, clique em **"Agendar atendimento"**.
- O WhatsApp abre automaticamente com a lista dos modelos recomendados já digitada para o número da loja.

---

## 3. Como Adicionar, Editar e Remover Óculos do Catálogo

Criamos um sistema completo para que o proprietário da loja tenha total autonomia sobre as armações exibidas.

---

### 3.1. Painel Administrativo Secreto (`/admsecreto`) — RECOMENDADO

Esta é a forma mais prática, completa e segura de gerenciar todo o acervo.

#### Como Acessar:
Basta digitar no navegador do seu computador ou celular:
- **No site publicado:** `https://sulotica-varginha.vercel.app/admsecreto` *(ou o domínio oficial da loja seguido de `/admsecreto`)*
- **No computador da loja (localhost):** `http://localhost:3000/admsecreto`

> 🔒 **Importante:** Esta página **não aparece no menu público do site** para os clientes não mexerem. Salve este link nos seus **Favoritos** do navegador para abrir sempre que precisar. Não precisa de login nem senha.

#### O que você pode fazer no Painel:

1. **Adicionar Nova Armação:**
   - Clique no botão azul **`+ Adicionar Nova Armação`**.
   - Digite o nome da peça (ex: *Milano Dourado*, *Capri Havana*).
   - Escolha a marca (ex: *Coleção Sul*, *Ray-Ban*, *Vogue*).
   - Defina o Tipo (**Grau**, **Sol** ou **Multifocal**).
   - Escolha o Formato do Rosto (**Redondo**, **Gatinho**, **Aviador**, **Retangular**, **Oval** ou **Quadrado**).
   - Preencha o Preço de Venda em reais.
   - Escolha a foto: você pode selecionar um dos modelos prontos do mostruário ou clicar em *"Enviar foto do seu computador / celular"* para subir a foto real do produto!
   - Clique em **Salvar Armação**.

2. **Editar Qualquer Armação Existente:**
   - Encontre a armação na lista (use o campo de busca se preferir).
   - Clique no botão branco **`Editar Armação`**.
   - Altere o preço, o nome, a cor, a foto ou as tags.
   - Clique em **Salvar Alterações**. A vitrine do site é atualizada na mesma hora!

3. **Excluir uma Armação:**
   - No card da armação que deseja tirar de linha, clique no ícone da **lixeira vermelha**.
   - Confirme a exclusão. A peça sairá imediatamente do catálogo e do visagismo.

4. **Fazer Backup e Segurança:**
   - **Exportar Backup:** Baixa um arquivo `.json` no seu computador com todo o catálogo salvo.
   - **Importar Backup:** Permite carregar um arquivo de backup em outro aparelho (ex: no celular ou em outro computador da loja).
   - **Restaurar Padrão:** Volta às 18 armações originais da Sul Ótica caso deseje reiniciar tudo.

---

### 3.2. Método Rápido: Pelo Catálogo Público

Caso esteja navegando na página pública de catálogo (`/catalogo`):
1. No topo da lista de produtos, você verá o botão **`+ Adicionar Modelo`**.
2. Clique nele para abrir a janela de cadastro rápido.
3. Para excluir produtos cadastrados por você, basta clicar na lixeira vermelha no canto do card.

---

### 3.3. Método Técnico: Permanente no Código-Fonte

Caso prefira deixar novos modelos gravados permanentemente no código do projeto (para que já venham de fábrica em qualquer novo computador):

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
     image: '/images/frame-champagne.png', // Ou foto personalizada
     category: 'Grau', // 'Grau' ou 'Sol'
     frameShape: 'Redondo', // 'Redondo' | 'Gatinho' | 'Aviador' | 'Retangular' | 'Oval' | 'Quadrado'
     tags: ['Acetato', 'Leve'],
     color: 'Dourado'
   },
   ```
4. Salve o arquivo e publique as alterações no GitHub.

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

### Como acessar o painel de gerenciamento de óculos?
Abra o navegador e entre em:
`http://localhost:3000/admsecreto` (ou no site da Vercel: `/admsecreto`).

### Como alterar o telefone ou WhatsApp no futuro?
Basta abrir o arquivo `.env.local` na raiz do projeto e atualizar a linha:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5535998892492
```

### O que fazer se um cliente tiver formato de rosto difícil de classificar?
O visagismo é uma ferramenta de engajamento e inspiração, não um exame médico. Recomende que o cliente experimente os formatos sugeridos e deixe o atendimento caloroso da sua equipe fazer o trabalho final de escolha!

---

*Sul Ótica — Tradição em Varginha desde 1980.*
