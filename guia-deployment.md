# Guia de Deployment - Kanban Task Manager

## 📋 Visão Geral

Este é um sistema completo de gestão de tarefas estilo kanban desenvolvido em React.js, pronto para deployment em ambiente de produção. O aplicativo oferece uma interface moderna e intuitiva para gerenciar tarefas em um fluxo de trabalho visual.

## 🚀 Características Principais

### Funcionalidades Core
- **Quadro Kanban**: 4 colunas padrão (Backlog, To Do, In Progress, Done)
- **Gerenciamento de Tarefas**: Criar, editar, excluir e mover tarefas
- **Drag & Drop**: Arrastar tarefas entre colunas e reordenar
- **Prioridades**: Sistema de prioridades com cores (Alta/Média/Baixa)
- **Datas de Vencimento**: Alertas visuais para tarefas vencidas
- **Busca e Filtros**: Pesquisar por título/descrição e filtrar por prioridade

### Funcionalidades Avançadas
- **Tema Claro/Escuro**: Alternar entre temas com persistência
- **Responsive Design**: Interface adaptável para desktop e mobile
- **Persistência Local**: Dados salvos automaticamente no localStorage
- **Animações Suaves**: Transições e feedback visual
- **Contador de Tarefas**: Visualização da quantidade por coluna
- **Export de Dados**: Exportar tarefas em formato JSON

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js 18 (Hooks, Context API)
- **Styling**: CSS moderno com variáveis CSS e flexbox/grid
- **Icons**: Font Awesome 6
- **Drag & Drop**: SortableJS para funcionalidade nativa
- **Storage**: localStorage para persistência de dados

## 📦 Estrutura do Projeto

```
kanban-task-manager/
├── index.html          # Arquivo principal HTML
├── style.css           # Estilos CSS globais e componentes
├── app.js             # Aplicação React principal
└── guia-deployment.md # Este guia
```

## 🚀 Opções de Deployment

### 1. Deploy Estático (Recomendado)

O aplicativo é completamente estático e pode ser hospedado em qualquer servidor web:

#### GitHub Pages
```bash
# 1. Criar repositório no GitHub
# 2. Fazer upload dos arquivos
# 3. Ativar GitHub Pages nas configurações
# URL: https://[username].github.io/[repository-name]
```

#### Netlify
```bash
# 1. Conectar repositório GitHub ou fazer upload manual
# 2. Configurações de build (não necessárias para static)
# 3. Deploy automático
```

#### Vercel
```bash
# 1. Instalar Vercel CLI: npm i -g vercel
# 2. No diretório do projeto: vercel
# 3. Seguir instruções do CLI
```

### 2. Deploy em Servidor Web

#### Nginx
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /path/to/kanban-task-manager;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para assets estáticos
    location ~* \.(css|js|ico|png|jpg|jpeg|gif|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /path/to/kanban-task-manager
    
    <Directory /path/to/kanban-task-manager>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Cache para assets
    <LocationMatch "\\.(css|js|ico|png|jpg|jpeg|gif|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
</VirtualHost>
```

### 3. Deploy com Docker

#### Dockerfile
```dockerfile
FROM nginx:alpine

# Copiar arquivos da aplicação
COPY . /usr/share/nginx/html

# Configuração nginx customizada (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  kanban-app:
    build: .
    ports:
      - "3000:80"
    restart: unless-stopped
```

#### Comandos Docker
```bash
# Build da imagem
docker build -t kanban-task-manager .

# Executar container
docker run -d -p 3000:80 --name kanban-app kanban-task-manager

# Ou usando docker-compose
docker-compose up -d
```

## ⚙️ Configurações de Produção

### 1. Otimizações de Performance

#### Compressão GZIP (Nginx)
```nginx
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

#### Headers de Segurança
```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 2. SSL/HTTPS (Recomendado)

#### Certbot (Let's Encrypt)
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Monitoramento

#### Log de Acesso (Nginx)
```nginx
access_log /var/log/nginx/kanban-access.log;
error_log /var/log/nginx/kanban-error.log;
```

## 🔧 Personalização

### 1. Modificar Dados Iniciais

Editar no arquivo `app.js`:
```javascript
const initialTasks = [
  // Adicionar suas tarefas padrão aqui
];

const defaultColumns = [
  // Personalizar colunas padrão
];
```

### 2. Customizar Cores e Tema

Editar no arquivo `style.css`:
```css
:root {
  --color-primary: #sua-cor-principal;
  --color-background: #sua-cor-fundo;
  /* Outras variáveis CSS */
}
```

### 3. Adicionar Funcionalidades

O código está estruturado para fácil extensão:
- Componentes modulares em React
- Hooks customizados para lógica reutilizável
- Estado gerenciado centralmente

## 📱 Compatibilidade

- **Navegadores**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Dispositivos**: Desktop, tablet, mobile
- **Resolução**: 320px+ de largura
- **Funcionalidades**: Local Storage, CSS Grid/Flexbox, ES6+

## 🔒 Segurança

- **Frontend Only**: Sem dados sensíveis no código
- **Local Storage**: Dados ficam apenas no navegador do usuário
- **CSP Headers**: Implementar Content Security Policy se necessário
- **HTTPS**: Sempre usar SSL em produção

## 🐛 Troubleshooting

### Problemas Comuns

1. **localStorage não funciona**
   - Verificar se cookies/storage estão habilitados
   - Alguns navegadores bloqueiam em file:// protocol

2. **Drag & drop não funciona**
   - Verificar se SortableJS carregou corretamente
   - Verificar console para erros JavaScript

3. **Estilos quebrados**
   - Verificar se style.css está carregando
   - Verificar MIME types no servidor

### Logs e Debug

```javascript
// Ativar debug no localStorage
localStorage.setItem('kanban-debug', 'true');

// Ver dados salvos
console.log(localStorage.getItem('kanban-tasks'));
console.log(localStorage.getItem('kanban-theme'));
```

## 📈 Métricas e Analytics

### Google Analytics (Opcional)
```html
<!-- Adicionar no index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📞 Suporte

Para suporte técnico ou customizações:
- Verificar console do navegador para erros
- Testar em navegador diferente
- Verificar configurações do servidor web
- Revisar logs de acesso e erro

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2025  
**Compatibilidade**: React 18+, ES2022+