interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  // 1. Git/DevOps
  {
    question:
      "Qual comando do Git adiciona arquivos à staging area antes do commit?",
    options: ["git add", "git stage", "git commit --add", "git push"],
    correctIndex: 0,
    explanation: "Use `git add` para preparar arquivos para o próximo commit.",
  },
  // 2. REST
  {
    question:
      "Em uma API REST, qual status code representa 'Criado com sucesso'?",
    options: ["200", "201", "204", "409"],
    correctIndex: 1,
    explanation: "201 Created indica que um recurso foi criado com sucesso.",
  },
  // 3. React state
  {
    question: "Em React, qual hook é mais indicado para estado local simples?",
    options: ["useEffect", "useReducer", "useMemo", "useState"],
    correctIndex: 3,
    explanation: "`useState` é o hook padrão para estado local simples.",
  },
  // 4. CSS
  {
    question: "No CSS, qual propriedade controla a distância entre linhas?",
    options: ["line-height", "letter-spacing", "word-spacing", "gap"],
    correctIndex: 0,
    explanation: "`line-height` controla o espaçamento vertical entre linhas.",
  },
  // 5. NoSQL
  {
    question:
      "Qual banco NoSQL é orientado a documentos e muito usado com Node.js?",
    options: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
    correctIndex: 1,
    explanation:
      "MongoDB armazena documentos JSON-like, comum em aplicações Node.js.",
  },
  // 6. Clean Code
  {
    question:
      "Sobre Clean Code, qual prática é recomendada para nomes de funções?",
    options: [
      "Nomes curtos e genéricos",
      "Abreviações enigmáticas",
      "Nomes descritivos que expressem intenção",
      "Usar números no nome (ex: fn1, fn2)",
    ],
    correctIndex: 2,
    explanation:
      "Nomes descritivos aumentam legibilidade e mantêm o código claro.",
  },
  // 7. HTTP idempotência
  {
    question: "Qual método HTTP é idempotente por definição?",
    options: ["POST", "PATCH", "PUT", "CONNECT"],
    correctIndex: 2,
    explanation:
      "PUT é idempotente: múltiplas chamadas têm o mesmo efeito no recurso.",
  },
  // 8. React performance
  {
    question:
      "Qual hook ajuda a memorizar um valor computado caro em termos de performance em React?",
    options: ["useMemo", "useRef", "useEffect", "useLayoutEffect"],
    correctIndex: 0,
    explanation:
      "`useMemo` evita recomputações desnecessárias de valores caros.",
  },
  // 9. DB Relacional
  {
    question: "Qual é a chave primária em um banco relacional?",
    options: [
      "Uma coluna que permite valores nulos",
      "Uma coluna que pode repetir valores",
      "Uma ou mais colunas que identificam unicamente uma linha",
      "Uma restrição de integridade referencial",
    ],
    correctIndex: 2,
    explanation: "A chave primária identifica unicamente cada linha da tabela.",
  },
  // 10. Normalização
  {
    question:
      "Qual é o principal objetivo da normalização em bancos relacionais?",
    options: [
      "Aumentar redundância",
      "Diminuir desempenho",
      "Reduzir duplicidade e anomalias",
      "Evitar o uso de chaves estrangeiras",
    ],
    correctIndex: 2,
    explanation:
      "Normalização reduz redundância de dados e anomalias de atualização.",
  },
  // 11. REST verbs
  {
    question:
      "Qual verbo HTTP é mais adequado para atualizar parcialmente um recurso?",
    options: ["GET", "POST", "PUT", "PATCH"],
    correctIndex: 3,
    explanation: "PATCH é recomendado para atualizações parciais de recursos.",
  },
  // 12. JWT
  {
    question:
      "Em autenticação JWT, onde deve ficar o segredo (secret) de assinatura?",
    options: [
      "No client",
      "No repositório público",
      "No servidor/variáveis de ambiente",
      "Dentro do token",
    ],
    correctIndex: 2,
    explanation:
      "O secret deve ficar seguro no servidor (variáveis de ambiente).",
  },
  // 13. DevOps CI
  {
    question: "No CI, qual prática ajuda a detectar problemas cedo?",
    options: [
      "Executar testes apenas em produção",
      "Build e testes automatizados a cada commit",
      "Deploy manual semanal",
      "Executar testes só em PRs grandes",
    ],
    correctIndex: 1,
    explanation:
      "Build e testes automáticos por commit reduzem regressões em produção.",
  },
  // 14. Docker
  {
    question: "Qual comando cria uma imagem Docker a partir de um Dockerfile?",
    options: ["docker run", "docker compose", "docker build", "docker push"],
    correctIndex: 2,
    explanation: "`docker build` cria uma imagem a partir do Dockerfile.",
  },
  // 15. Kubernetes
  // {
  //   question:
  //     "No Kubernetes, qual objeto expõe o Pod para acesso de rede estável?",
  //   options: ["Deployment", "ConfigMap", "Service", "Secret"],
  //   correctIndex: 2,
  //   explanation: "Services fornecem uma abstração de rede estável para Pods.",
  // },
  // 16. React store
  {
    question:
      "Para gerenciar estado global complexo em apps React, o que é mais indicado?",
    options: [
      "useEffect local",
      "Context isolado sempre",
      "Redux/Zustand/MobX",
      "useLayoutEffect",
    ],
    correctIndex: 2,
    explanation:
      "Bibliotecas como Redux/Zustand/MobX são recomendadas para estado global.",
  },
  // 17. SQL JOIN
  {
    question:
      "Qual JOIN retorna todas as linhas da tabela da esquerda e as correspondentes da direita?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    correctIndex: 1,
    explanation: "LEFT JOIN mantém todas as linhas da tabela esquerda.",
  },
  // 18. Índices
  {
    question:
      "Índices em bancos relacionais melhoram principalmente o desempenho de:",
    options: [
      "Escritas massivas",
      "Consultas de leitura",
      "Uso de disco",
      "Disponibilidade do servidor",
    ],
    correctIndex: 1,
    explanation:
      "Índices aceleram consultas de leitura, com custo em operações de escrita.",
  },
  // 19. REST pagination
  {
    question: "Qual prática é recomendada para paginação em APIs REST?",
    options: [
      "Retornar tudo em uma única resposta",
      "Usar query params como page/limit",
      "Usar cookies para paginação",
      "Exigir corpo (body) no GET",
    ],
    correctIndex: 1,
    explanation:
      "Usar `?page=` e `?limit=` (ou cursor) para paginação é prática comum.",
  },
  // 20. Clean Code funções
  {
    question:
      "Qual é uma boa prática para funções, segundo os princípios de Clean Code?",
    options: [
      "Funções grandes e genéricas",
      "Uma função deve fazer apenas uma coisa",
      "Funções com muitos parâmetros",
      "Misturar efeitos colaterais e retorno",
    ],
    correctIndex: 1,
    explanation:
      "Funções coesas, que fazem apenas uma coisa, facilitam testes e manutenção.",
  },
  // 21. HTTP caching
  {
    question:
      "Qual cabeçalho HTTP permite ao cliente reutilizar a versão em cache quando não houve mudanças?",
    options: ["Authorization", "If-None-Match", "Content-Type", "Accept"],
    correctIndex: 1,
    explanation:
      "`If-None-Match` com ETag permite validação condicional de cache.",
  },
  // 22. Segurança CORS
  {
    question: "Para habilitar CORS corretamente em uma API, devemos:",
    options: [
      "Permitir qualquer origem e métodos sempre",
      "Definir origens confiáveis e métodos/headers necessários",
      "Bloquear todos os OPTIONS",
      "Incluir o token no HTML",
    ],
    correctIndex: 1,
    explanation:
      "CORS deve liberar apenas origens, métodos e headers estritamente necessários.",
  },
  // 23. NoSQL vs relacional
  {
    question:
      "Quando escolher um NoSQL orientado a chave-valor (ex: Redis)?",
    options: [
      "Para consultas complexas com JOINs",
      "Para cache/contadores/pub-sub e alta performance em leitura",
      "Para forte consistência transacional",
      "Para relatórios analíticos complexos",
    ],
    correctIndex: 1,
    explanation:
      "Redis é ótimo para cache, contadores, filas e pub/sub de alta performance.",
  },
  // 24. React memo
  {
    question:
      "Qual técnica evita re-renderizações desnecessárias de componentes puros em React?",
    options: ["useEffect", "React.memo", "useLayoutEffect", "Suspense"],
    correctIndex: 1,
    explanation:
      "`React.memo` memoriza o resultado do componente com base nas props.",
  },
  // 25. Estado derivado
  {
    question: "Qual prática evita bugs com estado derivado em React?",
    options: [
      "Duplicar estados dependentes",
      "Calcular valores derivados no render (useMemo quando caro)",
      "Guardar tudo no estado global",
      "Sincronizar manualmente com setInterval",
    ],
    correctIndex: 1,
    explanation:
      "Evite duplicar estado. Derive sempre a partir de uma fonte da verdade.",
  },
  // 26. REST id vs body
  {
    question:
      "Em uma rota REST `PUT /users/:id`, onde deve estar o identificador do recurso?",
    options: [
      "No corpo (body) apenas",
      "Na URL (path parameter)",
      "Em cookies",
      "No header Authorization",
    ],
    correctIndex: 1,
    explanation: "O identificador do recurso pertence ao path, ex: `/users/123`.",
  },
  // 27. Transactions
  // {
  //   question:
  //     "Para garantir atomicidade de múltiplas operações em um banco relacional, usamos:",
  //   options: ["Views", "Triggers", "Transações", "Procedures sempre"],
  //   correctIndex: 2,
  //   explanation:
  //     "Transações garantem as propriedades ACID: atomicidade, consistência, isolamento e durabilidade.",
  // },
  // 28. DevOps Observabilidade
  {
    question:
      "Qual NÃO é um dos três pilares clássicos da observabilidade (Three Pillars)?",
    options: ["Logs", "Metrics", "Tracing", "Backups"],
    correctIndex: 3,
    explanation:
      "Backups são importantes, mas os três pilares são logs, métricas e traces.",
  },
  // 29. Docker camadas
  {
    question:
      "Para imagens menores e builds otimizados no Docker, é boa prática:",
    options: [
      "Usar imagens base slim/alpine e multistage build",
      "Sempre usar imagens completas",
      "Instalar tudo em runtime",
      "Copiar node_modules do host",
    ],
    correctIndex: 0,
    explanation:
      "Imagens slim/alpine + multistage builds geram imagens menores e mais seguras.",
  },
  // 30. HTTP segurança
  {
    question:
      "Qual header HTTP ajuda a mitigar ataques de XSS refletido (cross-site scripting)?",
    options: [
      "X-Frame-Options",
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "Accept-Encoding",
    ],
    correctIndex: 1,
    explanation:
      "Content-Security-Policy define políticas de carregamento e reduz a superfície de XSS.",
  },

  // ─────────────────────────────────────────────────────────────
  // 31. Git: desfazer staging (fácil)
  {
    question:
      "Qual comando remove um arquivo do staging area (sem apagar o arquivo)?",
    options: ["git reset", "git rm", "git stash", "git checkout -- ."],
    correctIndex: 0,
    explanation:
      "`git reset <arquivo>` (ou `git restore --staged <arquivo>`) tira do staging sem deletar.",
  },
  // 32. Git: ver histórico (fácil)
  {
    question: "Qual comando mostra o histórico de commits?",
    options: ["git log", "git status", "git history", "git show-branch"],
    correctIndex: 0,
    explanation: "`git log` lista commits e mensagens.",
  },
  // 33. Git: branches (fácil)
  {
    question: "Qual comando cria uma nova branch?",
    options: ["git branch nome", "git checkout --new", "git add branch", "git push -b"],
    correctIndex: 0,
    explanation: "`git branch nome` cria a branch localmente.",
  },
  // 34. Git: mudar de branch (fácil)
  {
    question: "Qual comando troca para outra branch?",
    options: ["git switch nome", "git move nome", "git branch --use", "git merge nome"],
    correctIndex: 0,
    explanation: "`git switch nome` (ou `git checkout nome`) troca de branch.",
  },
  // 35. HTTP: status 204 (fácil)
  {
    question: "Qual status code significa 'Sem conteúdo' (No Content)?",
    options: ["200", "201", "204", "404"],
    correctIndex: 2,
    explanation: "204 indica sucesso sem corpo de resposta.",
  },
  // 36. HTTP: status 401 vs 403 (médio)
  {
    question: "Qual a diferença típica entre 401 e 403?",
    options: [
      "401 é erro do servidor e 403 é erro do client",
      "401 é não autenticado; 403 é autenticado porém sem permissão",
      "401 é recurso não encontrado; 403 é conflito",
      "Não existe diferença",
    ],
    correctIndex: 1,
    explanation:
      "401 (Unauthorized) costuma ser falta de autenticação; 403 (Forbidden) é falta de autorização.",
  },
  // 37. REST: GET com body (fácil)
  {
    question: "Em geral, qual prática é recomendada para GET?",
    options: [
      "Enviar dados no body",
      "Enviar dados em query params (quando necessário)",
      "Enviar dados em headers aleatórios",
      "Enviar sempre em multipart/form-data",
    ],
    correctIndex: 1,
    explanation:
      "GET normalmente usa query params; body em GET é incomum e pode não ser suportado.",
  },
  // 38. React: keys em listas (médio)
  {
    question: "Em React, por que usamos `key` ao renderizar listas?",
    options: [
      "Para reduzir o bundle",
      "Para ajudar o React a identificar itens e otimizar diffs",
      "Para evitar useEffect",
      "Para habilitar SSR automaticamente",
    ],
    correctIndex: 1,
    explanation:
      "Keys ajudam o React a reconciliar listas, evitando re-renders e bugs de estado.",
  },
  // 39. React: useEffect dispara quando? (médio)
  {
    question: "Com `useEffect(() => {...}, [])`, quando o efeito roda?",
    options: [
      "A cada render",
      "Somente no mount (e cleanup no unmount)",
      "Somente quando props mudarem",
      "Somente quando state mudar",
    ],
    correctIndex: 1,
    explanation:
      "Com deps vazias, roda no mount e o cleanup no unmount.",
  },
  // 40. React: controlled vs uncontrolled (médio)
  {
    question: "O que é um input controlado (controlled) em React?",
    options: [
      "Um input sem `value`",
      "Um input cujo valor é controlado pelo state do React",
      "Um input que usa apenas `defaultValue`",
      "Um input que não dispara eventos",
    ],
    correctIndex: 1,
    explanation:
      "Controlled input tem `value` vindo do state e `onChange` atualizando esse state.",
  },
  // 41. JS: var/let/const (fácil)
  {
    question: "Qual palavra-chave tem escopo de bloco (block scope)?",
    options: ["var", "let", "function", "with"],
    correctIndex: 1,
    explanation: "`let` (e `const`) são block scope; `var` é function scope.",
  },
  // 42. TS: diferença type vs interface (médio)
  {
    question: "No TypeScript, uma diferença comum entre `type` e `interface` é:",
    options: [
      "`interface` não suporta extensão",
      "`type` não pode representar união",
      "`interface` pode ser reaberta/mesclada (declaration merging)",
      "`type` só funciona em arquivos .d.ts",
    ],
    correctIndex: 2,
    explanation:
      "`interface` permite declaration merging; `type` é mais flexível para unions/intersections.",
  },
  // 43. SQL: WHERE vs HAVING (médio)
  {
    question: "Em SQL, `HAVING` é mais usado para filtrar:",
    options: [
      "Linhas antes do GROUP BY",
      "Resultados após agregações (GROUP BY)",
      "Apenas colunas de texto",
      "Somente joins",
    ],
    correctIndex: 1,
    explanation:
      "`HAVING` filtra grupos/agregações; `WHERE` filtra linhas antes de agrupar.",
  },
  // 44. SQL: COUNT(*) (fácil)
  {
    question: "O que `COUNT(*)` retorna em SQL?",
    options: [
      "Soma de uma coluna numérica",
      "Quantidade de linhas no resultado",
      "Quantidade de colunas na tabela",
      "Maior valor da tabela",
    ],
    correctIndex: 1,
    explanation: "`COUNT(*)` conta linhas (inclui nulos).",
  },
  // 45. Banco: ACID (médio)
  {
    question: "Qual letra do ACID representa 'Isolamento'?",
    options: ["A", "C", "I", "D"],
    correctIndex: 2,
    explanation: "ACID = Atomicidade, Consistência, Isolamento, Durabilidade.",
  },
  // 46. Node: event loop (difícil)
  {
    question:
      "No Node.js, qual afirmação é mais correta sobre o Event Loop?",
    options: [
      "Ele cria uma thread por request",
      "Ele executa tarefas assíncronas usando fases/filas, delegando I/O ao sistema",
      "Ele só existe no navegador",
      "Ele impede qualquer operação de CPU",
    ],
    correctIndex: 1,
    explanation:
      "O event loop coordena callbacks/promises e delega I/O para o sistema/libuv.",
  },
  // 47. Segurança: hashing vs encryption (médio)
  {
    question: "Qual a diferença principal entre hash e criptografia?",
    options: [
      "Hash é reversível; criptografia não",
      "Hash é unidirecional; criptografia é reversível com chave",
      "Ambos são iguais",
      "Hash só serve para imagens",
    ],
    correctIndex: 1,
    explanation:
      "Hash é unidirecional; criptografia pode ser revertida com a chave correta.",
  },
  // 48. API: rate limiting (médio)
  {
    question: "Por que implementar rate limiting em uma API?",
    options: [
      "Para aumentar latência",
      "Para impedir cache",
      "Para reduzir abuso/DoS e proteger recursos",
      "Para substituir autenticação",
    ],
    correctIndex: 2,
    explanation:
      "Rate limiting protege a API contra abuso e picos, evitando indisponibilidade.",
  },
  // 49. Docker: diferença imagem vs container (fácil)
  {
    question: "Qual a diferença entre imagem e container no Docker?",
    options: [
      "Imagem é a instância em execução; container é o template",
      "Imagem é o template; container é a instância em execução",
      "Ambos são a mesma coisa",
      "Container só existe no Windows",
    ],
    correctIndex: 1,
    explanation:
      "Imagem é o blueprint; container é a execução dessa imagem.",
  },
  // 50. Kubernetes: Deployment (médio)
  {
    question: "No Kubernetes, o que um Deployment gerencia principalmente?",
    options: [
      "Segredos e variáveis de ambiente",
      "Pods (réplicas) e estratégia de rollout",
      "DNS e certificados",
      "Volumes locais do nó",
    ],
    correctIndex: 1,
    explanation:
      "Deployment controla réplicas (via ReplicaSet) e rollouts/rollbacks.",
  },
];

export const questions2: Question[] = [
  // 1. Git/DevOps
  {
    question:
      "Qual comando do Git adiciona arquivos à staging area antes do commit?",
    options: ["git add", "git stage", "git commit --add", "git push"],
    correctIndex: 0,
    explanation: "Use `git add` para preparar arquivos para o próximo commit.",
  },
  // 2. REST
  {
    question:
      "Em uma API REST, qual status code representa 'Criado com sucesso'?",
    options: ["200", "201", "204", "409"],
    correctIndex: 1,
    explanation: "201 Created indica que um recurso foi criado com sucesso.",
  },
];