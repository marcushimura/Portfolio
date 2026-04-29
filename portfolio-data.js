window.PORTFOLIO_DATA = {
  name: "Marcus Araújo",
  fullName: "Marcus Vinícius da Silva Araújo",
  role: "Senior Product Designer",
  tagline: "Design que melhora a experiência e gera resultado",
  about: "Com 15 anos de experiência como designer, meu foco está em criar experiências excepcionais para o usuário. Desenvolvo soluções que geram resultados concretos para o negócio, produtos e clientes, sempre aplicando processos que elevam a qualidade e a eficiência do design.",
  contact: {
    email: "marcus.vincius@gmail.com",
    phone: "(11) 93488-2336"
  },
  cases: [
    {
      id: "link-pagamento",
      title: "Link de Pagamento",
      category: "Fintech · Mobile",
      year: "2020",
      tagline: "Permitindo que consultoras de cosméticos vendam pela internet sem maquininha, durante a pandemia.",
      hasSections: true,
      metrics: [
        { value: "88", label: "SUS Score" },
        { value: "5", label: "Consultoras testaram" },
        { value: "3", label: "Sprints de pesquisa" }
      ],
      sections: {
        overview: {
          headline: "Vendas digitais para quem nunca vendeu online",
          description: "Durante a pandemia de COVID-19, as consultoras de uma grande empresa de cosméticos perderam quase todas as suas vendas — 95% eram feitas presencialmente com maquininha. Criamos o Link de Pagamento: uma solução que permite cobrar clientes pelo celular, sem maquininha, sem site, só enviando um link.",
          tags: ["UX Research", "Product Design", "Mobile", "Entrevistas", "Teste de Usabilidade"],
          duration: "N/D",
          role: "Designer",
          team: "PO · Tech Lead · Business Analytics · Designer · Devs",
          platforms: "Android · iOS"
        },
        opportunity: {
          headline: "Produtos encalhados, consultoras sem renda",
          problem: "Com a chegada da pandemia, as vendas presenciais pararam. As consultoras — com faixa de idade entre 36 e 45 anos e perfil pouco digitalizado — não tinham como cobrar digitalmente de forma simples. O estoque parado representava perda de renda direta.",
          context: "95% das vendas eram realizadas presencialmente. A empresa precisava urgentemente de uma solução digital que não exigisse conhecimento técnico e que funcionasse pelo WhatsApp, o canal principal dessas consultoras.",
          howMightWe: "Como podemos permitir que consultoras não digitalizadas cobrem seus clientes digitalmente, sem precisar de maquininha ou conhecimento técnico?"
        },
        planning: {
          headline: "Como estruturamos o projeto",
          methodology: "Dado o cronograma acelerado, priorizei começar com pesquisa de mercado e análise competitiva. A necessidade de entrevistas com as Consultoras surgiu de um impasse real: o parcelamento deveria ser automático ou manual? Precisávamos da voz das usuárias para tomar essa decisão com segurança.",
          phases: [
            { name: "Alinhamento", duration: "—", activities: "Conversa com PO, Tech Lead e BA para entender o desafio e expectativas de cada stakeholder" },
            { name: "Pesquisa de mercado", duration: "—", activities: "Análise competitiva com Mercado Pago, PagBank, Cielo e Wirecard" },
            { name: "Entrevistas", duration: "—", activities: "Recrutamento via WhatsApp e entrevistas com consultoras de venda física e digitalizadas" },
            { name: "Síntese", duration: "—", activities: "Sessão de agrupamento no Miro, Value Proposition Canvas e definição de features" },
            { name: "Design & Validação", duration: "—", activities: "Wireframes, UI com Design System, teste de usabilidade com 5 consultoras" }
          ]
        },
        research: {
          headline: "O que descobrimos com as consultoras",
          method: "Realizei entrevistas qualitativas com consultoras de dois perfis: venda física e digitalizadas. O recrutamento foi feito por mim via WhatsApp e as entrevistas foram conduzidas na mesma plataforma, de forma remota. Logo após, conduzi uma sessão de síntese no Miro com meu colega.",
          competitiveImg: "images/case-lp-affinity-map.png",
          valueCanvasImg: "images/case-lp-value-canvas.jpg",
          insights: [
            { title: "Controle do parcelamento", description: "As consultoras queriam definir quantas vezes o cliente pode parcelar — não deixar isso automático. O poder de escolha era essencial para controlar o próprio faturamento." },
            { title: "Boleto não é opção", description: "Clientes não gostam de boleto pela demora no recebimento. A preferência era pelo cartão de crédito, com recebimento em D+1." },
            { title: "WhatsApp como canal de vendas", description: "O link precisava funcionar perfeitamente no WhatsApp. Era por ali que toda a negociação e envio do link aconteceria." }
          ]
        },
        ideation: {
          headline: "Esboçando as soluções",
          description: "A pesquisa deixou evidente como cada arquétipo de consultora usaria o aplicativo de formas diferentes. Com isso, geramos wireframes em tons de cinza para cobrir todos os cenários e detalhar os fluxos antes de partir para a UI final.",
          wireframesImg: "images/case-lp-wireframes-flow.jpeg",
          concepts: [
            { name: "Decisão A", subtitle: "Parcelamento automático", description: "Sistema gera parcelas automaticamente com base no valor. Mais simples, menos controle para a consultora." },
            { name: "Decisão B", subtitle: "Parcelamento manual", description: "Consultora define o limite de parcelas. Dá controle total sobre o faturamento e as taxas repassadas ao cliente." },
            { name: "Decisão C", subtitle: "Somente boleto", description: "Opção inicial de pagamento. Descartada pela pesquisa: clientes não gostam da demora e consultoras perdem vendas." }
          ],
          chosen: "B",
          rationale: "Os insights das entrevistas e do workshop mostraram que o produto deveria deixar o parcelamento nas mãos da Consultora. O boleto foi substituído pelo cartão de crédito."
        },
        wireframes: {
          headline: "Wireframes",
          description: "Esboços em baixa fidelidade para mapear os fluxos e validar a estrutura antes de partir para a UI final.",
          images: [
            { src: "images/case-lp-home.png", label: "Home — lista de links gerados" },
            { src: "images/case-lp-wireframes.png", label: "Wireframes — telas em baixa fidelidade" }
          ]
        },
        ui: {
          headline: "As telas finalizadas",
          description: "Para a construção das telas foram usados os componentes do Design System e ilustrações 3D. Para melhorar a estética, grafismos foram adicionados para dar mais movimento às ilustrações sem fundo. O fluxo foi simplificado em etapas claras: descrição → valor → parcelamento → compartilhamento.",
          wireframesImg: "images/case-lp-wireframes.png",
          images: [
            { src: "images/case-lp-descricao.png", label: "Passo 1 — descrição do produto" },
            { src: "images/case-lp-valor.png", label: "Passo 2 — valor e parcelamento" },
            { src: "images/case-lp-parcelas.png", label: "Limite de parcelas" },
            { src: "images/case-lp-share-after.png", label: "Compartilhamento — tela final" }
          ],
          highlights: [
            "Fluxo em 3 etapas: descrição · valor · compartilhamento",
            "Controle de parcelamento nas mãos da consultora",
            "Cartão de crédito como meio principal (sem boleto)",
            "Tela de compartilhamento via WhatsApp, Facebook e SMS",
            "Grafismos para dar vida às ilustrações 3D sem fundo"
          ]
        },
        usabilityTest: {
          headline: "O que os testes revelaram",
          description: "Tínhamos uma lista de 10 consultoras, das quais 5 aderiram aos testes. Os testes foram realizados de forma remota e moderada. A tela de parcelamento gerou mais atrito — as taxas não estavam claras. A tela de sucesso/compartilhamento causou insegurança: o botão 'compartilhar' estava fixo no rodapé e o resumo exigia rolagem.",
          usabilityImg: "images/case-lp-usability.png",
          results: [
            { metric: "Facilidade de navegação", before: "Com atrito", after: "Fluida" },
            { metric: "Tela de parcelamento", before: "Taxas confusas", after: "Taxas visíveis e fixas" },
            { metric: "Tela de compartilhamento", before: "Resumo oculto", after: "Resumo visível sem rolagem" },
            { metric: "SUS Score final", before: "—", after: "88 pontos" }
          ]
        },
        learnings: {
          headline: "O que aprendi nesse projeto",
          items: [
            { number: "01", title: "Pesquisa resolve impasses de produto", description: "Como não existia pesquisa anterior, tive a oportunidade de apresentar para a empresa insights e dores reais. A decisão sobre o parcelamento — automático vs manual — só foi possível graças às entrevistas." },
            { number: "02", title: "Para problemas complexos de UX, pesquisa é obrigatória", description: "Não podemos criar um produto de valor para os usuários, sem a ajuda deles. As entrevistas e testes revelaram informações que nenhum stakeholder tinha levantado antes." },
            { number: "03", title: "Testes revelam o inesperado", description: "A tela de sucesso parecia simples — mas causou insegurança nas consultoras. Apenas observando usuários reais é possível descobrir esse tipo de problema." }
          ]
        }
      }
    },
    {
      id: "mapeamento-jornada-avon",
      title: "Mapeamento da Jornada Avon",
      category: "Research · Service Design",
      year: "2020",
      tagline: "Personas, Jornadas e Blueprint para a integração Avon + Natura&Co",
      hasSections: true,
      metrics: [
        { value: "41", label: "Dores mapeadas" },
        { value: "72", label: "Oportunidades" },
        { value: "90", label: "Insights de comportamento" }
      ],
      sections: {
        overview: {
          headline: "Entendendo a jornada da representante Avon",
          description: "Em 2020, a Avon foi adquirida pela Natura&Co. O objetivo foi identificar oportunidades e desafios, compreender os processos de backoffice de cada produto e sugerir fusões ou substituições que aumentariam a robustez do portfólio. O trabalho focou em mapear a jornada da representante que já realizava pedidos e vendas.",
          tags: ["UX Research", "Service Design", "Personas", "Journey Map", "Blueprint"],
          duration: "N/D",
          role: "Designer",
          team: "Project Manager · Tech Lead · Data Analytics · Designers",
          platforms: "Workshop · Entrevistas · Survey"
        },
        opportunity: {
          headline: "Dois portfólios, uma integração a entender",
          problem: "A fusão Avon + Natura&Co criou a necessidade urgente de entender como as representantes Avon viviam seu dia a dia — desde a prospecção de clientes até a entrega dos produtos. Sem esse mapa, decisões de produto seriam tomadas no escuro.",
          context: "A Avon já havia mapeado a jornada de cadastro com apoio de uma agência. Nosso trabalho se concentrou em mapear a jornada da representante ativa: quem já realizava pedidos, vendia e se relacionava com clientes.",
          howMightWe: "Como podemos mapear com fidelidade a jornada completa das representantes Avon para identificar dores, oportunidades e viabilizar a integração com o portfólio Natura?"
        },
        planning: {
          headline: "Alinhando expectativas com stakeholders",
          methodology: "Alinhamos escopo, objetivos e artefatos de entrega com os stakeholders desde o início. O cliente trouxe dados existentes sobre produtos e feedbacks de usuários. Estabelecemos checkpoints semanais para apresentar progresso, descobertas e aprendizados ao longo de todo o projeto.",
          phases: [
            { name: "Alinhamento", duration: "—", activities: "Definição de escopo, objetivos e artefatos com stakeholders. Checkpoints semanais estabelecidos." },
            { name: "Proto-mapeamento", duration: "—", activities: "Sessão de mapeamento com 2 representantes via videochamada para estruturar o roteiro de entrevistas." },
            { name: "Recrutamento", duration: "—", activities: "Recrutamento de representantes para entrevistas qualitativas e survey quantitativa." },
            { name: "Pesquisa de campo", duration: "—", activities: "12 entrevistas qualitativas aprofundadas + survey com 48 respostas." },
            { name: "Síntese & Artefatos", duration: "—", activities: "Workshop de cocriação, geração de Personas, Jornadas do Usuário e Blueprint." }
          ]
        },
        research: {
          headline: "Da pesquisa aos padrões de comportamento",
          method: "Para sermos assertivos no roteiro, realizei um proto-mapeamento com duas representantes via videochamada, mapeando todas as etapas do dia a dia delas. Isso nos ajudou a criar um roteiro semi-estruturado preciso. Ao final, realizamos 12 entrevistas qualitativas e uma survey com 48 respostas.",
          insights: [
            { title: "41 dores mapeadas", description: "Dores distribuídas ao longo de toda a jornada — desde a prospecção de clientes até a entrega e pós-venda." },
            { title: "72 oportunidades identificadas", description: "Oportunidades de melhoria de produto e processo que emergiram diretamente das entrevistas e análise de dados." },
            { title: "90 insights de comportamento", description: "Os artefatos condensaram todas as informações observadas em campo, virando fontes da verdade para decisões de produto." }
          ]
        },
        ideation: {
          headline: "Cinco personas para cinco perfis de representante",
          description: "Com base na pesquisa, foram criadas cinco personas: Impersonate, Relacional, Relacigital, Superdigital e Empresetante. O foco ficou em quatro delas — excluindo a Empresetante, cujo perfil mais empresarial com alto estoque a diferenciava das demais.",
          wireframesImg: "images/avon-personas.png",
          concepts: [
            { name: "Perfil 1", subtitle: "Impersonate", description: "Representante presencial, baixa digitalização. Faz tudo no papel e no boca a boca." },
            { name: "Perfil 2", subtitle: "Relacional", description: "Centrada no relacionamento com clientes. Usa o celular para conversar, mas pouco para vender digitalmente." },
            { name: "Perfil 3", subtitle: "Relacigital", description: "Mistura canais presenciais e digitais. Em transição para o mundo online." }
          ],
          chosen: "2",
          rationale: "Focamos em quatro personas (excluindo a Empresetante), pois esse perfil empresarial com alto estoque tinha uma jornada muito distinta das representantes típicas."
        },
        ui: {
          headline: "Jornadas e Blueprint",
          description: "Foram criadas jornadas detalhadas para quatro personas. Cada jornada mapeia pontos de contato, emoções, dores e oportunidades ao longo de toda a experiência da representante.",
          images: [
            { src: "images/avon-journey-relacional.png", label: "Jornada — Representante Relacional" },
            { src: "images/avon-journey-superdigital.png", label: "Jornada — Representante Super Digital" },
            { src: "images/avon-journey-impersonate.png", label: "Jornada — Representante Impersonate" },
            { src: "images/avon-journey-relacigital.png", label: "Jornada — Representante Relacigital" },
            { src: "images/avon-blueprint.png", label: "Blueprint — Visão sistêmica da jornada" }
          ],
          highlights: [
            "5 personas geradas a partir de pesquisa qualitativa e quantitativa",
            "4 jornadas do usuário detalhadas com pontos de contato e emoções",
            "1 Blueprint com visão sistêmica de toda a operação",
            "Artefatos funcionam como fonte da verdade para decisões de produto",
            "41 dores · 72 oportunidades · 90 insights de comportamento"
          ]
        },
        usabilityTest: {
          headline: "Validação com stakeholders",
          description: "Os artefatos foram apresentados e validados em checkpoints semanais com o cliente. A profundidade dos insights surpreendeu os stakeholders — os mapas passaram a funcionar como referência central para decisões de integração do portfólio.",
          results: [
            { metric: "Entrevistas realizadas", before: "Meta: 30", after: "12 com saturação" },
            { metric: "Respostas na survey", before: "Meta: —", after: "48 respostas" },
            { metric: "Dores mapeadas", before: "—", after: "41 dores" },
            { metric: "Oportunidades geradas", before: "—", after: "72 oportunidades" }
          ]
        },
        learnings: {
          headline: "O que aprendi nesse projeto",
          items: [
            { number: "01", title: "Proto-mapeamento acelera a pesquisa", description: "Realizar um mapeamento inicial com 2 representantes antes de criar o roteiro foi decisivo. Evitou perguntas genéricas e garantiu um roteiro cirúrgico para as 12 entrevistas." },
            { number: "02", title: "Qualidade supera quantidade nas entrevistas", description: "Tínhamos meta de 30 entrevistas, mas realizamos 12 — com saturação de padrões. A riqueza dos insights não foi comprometida; ao contrário, as entrevistas foram mais profundas." },
            { number: "03", title: "Artefatos viram fontes da verdade", description: "Personas, jornadas e blueprint criados com rigor metodológico deixaram de ser entregáveis e passaram a ser referências vivas para a tomada de decisão da empresa." }
          ]
        }
      }
    },
    {
      id: "novo-carrinho",
      title: "Novo Carrinho",
      category: "E-commerce · Conversão",
      year: "2019",
      tagline: "Simplificando o checkout para reduzir abandono e aumentar conversão.",
      hasSections: true,
      metrics: [
        { value: "−2,36%", label: "Abandono Americanas" },
        { value: "+0,93%", label: "Conversão" },
        { value: "A/B", label: "Teste validado" }
      ],
      sections: {
        overview: {
          headline: "Contexto",
          description: "O objetivo era simplificar ao máximo o carrinho de compras, deixar as informações mais claras e reduzir os ruídos para que o usuário tome uma decisão mais rápida e clara.",
          tags: ["Estratégia", "Análise de Dados", "Teste A/B", "Usabilidade"],
          duration: "N/D",
          role: "Designer",
          team: "N/D",
          platforms: "N/D"
        },
        opportunity: {
          headline: "Objetivo",
          problem: "Reduzir a taxa de desistência e aumentar a taxa de conversão de vendas.",
          context: "",
          howMightWe: ""
        },
        planning: null,
        research: {
          headline: "Versão antiga do Checkout",
          method: "Analisando as métricas, notei que os usuários adicionava apenas um produto na cesta. Outro ponto interessante é que o botão \"comprar\" na parte de cima (feito para compradores compulsivos) e o botão \"escolher mais produtos\" não estavam sendo utilizados. No caso do \"escolher mais produtos\", os usuários se sentiram mais à vontade para utilizar a busca.",
          competitiveImg: "images/carrinho-antigo.png",
          insights: []
        },
        ideation: {
          headline: "Esboço",
          description: "Meus esboços foram baseados nas entrevistas iniciais com o usuário e no objetivo do negócio. Voltamos aos esboços durante todo o processo de design para garantir que não perdemos de vista nossos objetivos e ideias principais.",
          wireframesImg: "images/carrinho-sketch.png",
          concepts: [],
          chosen: "",
          rationale: ""
        },
        ui: {
          headline: "Nova versão",
          description: "A solução foi simplificar a tela, para dar foco nas condições de pagamento que deveriam constar no resumo da compra.",
          images: [
            { src: "images/carrinho-novo.png", label: "Nova versão do carrinho" }
          ],
          highlights: []
        },
        usabilityTest: {
          headline: "Resultado",
          description: "Rodei um teste A/B e o novo carrinho teve um bom retorno, o maior ganho foi visto na Americanas, onde tivemos uma queda de -2,36 de abandono no pagamento e aumentamos em 0,93% a conversão.",
          resultImg: "images/carrinho-ab-result.png",
          results: [
            { metric: "Abandono no pagamento (Americanas)", before: "—", after: "−2,36 p.p." },
            { metric: "Conversão de vendas", before: "—", after: "+0,93%" }
          ]
        },
        learnings: null
      }
    },
    {
      id: "setor-automotivo",
      title: "Redefinindo o Setor Automotivo",
      category: "E-commerce · UX Research",
      year: "2018",
      tagline: "Pesquisa, estratégia e UX/UI para o maior e-commerce da América Latina entrar no mercado automotivo.",
      hasSections: true,
      metrics: [
        { value: "10", label: "Entrevistas qualitativas" },
        { value: "5", label: "Arquétipos gerados" },
        { value: "POC", label: "Validada em pneus" }
      ],
      sections: {
        overview: {
          headline: "Estratégia, Pesquisa e UX/UI",
          description: "O maior e-commerce da América Latina resolveu investir no setor automotivo, pois um dos seus concorrentes estava aumentando o número de vendas. Analisando o setor, vimos que os produtos mais vendidos eram de peças e pneus.",
          tags: ["Estratégia", "Pesquisa", "UX/UI", "Workshop", "Arquétipos", "Prototipagem"],
          duration: "N/D",
          role: "Designer",
          team: "Stakeholders internos · Designers · Time de produto",
          platforms: "Mobile · Desktop"
        },
        opportunity: {
          headline: "O maior e-commerce da América Latina no mercado automotivo",
          problem: "Um concorrente estava aumentando o número de vendas no setor automotivo. Analisando o setor, vimos que os produtos mais vendidos eram de peças e pneus.",
          context: "",
          howMightWe: ""
        },
        planning: {
          headline: "Pesquisa exploratória para criar empatia",
          methodology: "Minha abordagem foi iniciar o processo de pesquisa exploratória, que criou uma compreensão mais holística de quem são os usuários, como eles pesquisam por peças e pneus, necessidades ou pontos problemáticos ao buscarem por essas informações e como eles adquiriram esses produtos.\n\nEssa abordagem ajudaria muito a empresa a desenvolver empatia e compreensão de quem eram os nossos clientes.",
          phases: [
            { name: "Workshop", duration: "—", activities: "Workshop com stakeholders para levantar dores, necessidades, tarefas e traços de personalidade dos usuários. Criação de proto-arquétipos." },
            { name: "Entrevistas", duration: "—", activities: "10 entrevistas qualitativas com clientes de RJ, PE e MG. Sessões remotas de ~60 minutos cada." },
            { name: "Síntese", duration: "—", activities: "Análise de anotações no Excel, identificação de insights e construção de 5 personas." },
            { name: "Estratégia", duration: "—", activities: "Apresentação da pesquisa para stakeholders e definição de foco em pneus via POC." },
            { name: "Interface", duration: "—", activities: "Wireframing e protótipos de alta fidelidade para mobile e desktop, usando o Styleguide existente." }
          ]
        },
        research: {
          headline: "O que descobrimos",
          method: "Realizamos entrevistas com dez clientes, sendo quatro do Rio de Janeiro, três de Pernambuco e três de Minas Gerais. Cada sessão de pesquisa durou cerca de 60 minutos. As entrevistas foram abertas, começando com perguntas para entender o nível de conhecimento de automóveis até como faziam para instalar as peças e pneus.",
          insights: [
            { title: "Dois perfis de busca por pneus", description: "Alguns clientes usam o Google para descobrir a referência do pneu pela marca, modelo e ano do carro. Outros já sabem onde localizar a numeração no próprio pneu." },
            { title: "Barreira com mecânicos", description: "Alguns mecânicos não aceitam instalar peças adquiridas em outra loja. Reclamam da qualidade — o que gerava desconfiança nos clientes." },
            { title: "Pneus têm mais confiança", description: "Clientes já compravam pneus online e realizavam a instalação na oficina parceira. Peças geravam mais desconfiança por experiências com produtos falsificados ou de baixa qualidade." }
          ]
        },
        ideation: {
          headline: "Workshop e proto-arquétipos",
          description: "Meu primeiro passo foi atrair os stakeholders com conhecimento sobre as necessidades atuais, tarefas e pontos problemáticos dos clientes. Para este workshop, cada participante teve dez minutos para debater suas ideias nos seguintes pontos: dores, necessidades, tarefas e traços de personalidade. Depois de discutir, agrupamos as ideias semelhantes, priorizamos e escolhemos as sete primeiras em cada categoria para os proto-arquétipos.\n\nCriei essas proto-personas para nos dar uma ideia do que podemos esperar ao falar com esses usuários. Os proto-personas também ajudaram a nortear a criação das perguntas da entrevista.",
          wireframesImg: "images/auto-personas.png",
          concepts: [
            { name: "Decisão A", subtitle: "Focar em peças e pneus", description: "Escopo amplo cobrindo todo o setor automotivo. Mais complexidade, mais riscos com qualidade percebida." },
            { name: "Decisão B", subtitle: "POC focada em pneus", description: "Foco em pneus, produto com mais confiança dos usuários. O e-commerce já possui parcerias com oficinas para instalação — logística resolvida." },
            { name: "Decisão C", subtitle: "Aguardar mais pesquisa", description: "Realizar mais rodadas de pesquisa antes de definir o escopo. Mais tempo, mais segurança." }
          ],
          chosen: "B",
          rationale: "Focamos em pneus pois apresentavam mais confiança. Durante as entrevistas, clientes relataram ter adquirido peças falsas ou de baixa qualidade — o que criava uma barreira de credibilidade que não existia com pneus."
        },
        ui: {
          headline: "Interface e evolução do produto",
          description: "O maior e-commerce da América Latina já possui um Styleguide com uma biblioteca de componentes robusta. O que fiz foi aplicar esses componentes na interface da solução. Foram projetadas interfaces para mobile e desktop.\n\nA POC obteve bons resultados e o novo time decidiu evoluir a ideia: A Garagem — uma solução que oferece produtos compatíveis com o carro do cliente. Os dados do veículo ficam salvos na Garagem e no login do cliente para receber ofertas de autopeças e acessórios.",
          mobileImages: [
            { src: "images/auto-pneus.png",              label: "Busca de pneus por medida" },
            { src: "images/auto-garagem-home.png",       label: "A Garagem — home" },
            { src: "images/auto-garagem-categories.png", label: "A Garagem — categorias compatíveis" },
            { src: "images/auto-products-listing.png",   label: "Listagem de produtos" }
          ],
          highlights: [
            "Interfaces projetadas para mobile e desktop",
            "Componentes do Styleguide existente aplicados na solução",
            "POC focada no fluxo de busca e descoberta de pneus",
            "Evolução para 'A Garagem': perfil do veículo salvo com ofertas personalizadas"
          ]
        },
        usabilityTest: {
          headline: "Métricas e validação",
          description: "Utilizamos o framework AARRR (métricas piratas) para mensurar o sucesso, identificar o desempenho da solução e levantar questionamentos sobre a performance da POC.",
          results: [
            { metric: "Aquisição", before: "—", after: "Novos usuários no setor automotivo" },
            { metric: "Ativação", before: "—", after: "Usuários que completam a busca por pneus" },
            { metric: "Retenção", before: "—", after: "Retorno ao produto" },
            { metric: "Receita", before: "—", after: "Conversão em vendas de pneus" },
            { metric: "Reputação", before: "—", after: "NPS e avaliações" }
          ]
        },
        learnings: {
          headline: "Alegrias e desafios",
          items: [
            { number: "✓", title: "Ver todos engajados no workshop", description: "Ver todas as pessoas engajadas na criação de proto-personas com post-its e discussão foi uma das melhores partes do processo." },
            { number: "✓", title: "Apresentar os usuários à empresa", description: "Como não havia pesquisa de usuário anterior, ser capaz de apresentar a empresa a seus usuários e criar um senso de empatia e compreensão foi muito significativo. Ter mudanças no produto com base na pesquisa foi a validação desse esforço." },
            { number: "!", title: "Trabalhar numa área com pouco conhecimento", description: "Fizemos reuniões iniciais para garantir alinhamento no guia de discussão e na seleção de participantes. Conseguir adesão para a pesquisa exigiu mostrar o impacto de forma concreta antes de obter aprovação." }
          ]
        }
      }
    }
  ]
};
