# Portfólio — Marcus Araújo

Atualização visual local: capa editorial com retrato central, identidade branca e amarela, serifada Bodoni Moda, interface DM Sans e novas capas de projetos. O conteúdo e as imagens internas dos quatro cases foram preservados.

## Rodar

Com Node.js instalado:

```sh
npm run dev -- --host 127.0.0.1 --port 4173
```

Abra http://localhost:4173/. Nenhuma instalação de pacotes é necessária.

## Editar e gerar

- `portfolio-components.jsx`: home e componentes compartilhados.
- `portfolio-case.jsx`: páginas internas dos cases.
- `portfolio-data.js`: textos e dados existentes.
- `portfolio-editorial.css`: primeira dobra aprovada e adaptação mobile.
- `portfolio-refresh.css`: identidade visual e ajustes responsivos.
- `portfolio-styles.css`: estilos originais.

Depois de editar JSX, execute `npm run build` e recarregue a página. O servidor também compila ao iniciar. `portfolio.bundle.js` é o JavaScript gerado, servido diretamente sem compilação no navegador. React, fontes e compilador estão locais.

O retrato exibido é `images/marcus-photo-bg.png`, arquivo original do projeto. A foto recebe apenas filtro CSS em preto e branco e máscara suave na base. Não utiliza retrato gerado por IA.

Os arquivos `*-cover-refined.png` e `lp-cover-yellow.png` são novas capas ilustrativas. Os arquivos originais continuam nas páginas de detalhe dos projetos.

Os ícones geométricos SVG de círculo e asterisco vêm de Phosphor Icons 2.1.1 (MIT), com a cor ajustada para amarelo. React e Babel mantêm seus avisos de licença nos respectivos arquivos em `vendor/`. Bodoni Moda e DM Sans são distribuídas pelo Google Fonts.

A pasta `qa/` reúne evidências locais de revisão e não precisa ser enviada para a hospedagem.
