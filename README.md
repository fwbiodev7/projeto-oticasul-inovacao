# Ótica Fábio — protótipo e-commerce

Protótipo navegável em Next.js App Router, TypeScript e Tailwind CSS v3. Inclui catálogo filtrável, páginas institucionais e experiência de visagismo com upload ou câmera.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O catálogo e o modo **Testar sem usar cota** funcionam sem chave de API. Na primeira execução, o projeto baixa o [modelo Face Landmarker do MediaPipe](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/index) e copia o runtime WebAssembly do pacote instalado para `public/mediapipe/`. Esses arquivos gerados não entram no Git.

## Integrações opcionais

Copie `.env.local.example` para `.env.local` e preencha as chaves necessárias. O sistema possui uma cascata de 4 camadas de resiliência:
- **Plano A (Principal):** `GEMINI_API_KEY` com modelo `gemini-3.6-flash`.
- **Plano B (Fallback 1):** `HUGGINGFACE_API_KEY` via Hugging Face Router.
- **Plano C (Fallback 2):** `NVIDIA_API_KEY` via NVIDIA NIM Vision (`meta/llama-3.2-11b-vision-instruct`).
- **Plano D (Local):** Análise local via MediaPipe FaceLandmarker no próprio navegador (100% offline e sem consumo de tokens).

As variáveis `NEXT_PUBLIC_FIREBASE_*` inicializam App, Firestore, Storage e Auth. O catálogo atual permanece em `src/lib/mock-data.ts`; a conexão não muda a fonte de produtos automaticamente. O app não salva fotos nem leads.

`NEXT_PUBLIC_WHATSAPP_NUMBER` define o destino dos botões de atendimento em formato internacional, sem `+`. O padrão é `5535998892492`, baseado no WhatsApp da loja (R. Alves e Silva, 61 - Centro).

## Conteúdo de demonstração

Produtos, preços e fotos de campanha são ilustrativos. As imagens foram geradas por IA para este protótipo. O Gemini avalia primeiro o contorno facial aparente, incluindo uma estimativa visual da proporção entre altura e largura. A categoria "Alongado" exige proporção estimada de pelo menos 1,55. Em seguida, uma segunda chamada escolhe três armações distintas pelos IDs do catálogo.

No modo local, o MediaPipe detecta pontos faciais no navegador. Medidas de altura, largura, testa e mandíbula orientam uma classificação aproximada e a escolha de três armações do catálogo. Fotos com vários rostos, sem rosto ou muito inclinadas pedem nova captura. Esse modo não envia a foto a uma API e não usa cota, mas depende de o navegador carregar os arquivos do modelo. A resposta é uma sugestão de estilo, sujeita à confirmação presencial. O protótipo não salva a foto. Antes de colocar no ar, substitua o catálogo, valide preços e estoque, confirme horário e WhatsApp, e revise o texto com a Ótica Fábio.

As cinco fotos em `scripts/fixtures/` são retratos fictícios gerados para testar formatos diferentes; não são fotos de clientes.

O endereço, telefone e a história de três gerações foram conferidos em [cobertura da reinauguração de 2025](https://jornalinformasion.blogspot.com/2025/07/sul-otica-reinaugura-sua-loja-para.html).

## Comandos

```bash
npm run build
npm run typecheck
npm run test:visagismo # com npm run dev em outro terminal
npm run demo # com npm run dev em outro terminal; salva vídeo e capturas em artifacts/
```

`npm run demo` e `npm run test:visagismo` usam a análise local real e não precisam de `GEMINI_API_KEY`.
