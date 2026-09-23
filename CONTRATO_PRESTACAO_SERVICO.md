# CONTRATO DE PRESTAÇÃO DE SERVIÇO DE DESENVOLVIMENTO E MANUTENÇÃO DE PLATAFORMA DIGITAL

---

**Contrato nº:** 1
**Data de emissão:** 23/9/2026
---

## IDENTIFICAÇÃO DAS PARTES

### CONTRATADO (Prestador de Serviço)

| Campo | Dados |
|:------|:------|
| **Nome completo:** | Fabio Ronaldo Lima Rodrigues |
| **CPF/CNPJ:** | 167.268.526-57 |
| **Endereço:** | Av. Joao Martinho da Ponte, Parque Rinaldi,70 |
| **Telefone / WhatsApp:** | **(35) 98844-2138** |
| **E-mail:** | zfabiobrronaldo@gmail.com |

Doravante denominado simplesmente **CONTRATADO**.

---

### CONTRATANTE (Cliente)

| Campo | Dados |
|:------|:------|
| **Razão Social / Nome Fantasia:** | _________________________________________________ |
| **CNPJ / CPF:** | _________________________________________________ |
| **Responsável legal:** | _________________________________________________ |
| **Endereço completo:** | _________________________________________________ |
| **Cidade / UF:** | _________________________________________________ |
| **Telefone / WhatsApp:** | _________________________________________________ |
| **E-mail:** | _________________________________________________ |

Doravante denominado simplesmente **CONTRATANTE**.

---

## CLÁUSULA 1ª — DO OBJETO DO CONTRATO

O presente contrato tem por objeto a **prestação de serviço de desenvolvimento, implantação, hospedagem e manutenção de plataforma digital (site institucional e comercial)** personalizada para o estabelecimento do CONTRATANTE, do ramo óptico, contendo as funcionalidades e ferramentas descritas na Cláusula 2ª.

---

## CLÁUSULA 2ª — DESCRIÇÃO DETALHADA DO PRODUTO E DAS FERRAMENTAS ENTREGUES

O site entregue ao CONTRATANTE incluirá as seguintes funcionalidades completas e operacionais:

### 2.1 — Páginas e Estrutura do Site

| Nº | Página / Módulo | Descrição |
|:--:|:----------------|:----------|
| 1 | **Página Inicial (Home)** | Apresentação institucional da ótica com identidade visual premium, seções de destaque de produtos, barra de tradição da loja, chamada para ação com WhatsApp e acesso ao provador facial com IA. |
| 2 | **Catálogo de Armações** | Vitrine digital completa com todos os óculos da loja, filtrável por categoria (Grau, Sol, Multifocal), formato de armação (Redondo, Gatinho, Aviador, Retangular, Oval, Quadrado), com fotos, preços, cores, tags e botão direto para WhatsApp em cada produto. |
| 3 | **Provador Virtual com Inteligência Artificial (Visagismo IA)** | Ferramenta exclusiva que analisa o formato do rosto do cliente a partir de uma foto ou câmera ao vivo, identifica o tipo facial (oval, redondo, quadrado, coração, alongado) e recomenda automaticamente 3 armações ideais do catálogo da loja. |
| 4 | **Página "Sobre Nós"** | Apresentação da história, tradição e valores da ótica com design editorial profissional. |
| 5 | **Página de Contato** | Formulário de contato com integração ao WhatsApp, mapa de localização e informações de endereço e horário de funcionamento. |
| 6 | **Painel Administrativo Protegido** | Área exclusiva com acesso por senha para o proprietário da loja gerenciar todo o catálogo de óculos (adicionar, editar, excluir), realizar backup do catálogo e restaurar configurações de fábrica — tudo sem necessidade de conhecimento técnico. |

---

### 2.2 — Tecnologias e Ferramentas de Inteligência Artificial

| Nº | Ferramenta | Função |
|:--:|:-----------|:-------|
| 1 | **Google Gemini (IA Principal)** | Motor de inteligência artificial em nuvem que analisa a foto facial do cliente e gera recomendações personalizadas de armações em linguagem natural. |
| 2 | **Hugging Face (IA Reserva 1)** | Sistema de contingência automática: caso a cota do Google Gemini se esgote temporariamente, a análise é redirecionada automaticamente para servidores da Hugging Face, sem interrupção para o cliente. |
| 3 | **NVIDIA NIM Vision (IA Reserva 2)** | Segundo sistema de contingência: modelo de visão computacional Llama 3.2 hospedado nos servidores da NVIDIA, ativado automaticamente como terceira camada de resiliência. |
| 4 | **MediaPipe FaceLandmarker (IA Offline / Local)** | Tecnologia de leitura facial que funciona diretamente no dispositivo do cliente (celular, tablet ou computador), sem necessidade de internet. Permite que a ótica continue oferecendo o provador virtual mesmo durante quedas de conexão. |

---

### 2.3 — Recursos de Segurança Inclusos

| Nº | Recurso de Segurança | Descrição |
|:--:|:---------------------|:----------|
| 1 | **Certificado SSL / HTTPS** | Toda a comunicação entre o cliente e o site é criptografada, garantindo proteção de dados pessoais e fotos. |
| 2 | **Cabeçalhos HTTP de Proteção** | Proteção contra ataques de Clickjacking (X-Frame-Options), injeção de conteúdo (X-Content-Type-Options), cross-site scripting (X-XSS-Protection) e política de referência segura (Referrer-Policy). |
| 3 | **HSTS (HTTP Strict Transport Security)** | Força navegação exclusivamente segura (HTTPS) em todos os acessos. |
| 4 | **Rate Limiting (Limitador de Requisições)** | Proteção contra ataques automatizados e abuso de cota de inteligência artificial, limitando requisições por IP por minuto. |
| 5 | **Proteção Anti-CORS / Anti-Hotlink** | Impede que sites externos utilizem a API de IA da ótica sem autorização. |
| 6 | **Painel Administrativo com Senha** | O acesso ao gerenciamento do catálogo é protegido por código numérico exclusivo. |
| 7 | **Conformidade com LGPD** | Nenhuma foto de cliente é armazenada em banco de dados. As imagens são utilizadas exclusivamente durante o processamento da análise facial e descartadas imediatamente após. |

---

### 2.4 — Recursos Adicionais

| Nº | Recurso | Descrição |
|:--:|:--------|:----------|
| 1 | **Integração com WhatsApp** | Todos os produtos e resultados do provador incluem botão direto para o WhatsApp da loja com mensagem personalizada e automática, contendo o nome do óculos selecionado. |
| 2 | **Design Responsivo** | O site funciona perfeitamente em celulares, tablets e computadores, adaptando-se automaticamente a qualquer tamanho de tela. |
| 3 | **Otimização para Google (SEO)** | Títulos, descrições e estrutura otimizados para que o site apareça nos resultados do Google quando clientes pesquisarem por óticas na região. |
| 4 | **Backup e Restauração com 1 Clique** | O proprietário pode exportar uma cópia de segurança completa do catálogo em arquivo e restaurá-la a qualquer momento. |
| 5 | **Manual de Uso Simplificado** | Cartilha passo a passo em linguagem acessível, sem termos técnicos, para que qualquer membro da equipe — mesmo sem experiência com tecnologia — consiga operar todas as funções do site. |

---

## CLÁUSULA 3ª — DO VALOR E FORMA DE PAGAMENTO

O valor total pela prestação dos serviços descritos neste contrato é de:

### **R$ 700,00 (setecentos reais)**

O pagamento será realizado em **duas parcelas**, conforme detalhamento abaixo:

| Parcela | Valor | Vencimento | Condição |
|:-------:|:-----:|:-----------|:---------|
| **1ª Parcela (Sinal)** | **R$ 350,00** | Na data de assinatura deste contrato | Corresponde a 50% do valor total. O início dos trabalhos de desenvolvimento fica condicionado ao recebimento deste sinal. |
| **2ª Parcela (Restante)** | **R$ 350,00** | Até **30 (trinta) dias corridos** após a data de assinatura | Corresponde aos 50% restantes. O não pagamento desta parcela no prazo estipulado sujeitará o CONTRATANTE às penalidades previstas na Cláusula 7ª. |

**Formas de pagamento aceitas:** Pix, transferência bancária ou dinheiro em espécie.

---

## CLÁUSULA 4ª — DO PRAZO DE ENTREGA

O CONTRATADO se compromete a entregar o site completo e operacional em até **15 (quinze) dias úteis** contados a partir da data de recebimento da 1ª parcela (sinal), salvo atrasos causados por demora na entrega de materiais pelo CONTRATANTE (fotos, textos, logomarca, informações da loja).

---

## CLÁUSULA 5ª — DA MANUTENÇÃO E SUPORTE TÉCNICO

### 5.1 — Período de Manutenção

A partir da data de entrega e aprovação do site, o CONTRATADO prestará serviço de **manutenção e suporte técnico integral pelo período de 12 (doze) meses consecutivos**, sem custo adicional.

### 5.2 — O que está incluso na manutenção:

- Correção de bugs, falhas técnicas e erros de funcionamento;
- Atualizações de segurança e compatibilidade do sistema;
- Suporte para dúvidas de uso do painel administrativo;
- Orientação para adição, edição e remoção de produtos no catálogo;
- Monitoramento do funcionamento das APIs de inteligência artificial;
- Pequenos ajustes visuais e textuais solicitados pelo CONTRATANTE (até 3 alterações por mês);
- Auxílio em caso de problemas com a hospedagem na Vercel.

### 5.3 — Canais de suporte:

O suporte será prestado exclusivamente pelo WhatsApp **(35) 98844-2138**, de segunda a sexta-feira, das 9h às 18h, com prazo de resposta de até 24 horas úteis.

### 5.4 — Exclusões:

Não estão inclusos na manutenção:
- Desenvolvimento de novas páginas ou funcionalidades não previstas neste contrato;
- Redesign completo do layout;
- Migração para outra plataforma de hospedagem;
- Serviços de marketing digital, gestão de redes sociais ou criação de conteúdo;
- Problemas causados por alterações realizadas por terceiros no código-fonte sem autorização do CONTRATADO.

Qualquer serviço adicional será orçado separadamente e somente executado mediante aprovação formal do CONTRATANTE.

---

## CLÁUSULA 6ª — DA PROPRIEDADE INTELECTUAL E HOSPEDAGEM

### 6.1
O código-fonte do site será disponibilizado ao CONTRATANTE em repositório privado no GitHub. Após o pagamento integral (ambas as parcelas), o CONTRATANTE terá **direito de uso irrestrito e permanente** do site entregue.

### 6.2
A hospedagem do site será realizada na plataforma **Vercel** (plano gratuito ou conforme necessidade), com domínio fornecido pela plataforma ou domínio personalizado de escolha do CONTRATANTE. Custos de registro de domínio personalizado (.com.br), caso solicitado, correrão por conta do CONTRATANTE.

### 6.3
O CONTRATADO não será responsável por interrupções, limitações ou alterações de políticas impostas por plataformas de terceiros (Vercel, Google, Hugging Face, NVIDIA, WhatsApp).

---

## CLÁUSULA 7ª — DO INADIMPLEMENTO E PENALIDADES

### 7.1
O atraso no pagamento da 2ª parcela acarretará multa de **2% (dois por cento)** sobre o valor da parcela, acrescida de juros de mora de **1% (um por cento) ao mês**, calculados *pro rata die*.

### 7.2
Caso a 2ª parcela não seja quitada em até **60 (sessenta) dias corridos** da data de vencimento, o CONTRATADO se reserva o direito de:
- Suspender os serviços de manutenção e suporte técnico;
- Remover o site da hospedagem até a regularização do pagamento.

### 7.3
A reincidência ou inadimplemento definitivo autoriza o CONTRATADO a considerar o contrato rescindido de pleno direito, sem devolução do sinal já pago (1ª parcela), que será retido a título de ressarcimento pelos trabalhos já executados.

---

## CLÁUSULA 8ª — DA RESCISÃO

### 8.1 — Pelo CONTRATANTE:
O CONTRATANTE poderá rescindir o presente contrato a qualquer momento, mediante comunicação por escrito (WhatsApp ou e-mail) com antecedência mínima de 15 (quinze) dias. Em caso de rescisão antes da entrega final do site, o sinal (1ª parcela) não será devolvido.

### 8.2 — Pelo CONTRATADO:
O CONTRATADO poderá rescindir o contrato em caso de inadimplemento financeiro do CONTRATANTE (conforme Cláusula 7ª), comportamento abusivo ou uso do serviço para fins ilícitos.

---

## CLÁUSULA 9ª — DA CONFIDENCIALIDADE

As partes se comprometem a manter sigilo sobre informações comerciais, técnicas e operacionais trocadas durante a vigência deste contrato, incluindo senhas de acesso, chaves de API e dados de clientes da ótica.

---

## CLÁUSULA 10ª — DO FORO

Fica eleito o foro da Comarca de **________________________/____** para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.

---

## CLÁUSULA 11ª — DAS DISPOSIÇÕES GERAIS

### 11.1
Este contrato é firmado em caráter irrevogável e irretratável, obrigando as partes e seus sucessores.

### 11.2
Eventuais alterações neste contrato somente terão validade se realizadas por escrito e assinadas por ambas as partes.

### 11.3
A tolerância de qualquer das partes quanto ao descumprimento de qualquer cláusula não implicará renúncia ao direito de exigir o seu cumprimento.

---

## ASSINATURAS

E, por estarem justos e contratados, assinam o presente instrumento em **02 (duas) vias** de igual teor e forma, na presença das testemunhas abaixo.

&nbsp;

**Local e Data:** __________________________, ____/____/________

&nbsp;

---

&nbsp;

**CONTRATADO (Prestador de Serviço):**

&nbsp;

_________________________________________________________

Nome: ___________________________________________________

CPF: ____________________________________________________

&nbsp;

---

&nbsp;

**CONTRATANTE (Cliente):**

&nbsp;

_________________________________________________________

Nome: ___________________________________________________

CPF/CNPJ: _______________________________________________

&nbsp;

---

&nbsp;

### TESTEMUNHAS:

&nbsp;

**1ª Testemunha:**

Nome: ___________________________________________________

CPF: ____________________________________________________

Assinatura: ______________________________________________

&nbsp;

**2ª Testemunha:**

Nome: ___________________________________________________

CPF: ____________________________________________________

Assinatura: ______________________________________________

---

*Documento gerado para fins de formalização da prestação de serviço de desenvolvimento de plataforma digital para o setor óptico.*

*Em caso de dúvidas, entre em contato pelo WhatsApp: **(35) 98844-2138**.*
