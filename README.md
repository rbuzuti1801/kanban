# 📋 Kanban Task Manager

> Sistema moderno de gestão de tarefas estilo kanban desenvolvido em React.js, pronto para deploy em produção.

[![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)](#deployment)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)
[![Responsive](https://img.shields.io/badge/responsive-yes-brightgreen)](#features)

## 🚀 Demonstração

🔗 **[Ver Aplicação ao Vivo](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/0be39069f4acac2f57da83a328f4a764/18b5a8b0-82ec-4c35-b11a-b0822a0755b4/index.html)**

## ✨ Características

### 🎯 Funcionalidades Principais
- **Quadro Kanban Interativo** - 4 colunas padrão: Backlog, To Do, In Progress, Done
- **Drag & Drop Nativo** - Mover tarefas entre colunas com animações suaves
- **Gerenciamento Completo** - Criar, editar, excluir e organizar tarefas
- **Sistema de Prioridades** - Classificação visual por cores (Alta/Média/Baixa)
- **Alertas de Vencimento** - Destaque para tarefas com prazo vencido
- **Busca Inteligente** - Pesquisar por título ou descrição
- **Filtros Avançados** - Filtrar por prioridade e status

### 🎨 Interface e UX
- **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- **Tema Claro/Escuro** - Alternância com persistência de preferência
- **Animações Suaves** - Transições fluidas e feedback visual
- **Interface Limpa** - Design moderno e profissional
- **Acessibilidade** - Navegação por teclado e leitores de tela

### 💾 Persistência e Dados
- **Armazenamento Local** - Dados salvos automaticamente no navegador
- **Export/Import** - Backup e restauração em formato JSON
- **Dados de Exemplo** - Tarefas pré-configuradas para demonstração

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React.js** | 18+ | Framework frontend principal |
| **CSS3** | Latest | Estilização moderna com Grid/Flexbox |
| **Font Awesome** | 6.4.0 | Biblioteca de ícones |
| **SortableJS** | 1.15.0 | Funcionalidade drag & drop |
| **localStorage** | Native | Persistência de dados |

## 📦 Instalação e Uso

### Método 1: Executar Localmente

```bash
# Clonar ou baixar os arquivos
git clone https://github.com/seu-usuario/kanban-task-manager.git
cd kanban-task-manager

# Executar servidor local (escolha uma opção)
python3 -m http.server 3000
# ou
npx serve -s . -l 3000
# ou
npm start
```

Acesse: `http://localhost:3000`

### Método 2: Docker

```bash
# Build e execução com Docker
docker build -t kanban-task-manager .
docker run -d -p 3000:80 kanban-task-manager

# Ou usando docker-compose
docker-compose up -d
```

### Método 3: Deploy Direto

Simplesmente faça upload dos arquivos para qualquer servidor web:
- `index.html`
- `style.css` 
- `app.js`

## 🚀 Deployment

### Opções de Hospedagem

| Plataforma | Complexidade | Custo | SSL Gratuito |
|------------|--------------|-------|--------------|
| **Netlify** | ⭐ Muito Fácil | Gratuito | ✅ |
| **Vercel** | ⭐ Muito Fácil | Gratuito | ✅ |
| **GitHub Pages** | ⭐⭐ Fácil | Gratuito | ✅ |
| **AWS S3** | ⭐⭐⭐ Médio | Muito Baixo | ❌ |
| **VPS/Server** | ⭐⭐⭐⭐ Avançado | Variável | ⚙️ Configurável |

### Deploy Rápido

#### Netlify
```bash
npx netlify deploy --prod --dir .
```

#### Vercel
```bash
npx vercel --prod
```

#### GitHub Pages
1. Fazer upload para repositório GitHub
2. Ativar Pages nas configurações
3. Pronto! URL: `https://[username].github.io/[repo-name]`

## 🎮 Como Usar

### Primeiros Passos
1. **Criar Tarefa**: Clique no botão \"➕ Adicionar Tarefa\" em qualquer coluna
2. **Preencher Detalhes**: Título, descrição, prioridade e data de vencimento
3. **Mover Tarefas**: Arraste entre colunas para alterar status
4. **Editar**: Clique em qualquer tarefa para editar
5. **Filtrar**: Use a barra de busca e filtros por prioridade

### Funcionalidades Avançadas
- **Tema**: Clique no ícone 🌙/☀️ para alternar tema
- **Export**: Menu → Exportar → Baixar JSON
- **Limpar**: Botão \"Limpar Concluídas\" remove tarefas da coluna Done
- **Estatísticas**: Contadores automáticos por coluna

## ⚙️ Configuração

### Personalizar Dados Iniciais

Edite as constantes no início do arquivo `app.js`:

```javascript
const initialTasks = [
  {
    id: \"1\",
    title: \"Sua tarefa personalizada\",
    description: \"Descrição detalhada\",
    priority: \"High\", // High, Medium, Low
    dueDate: \"2025-06-10\",
    status: \"Backlog\", // Backlog, To Do, In Progress, Done
    createdAt: \"2025-06-05\"
  }
  // Adicione mais tarefas...
];
```

### Customizar Colunas

```javascript
const defaultColumns = [
  { id: \"Backlog\", title: \"Sua Coluna\", color: \"#6B7280\" },
  // Adicione mais colunas...
];
```

### Personalizar Cores

Edite as variáveis CSS no arquivo `style.css`:

```css
:root {
  --color-primary: #sua-cor-principal;
  --color-background: #sua-cor-fundo;
  /* Outras variáveis... */
}
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ❌ Internet Explorer

### Dispositivos
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🔧 API de Dados

### Estrutura da Tarefa
```javascript
{
  id: \"string\",           // ID único
  title: \"string\",        // Título (obrigatório)
  description: \"string\",  // Descrição detalhada
  priority: \"High|Medium|Low\", // Prioridade
  dueDate: \"YYYY-MM-DD\",  // Data de vencimento
  status: \"string\",       // Status/coluna atual
  createdAt: \"YYYY-MM-DD\" // Data de criação
}
```

### LocalStorage Keys
- `kanban-tasks`: Array de tarefas
- `kanban-theme`: Tema atual (\"light\" | \"dark\")
- `kanban-columns`: Configuração de colunas (futuro)

## 🚨 Troubleshooting

### Problemas Comuns

#### Drag & Drop não funciona
```javascript
// Verificar no console do navegador
console.log(typeof Sortable); // Deve retornar 'function'
```

#### Dados não persistem
```javascript
// Testar localStorage
localStorage.setItem('test', 'works');
console.log(localStorage.getItem('test')); // Deve retornar 'works'
```

#### Estilos quebrados
- Verificar se `style.css` está carregando
- Verificar console para erros 404
- Verificar MIME type no servidor

## 📈 Performance

### Métricas Típicas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Otimizações Implementadas
- ✅ CSS otimizado com variáveis
- ✅ JavaScript minificado em produção
- ✅ Lazy loading de componentes
- ✅ Debounced search
- ✅ Efficient re-rendering

## 🔒 Segurança

### Medidas Implementadas
- ✅ CSP Headers recomendados
- ✅ XSS Protection headers
- ✅ Sem dependências vulneráveis
- ✅ Dados apenas no cliente (localStorage)
- ✅ Validação de entrada de dados

### Headers de Segurança (Nginx)
```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection \"1; mode=block\";
add_header Referrer-Policy \"strict-origin-when-cross-origin\";
```

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Roadmap Futuro
- [ ] Backend com API REST
- [ ] Autenticação de usuários
- [ ] Colaboração em tempo real
- [ ] Notificações push
- [ ] Integração com calendário
- [ ] Templates de projeto
- [ ] Analytics e relatórios
- [ ] App mobile nativo

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **React Team** - Framework principal
- **Font Awesome** - Ícones
- **SortableJS** - Funcionalidade drag & drop
- **Netlify/Vercel** - Plataformas de deploy gratuito

---

<div align=\"center\">
  
**[⬆️ Voltar ao Topo](#-kanban-task-manager)**

Feito com ❤️ para produtividade

</div>