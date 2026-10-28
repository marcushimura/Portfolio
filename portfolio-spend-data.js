// Case copy supplied by Marcus; visual references and examples preserved.
window.PORTFOLIO_DATA.cases.unshift({
  "id": "spend-management",
  "title": "Spend Management",
  "detailTitle": "Spend Management",
  "category": "B2B SaaS · Web · IA",
  "year": "2026",
  "tagline": "Transformando uma demanda por controle de custos em uma experiência de gestão do consumo de IA.",
  "cover": "images/spend-cover-laptop-yellow.png",
  "metrics": [
    {
      "value": "5",
      "label": "Primeiros clientes conquistados com apoio do protótipo"
    },
    {
      "value": "2",
      "label": "Frentes: Model Pricing e Budgets"
    },
    {
      "value": "Disponível",
      "label": "Funcionalidade implementada"
    }
  ],
  "story": {
    "meta": [
      {
        "label": "Duração",
        "value": "N/D"
      },
      {
        "label": "Papel",
        "value": "Product Designer"
      },
      {
        "label": "Time",
        "value": "PM · Arquiteto · Designer · Devs"
      },
      {
        "label": "Plataforma",
        "value": "Web"
      }
    ],
    "heroMetrics": [
      {
        "value": "5",
        "label": "Primeiros clientes conquistados com apoio do protótipo"
      },
      {
        "value": "2",
        "label": "Frentes: Model Pricing e Budgets"
      },
      {
        "value": "Disponível",
        "label": "Funcionalidade implementada"
      }
    ],
    "emphasis": [
      "controle de custos",
      "cinco primeiros clientes",
      "definir o escopo",
      "requisitos ainda estavam em aberto",
      "experiência de uso permanecia por validar",
      "centro de custo"
    ],
    "prototype": {
      "src": "prototypes/spend-management.html",
      "afterSection": "05.5 · Protótipo"
    },
    "sections": [
      {
        "label": "01 · Visão Geral",
        "title": "Governança financeira para o consumo de IA",
        "paragraphs": [
          "O AI Gateway surgiu como uma oportunidade de ampliar a atuação da Sensedia na governança de inteligência artificial. Após a apresentação do primeiro MVP aos clientes, o controle de custos apareceu como uma demanda recorrente.",
          "Desenhei a experiência do Spend Management, utilizando benchmarks e protótipos para explorar possibilidades e definir o escopo com o time. Antes da implementação, o protótipo apoiou as conversas comerciais e a conquista dos cinco primeiros clientes do AI Gateway."
        ],
        "tags": [
          "Product Design",
          "Benchmark",
          "Ideação",
          "Prototipação",
          "UI Design",
          "Governança de IA"
        ]
      },
      {
        "label": "02 · Oportunidade",
        "title": "Centralizar o acesso era apenas parte do desafio",
        "paragraphs": [
          "Com o crescimento da adoção de IA e a movimentação do mercado, a Sensedia desenvolveu um MVP para apresentar em um de seus principais eventos voltados aos clientes.",
          "A primeira versão contemplava recursos de conectividade e governança, como MCP Servers, LLM Providers, Routes e Policies. Durante as demonstrações, os participantes destacaram uma capacidade que ainda faltava: controlar os custos de utilização.",
          "Essa demanda abriu espaço para o Spend Management, voltado à configuração de preços e ao controle do consumo por centro de custo."
        ],
        "question": "Como podemos permitir que as empresas organizem e controlem o consumo de IA por centro de custo?"
      },
      {
        "label": "03 · Planejamento",
        "title": "Definindo a solução por meio do design",
        "paragraphs": [
          "Os requisitos ainda estavam em aberto quando comecei a desenhar a funcionalidade. Explorei uma visão abrangente da experiência e utilizei o protótipo para discutir possibilidades com o time, delimitando a primeira versão conforme prazo e complexidade de desenvolvimento."
        ],
        "steps": [
          {
            "title": "Feedbacks do evento",
            "text": "Coleta de percepções por formulário após as demonstrações do MVP."
          },
          {
            "title": "Benchmark",
            "text": "Análise de referências de mercado para explorar precificação e controle de consumo de IA."
          },
          {
            "title": "Ideação",
            "text": "Desenho de uma proposta abrangente para tornar as possibilidades concretas."
          },
          {
            "title": "Definição de escopo",
            "text": "Discussões com o time sobre o que poderia entrar na primeira entrega."
          },
          {
            "title": "Design e prototipação",
            "text": "Construção dos fluxos e interfaces de Model Pricing e Budgets."
          }
        ]
      },
      {
        "label": "04 · Pesquisa",
        "title": "O que ouvimos nas demonstrações",
        "paragraphs": [
          "Acompanhei as demos do AI Gateway no evento e, ao final das apresentações, solicitava feedback por meio de um formulário no celular.",
          "Os participantes apontavam o controle de custos como essencial e mencionavam que outras soluções do mercado já estavam avançando nessa direção."
        ],
        "cards": [
          {
            "label": "Sinal 01",
            "title": "Controle de custos como demanda recorrente",
            "text": "Os comentários indicaram a relevância de complementar a governança técnica com recursos de gestão financeira."
          },
          {
            "label": "Sinal 02",
            "title": "Referências de mercado como ponto de partida",
            "text": "O benchmark ajudou a explorar possibilidades para a solução enquanto os requisitos eram definidos."
          },
          {
            "label": "Questão em aberto",
            "title": "Quem configuraria e acompanharia os gastos?",
            "text": "Desenvolvedores, arquitetos e lideranças de negócio eram hipóteses de usuários. Os perfis e suas responsabilidades ainda precisavam ser conhecidos no uso real."
          }
        ],
        "note": "Os participantes assistiram às demos, sem operar o produto. Os feedbacks indicaram interesse e necessidades declaradas; não constituíram um teste de usabilidade."
      },
      {
        "label": "05 · Ideação",
        "title": "De uma visão abrangente à primeira entrega",
        "paragraphs": [
          "Desenhei uma visão da experiência para explorar como preços, consumo e limites poderiam se conectar dentro do AI Gateway.",
          "A partir dessa proposta, discutimos o que seria viável implementar. O escopo foi construído durante a ideação, equilibrando as possibilidades desenhadas com o tempo disponível e a complexidade técnica."
        ],
        "cards": [
          {
            "label": "Frente A",
            "title": "Model Pricing",
            "text": "Configuração dos valores de referência dos modelos associados aos provedores, utilizados para calcular o custo estimado do consumo de tokens."
          },
          {
            "label": "Frente B",
            "title": "Budgets",
            "text": "Controle por centro de custo, com limites financeiros ou de tokens associados a provedores, modelos e agentes."
          }
        ]
      },
      {
        "label": "05.5 · Protótipo",
        "title": "Um protótipo para definir e comunicar a solução",
        "paragraphs": [
          "O protótipo ajudou a discutir comportamentos e delimitar o escopo com o time. Também foi utilizado nas conversas comerciais para apresentar a funcionalidade enquanto ela estava em desenvolvimento."
        ],
        "image": {
          "src": "images/spend-overview.png",
          "alt": "Visão principal de Budgets no Spend Management",
          "caption": "Visão geral do protótipo: budgets e acompanhamento do consumo por centro de custo."
        }
      },
      {
        "label": "06 · UI",
        "title": "A experiência de Spend Management",
        "paragraphs": [
          "A interface foi organizada em duas áreas complementares: Model Pricing, para estabelecer os valores usados no cálculo de custos, e Budgets, para configurar o controle do consumo por centro de custo."
        ],
        "gallery": [
          {
            "kind": "interface",
            "image": {
              "src": "prototypes/spend-management.html?page=pricing&preview=1&theme=light",
              "href": "prototypes/spend-management.html?page=pricing&theme=light",
              "width": 1280,
              "height": 800,
              "alt": "Listagem de Model Pricing: provedores, modelos e seus preços de referência",
              "caption": "Model Pricing — preços de referência por provedor e modelo"
            }
          },
          {
            "kind": "image",
            "image": {
              "src": "images/spend-model-pricing.png",
              "alt": "Configuração de preços de um modelo no Model Pricing",
              "caption": "Protótipo — configuração dos valores de referência de um modelo.",
              "compact": true
            }
          },
          {
            "kind": "image",
            "image": {
              "src": "images/spend-overview.png",
              "alt": "Visão principal de Budgets no Spend Management",
              "caption": "Budgets — configuração do controle por centro de custo"
            }
          },
          {
            "kind": "image",
            "image": {
              "src": "images/spend-budget-detail.png",
              "alt": "Detalhe de um budget associado a um centro de custo",
              "caption": "Detalhe — consulta das configurações de um budget"
            }
          }
        ]
      },
      {
        "label": "07 · Resultado e Validação",
        "title": "O protótipo apoiou a conquista dos primeiros clientes",
        "paragraphs": [
          "Ao demonstrar uma capacidade muito solicitada, o protótipo facilitou as conversas comerciais e apoiou a conquista dos cinco primeiros clientes do AI Gateway, antes da conclusão do desenvolvimento do Spend Management.",
          "A funcionalidade já está disponível. Na conclusão desta etapa, os clientes ainda não haviam passado pelo onboarding, e a experiência de uso permanecia por validar.",
          "O próximo passo é acompanhar como esses clientes configuram e utilizam os controles, identificar os perfis envolvidos e avaliar a adequação da solução às suas necessidades."
        ]
      }
    ]
  }
});
