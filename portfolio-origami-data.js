// Case copy supplied by Marcus; examples recreated from the supplied Origami skill.
window.PORTFOLIO_DATA.cases.splice(1, 0, {
  "id": "origami",
  "title": "Origami",
  "detailTitle": "Origami",
  "category": "Design System · IA · Ferramenta interna",
  "year": "2026",
  "tagline": "Conectando o Design System à criação de protótipos com IA, com mais fidelidade visual e melhor handoff para desenvolvimento.",
  "cover": "images/origami-cover-laptop-yellow.png",
  "metrics": [
    {
      "value": "1 mês",
      "label": "De desenvolvimento"
    },
    {
      "value": "HTML",
      "label": "Protótipos com fidelidade visual e de comportamento"
    },
    {
      "value": "Handoff",
      "label": "Melhoria relatada pelo desenvolvimento"
    }
  ],
  "story": {
    "meta": [
      {
        "label": "Duração",
        "value": "1 mês · desenvolvido nas minhas horas vagas"
      },
      {
        "label": "Papel",
        "value": "Product Designer"
      },
      {
        "label": "Time",
        "value": "Designer · Desenvolvedor front-end"
      },
      {
        "label": "Plataformas",
        "value": "Web · Ferramentas de IA com suporte a skills"
      }
    ],
    "heroMetrics": [
      {
        "value": "1 mês",
        "label": "De desenvolvimento"
      },
      {
        "value": "HTML",
        "label": "Protótipos com fidelidade visual e de comportamento"
      },
      {
        "value": "Handoff",
        "label": "Melhoria relatada pelo desenvolvimento"
      }
    ],
    "emphasis": [
      "biblioteca React",
      "identificadores de componentes",
      "fidelidade visual e de comportamento",
      "feedbacks qualitativos",
      "fonte da verdade",
      "revisão e aprovação",
      "recurso reutilizável"
    ],
    "sections": [
      {
        "label": "01 · Visão Geral",
        "title": "Da biblioteca de componentes aos protótipos com IA",
        "paragraphs": [
          "Criei o Origami para permitir que diferentes profissionais da Sensedia gerassem interfaces com IA seguindo os padrões do nosso Design System.",
          "A partir da inspeção da biblioteca React, organizei referências, identificadores de componentes, regras e templates em arquivos Markdown, disponibilizados como uma skill. O resultado foram protótipos HTML com fidelidade visual e de comportamento, além de uma melhor correspondência com os componentes reais no handoff para desenvolvimento."
        ],
        "tags": [
          "Design System",
          "UI Design",
          "Prototipação",
          "Inteligência Artificial",
          "Handoff"
        ]
      },
      {
        "label": "02 · Oportunidade",
        "title": "Mais pessoas criando, interfaces cada vez mais diferentes",
        "paragraphs": [
          "Antes do Origami, criávamos interfaces no Figma e depois seguíamos para o desenvolvimento. Os componentes desenhados nem sempre correspondiam aos disponíveis na biblioteca React, gerando diferenças entre design e implementação.",
          "Com a adoção de IA, diferentes pessoas passaram a criar telas. Utilizávamos um arquivo design.md e pedíamos à IA que consultasse os componentes no Figma, mas os resultados frequentemente se afastavam do guideline.",
          "Os sucessivos refinamentos nem sempre resolviam: em algumas tentativas, quanto mais ajustávamos, mais a interface se distanciava dos padrões definidos.",
          "O problema continuava no handoff. A IA utilizada pelos desenvolvedores tinha dificuldade para associar os elementos dos protótipos aos componentes da biblioteca, exigindo novas explicações e ajustes."
        ],
        "question": "Como podemos permitir que diferentes profissionais criem interfaces com IA seguindo os padrões da empresa e facilitando sua implementação?"
      },
      {
        "label": "03 · Planejamento",
        "title": "Como estruturei a iniciativa",
        "paragraphs": [
          "Desenvolvi o projeto durante um mês, nas minhas horas vagas. Parti dos testes que já vinha realizando e da percepção de que o design.md não oferecia o contexto necessário para gerar interfaces consistentes.",
          "Propus distribuir as orientações em arquivos específicos. Um desenvolvedor front-end me apoiou na escrita dos Markdown, e eu conduzi os testes e refinamentos para melhorar a precisão e tornar o conteúdo mais objetivo."
        ],
        "steps": [
          {
            "title": "Diagnóstico",
            "text": "Identificação dos desvios nas interfaces geradas com o design.md."
          },
          {
            "title": "Inspeção da biblioteca",
            "text": "Uso de IA para examinar os componentes React e incorporar suas referências aos arquivos."
          },
          {
            "title": "Estruturação",
            "text": "Separação do contexto em componentes, tokens, regras e templates de telas."
          },
          {
            "title": "Experimentação",
            "text": "Testes com diferentes formas de fornecer contexto, incluindo uma abordagem com agente."
          },
          {
            "title": "Refinamento",
            "text": "Avaliação das telas geradas e ajustes nos arquivos até chegar à organização como skill."
          }
        ]
      },
      {
        "label": "04 · Pesquisa",
        "title": "O que os testes de geração mostraram",
        "paragraphs": [
          "A investigação aconteceu por meio de testes práticos de geração de interfaces. Avaliei a aderência dos resultados aos padrões existentes e refinei as instruções a partir dos desvios encontrados."
        ],
        "cards": [
          {
            "label": "Insight 01",
            "title": "O arquivo único não era suficiente",
            "text": "O design.md, no formato utilizado, deixava espaço para interpretações que se afastavam do guideline. Precisávamos de referências mais específicas para orientar os componentes e a composição das telas."
          },
          {
            "label": "Insight 02",
            "title": "A referência precisava estar na biblioteca real",
            "text": "As diferenças entre Figma e React dificultavam a consistência. O UI Kit utilizado no desenvolvimento precisava orientar também a geração dos protótipos."
          },
          {
            "label": "Insight 03",
            "title": "O handoff precisava de uma correspondência explícita",
            "text": "A aparência do protótipo não bastava para a IA reconhecer os componentes na implementação. Era necessário tornar mais clara a relação entre os elementos gerados e os componentes disponíveis na biblioteca."
          }
        ]
      },
      {
        "label": "05 · Ideação",
        "title": "Encontrando a melhor forma de fornecer contexto",
        "paragraphs": [
          "A ambição era permitir a criação de uma tela em uma única solicitação, um one shot. Para isso, experimentamos diferentes formas de organizar e disponibilizar as orientações."
        ],
        "cards": [
          {
            "label": "Abordagem A",
            "title": "Arquivo design.md",
            "text": "Era o ponto de partida e aparecia nas referências que consultávamos. Nos nossos testes, exigia sucessivos refinamentos e não mantinha a aderência esperada."
          },
          {
            "label": "Abordagem B",
            "title": "Agente",
            "text": "Experimentamos uma abordagem com agente, mas ela não funcionou como esperávamos para essa necessidade."
          },
          {
            "label": "Abordagem C",
            "title": "Skill com arquivos e templates",
            "text": "Organizamos o contexto em arquivos Markdown com referências de componentes, tokens, regras e templates. Essa foi a abordagem que apresentou os melhores resultados nos nossos testes.",
            "selected": true
          }
        ],
        "note": "O avanço veio da combinação entre referências da biblioteca real, contexto específico e instruções mais objetivas."
      },
      {
        "label": "05.5 · Estrutura da solução",
        "title": "Da inspeção dos componentes aos arquivos Markdown",
        "paragraphs": [
          "Pedi à IA que inspecionasse todos os componentes da biblioteca React para incorporar suas referências ao Origami, incluindo características visuais, comportamentos e identificadores.",
          "Propus a separação dos arquivos e contei com apoio do front-end na escrita inicial. A partir dessa base, continuei refinando as instruções, acrescentando informações necessárias e enxugando trechos excessivamente verbosos.",
          "O UI Kit em React passou a ser a fonte da verdade para orientar esse fluxo de criação."
        ],
        "fileStructure": {
          "files": [
            "SKILL.md",
            "DESIGN.md",
            "CHECKLIST.md",
            "components-design/button.md",
            "components-design/text-field.md",
            "templates/page-shell.md",
            "tests/examples/page-discovery.html"
          ],
          "template": "# Page Shell\n\nThe application frame every product screen sits inside: a global top bar, a\nnavigation rail, and the page header that opens the content area.\n\nUnlike the files in `components-design/`, this document describes a\n**composition**, not a single exported component. Use it when you need a screen\nto look like the product, not just like the library.\n\n## Source\n\n| Part | Path |\n| --- | --- |\n| Top bar | `@sensedia-ui/components` → `TopbarApim` |\n| Navigation rail | `@sensedia-ui/components` → `Tree` |\n| Resolved styles | read from the published bundle, `packages/components/dist/index.mjs` |\n| Page header spacing | annotated spacing references at 1280px and 1920px |\n| Working examples | `tests/examples/page-shell.html` (the empty frame) and `tests/examples/page-discovery.html` (the frame filled with a real screen) |\n\nValues below were read from the shipped bundle's style objects. Theme keys were\nresolved through the scale in `DESIGN.md`: `2` = 4px, `3` = 8px, `5` = 16px,\n`6` = 20px; `fontSizes.1` = 12px; `fontWeights.2` = 400, `3` = 500, `4` = 600.\n\n## Anatomy\n\n| Part | Element | Recreation selector | Notes |\n| --- | --- | --- | --- |\n| Top bar root | `header` | `.sds-topbar` | Full width, fixed height |\n| Context group | `div` | `.sds-topbar__context` | Product and environment, grows |\n| Logo slot | `span` | `.sds-topbar__logo` | 20 × 20, `primaryBase`, holds `SensediaIcon` |\n| Product button | `Button` | `.sds-topbar__pr"
        },
        "codeSample": {
          "label": "components-design/button.md · trecho",
          "text": "# Button\n\nButton is an action trigger component for forms, dialogs, tables, toolbars, and composition slots. It is built on accessible button semantics and has visual variants, size variants, loading state, disabled state, focus-visible treatment, icon-only sizing, and optional grouping.\n\nThis document is optimized for high-fidelity recreation in plain HTML, CSS, and minimal JavaScript.\n\n## Source\n\n| Part | Path |\n| --- | --- |\n| Component and styles | `../../sensedia-ui/packages/components/src/button/` |\n| Stories | `../../sensedia-ui/apps/storybook/src/components/button/stories/` |\n\n## Anatomy\n\n| Part | Source element | Recreation selector | Notes |\n| --- | --- | --- | --- |\n| Root button | React Aria `Button` | `.sds-button` | Inline-flex action element |\n| Variant modifier | `$variant` parser | `.sds-button--contained`, `--outlined`, `--text`, `--ghost`, `--destructive`, `--unstyled` | Public variants from the Button prop type |\n| Size modifier | `$size` parser | `.sds-button--xs`, `--sm`, `--md`, `--lg` | Default is `md` |\n| Icon-only modifier | `$isIconButton` parser | `.sds-button--icon` | Apply when button has only an icon |\n| Loading indicator | `Loader` child | `.sds-button__loader` | Absolutely positioned spinner; inverted for contained buttons |\n| Button group | `ButtonGroup` | `.sds-button-group` | Horizontal by default, vertical with a modifier |\n\n## Props and defaults\n\n### Verified Defaults\n\nWhen `Button` is used without visual props, the real component resolves these defaults:\n\nIn implementation terms: `variant = \"contained\"` and `size = \"md\"`.\n\n| Prop | Default value | Recreation detail |\n| --- | --- | --- |\n| `variant` | `\"contained\"` | Use `.sds-button--contained`. This is the real source behavior; older prose that says `solid` is stale. |\n| `size` | "
        },
        "blocks": [
          {
            "title": "Disponível como skill e em um site para download",
            "paragraphs": [
              "O Origami foi disponibilizado como skill para LLMs. Também criamos um site para facilitar o acesso e o download dos arquivos, oferecendo um ponto de entrada para quem desejasse utilizar o recurso."
            ],
            "image": {
              "src": "images/origami-site.png",
              "alt": "Página do site do Origami com apresentação e opções de download da skill",
              "caption": "Site do Origami, criado para facilitar o acesso e o download da skill."
            },
            "link": {
              "href": "https://origami.sensedia-eng.com/",
              "label": "Acessar o site do Origami"
            }
          }
        ]
      },
      {
        "label": "06 · UI",
        "title": "Protótipos mais fiéis ao UI Kit",
        "paragraphs": [
          "Com o design.md, as interfaces geradas frequentemente se afastavam dos padrões da empresa. Eram necessários sucessivos ajustes, que nem sempre corrigiam os desvios e, em algumas tentativas, criavam novas inconsistências.",
          "Com o Origami, a IA passou a receber contexto organizado em arquivos, templates e referências dos componentes reais. Isso permitiu criar protótipos HTML que reproduziam a aparência e os comportamentos do UI Kit.",
          "Os identificadores dos componentes também tornaram mais clara a correspondência entre o protótipo e a biblioteca React, apoiando sua interpretação no desenvolvimento."
        ],
        "gallery": [
          {
            "kind": "interface",
            "image": {
              "src": "prototypes/origami-discovery.html?preview=1",
              "href": "prototypes/origami-discovery.html",
              "width": 1280,
              "height": 800,
              "alt": "Exemplo Discovery incluído no pacote Origami",
              "caption": "Depois — geração com contexto estruturado e referências do UI Kit"
            }
          }
        ],
        "componentsDemo": true
      },
      {
        "label": "07 · Validação e Resultados",
        "title": "O que mudou para quem cria e para quem desenvolve",
        "paragraphs": [
          "Além dos testes de geração, recebemos feedbacks de profissionais que passaram a utilizar o Origami. Os relatos trouxeram evidências qualitativas sobre a fidelidade dos protótipos, o handoff e a autonomia para criar interfaces."
        ],
        "blocks": [
          {
            "title": "Uma nova forma de contribuir com componentes",
            "paragraphs": [
              "O Origami também passou a apoiar a criação de novos componentes a partir dos existentes.",
              "Utilizamos os padrões disponíveis como base, construímos a proposta e a submetemos em uma branch no repositório do UI Kit. Os desenvolvedores front-end revisam e aprovam a contribuição antes da publicação.",
              "A iniciativa passou, assim, a apoiar tanto a criação de interfaces quanto a evolução da biblioteca, mantendo a revisão técnica no processo."
            ]
          }
        ],
        "testimonials": [
          {
            "quote": "Com o Origami, os protótipos ficaram mais fiéis. A IA consegue identificar os componentes pelos mesmos IDs do nosso UI Kit, facilitando a interpretação no desenvolvimento.",
            "author": "Desenvolvedor full stack",
            "note": "Relato adaptado do feedback recebido."
          },
          {
            "quote": "Com o Origami, consegui criar interfaces e produtos internos com a mesma qualidade e aparência dos nossos produtos.",
            "author": "Diretor de Produto",
            "note": "Relato adaptado do feedback recebido."
          }
        ]
      },
      {
        "label": "08 · Aprendizado",
        "title": "O principal aprendizado",
        "paragraphs": [
          "Começamos com uma abordagem recorrente nas nossas referências e benchmarks: concentrar as orientações em um design.md. Insistimos nesse caminho por algum tempo, mas os testes mostraram que ele não atendia ao nosso contexto.",
          "O avanço veio quando questionei essa estrutura, propus a separação dos arquivos e aproximei as instruções dos componentes reais da biblioteca.",
          "Aprendi que tornar um Design System utilizável por IA exige observar como suas regras são interpretadas, organizar o contexto e testar os resultados continuamente.",
          "Minha contribuição foi conduzir essa experimentação e transformar os aprendizados em um recurso reutilizável, conectando a criação de interfaces, a evolução dos componentes e o handoff para desenvolvimento."
        ]
      }
    ]
  }
});
