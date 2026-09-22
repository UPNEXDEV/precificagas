# Precifica — landing page

Landing page de vendas da planilha de precificação para gastronomia.
Feita com Vite + React + TypeScript + Tailwind CSS.

## Rodar no seu computador

```bash
npm install
npm run dev
```

## Gerar os arquivos do site

```bash
npm run build
```

O resultado fica na pasta `dist/`. **São esses arquivos que precisam ser publicados** —
subir só o código-fonte para uma hospedagem estática não funciona, porque o `index.html`
da raiz aponta para `/src/main.tsx`, que só existe durante o desenvolvimento.

## Publicar no GitHub Pages

1. Suba o projeto para o repositório (branch `main`).
2. No GitHub, vá em **Settings > Pages** e, em **Source**, escolha **GitHub Actions**.
3. Pronto: a cada push na `main`, o workflow em `.github/workflows/deploy.yml`
   roda o build e publica a pasta `dist/`.

O `base: "./"` no `vite.config.ts` faz os arquivos serem buscados por caminho relativo,
para o site funcionar também quando fica em subpasta (`usuario.github.io/repositorio/`).

## Publicar na Vercel

Importe o repositório na Vercel. O framework é detectado como Vite;
o build é `npm run build` e a pasta de saída é `dist`.
