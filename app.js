const { useState, useEffect, useCallback, useMemo } = React;

// Initial data
const initialTasks = [
  {
    id: "1",
    title: "Configurar ambiente de desenvolvimento",
    description: "Instalar Node.js, React e configurar o projeto inicial",
    priority: "High",
    dueDate: "2025-06-10",
    status: "Backlog",
    createdAt: "2025-06-05"
  },
  {
    id: "2", 
    title: "Implementar sistema de autenticação",
    description: "Criar login/logout com JWT e validação",
    priority: "High",
    dueDate: "2025-06-15",
    status: "To Do",
    createdAt: "2025-06-05"
  },
  {
    id: "3",
    title: "Desenvolver interface do usuário",
    description: "Criar componentes React para o dashboard principal",
    priority: "Medium",
    dueDate: "2025-06-20",
    status: "In Progress", 
    createdAt: "2025-06-05"
  },
  {
    id: "4",
    title: "Configurar CI/CD pipeline",
    description: "Automatizar deploy usando GitHub Actions",
    priority: "Low",
    dueDate: "2025-06-25",
    status: "Done",
    createdAt: "2025-06-04"
  },
  {
    id: "5",
    title: "Testes unitários",
    description: "Implementar testes com Jest e React Testing Library", 
    priority: "Medium",
    dueDate: "2025-06-18",
    status: "To Do",
    createdAt: "2025-06-05"
  }
];

const defaultColumns = [
  { id: "Backlog", title: "Backlog", color: "#6B7280" },
  { id: "To Do", title: "To Do", color: "#3B82F6" },
  { id: "In Progress", title: "In Progress", color: "#F59E0B" },
  { id: "Done", title: "Done", color: "#10B981" }
];

// Custom hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Utility functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// Components
const TaskCard = ({ task, onEdit, onDelete, onDragStart, onDragEnd }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.currentTarget.classList.add('dragging');
    onDragStart && onDragStart(task);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    onDragEnd && onDragEnd();
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onEdit(task)}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          <button
            className="task-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Editar tarefa"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="task-action-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            title="Excluir tarefa"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          <i className="fas fa-flag"></i>
          {task.priority}
        </span>
        
        {task.dueDate && (
          <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
            <i className="fas fa-calendar"></i>
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};

const KanbanColumn = ({ column, tasks, onAddTask, onEditTask, onDeleteTask, onDropTask }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    onDropTask(taskId, column.id);
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title">
          <div
            className="column-indicator"
            style={{ backgroundColor: column.color }}
          ></div>
          <span>{column.title}</span>
          <span className="task-count">{tasks.length}</span>
        </div>
        <button
          className="add-task-btn"
          onClick={() => onAddTask(column.id)}
          title="Adicionar tarefa"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
      <div
        className={`task-list ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="empty-column">
            <i className="fas fa-inbox empty-icon"></i>
            <p>Nenhuma tarefa</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TaskModal = ({ isOpen, onClose, onSave, task, initialStatus }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: initialStatus || 'To Do'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate || '',
        status: task.status || initialStatus || 'To Do'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: initialStatus || 'To Do'
      });
    }
  }, [task, initialStatus, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      ...formData,
      id: task?.id || generateId(),
      createdAt: task?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSave(taskData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="task-form">
              <div className="form-group">
                <label className="form-label">Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Digite o título da tarefa"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Descreva a tarefa (opcional)"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Prioridade</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Low">Baixa</option>
                    <option value="Medium">Média</option>
                    <option value="High">Alta</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Data de Vencimento</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  {defaultColumns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              {task ? 'Salvar' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const KanbanApp = () => {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', initialTasks);
  const [columns, setColumns] = useLocalStorage('kanban-columns', defaultColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('kanban-dark-mode', false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !debouncedSearchTerm || 
        task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      
      return matchesSearch && matchesPriority;
    });
  }, [tasks, debouncedSearchTerm, priorityFilter]);

  const handleAddTask = useCallback((status) => {
    setInitialStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setInitialStatus(task.status);
    setIsModalOpen(true);
  }, []);

  const handleSaveTask = useCallback((taskData) => {
    setTasks(prevTasks => {
      if (editingTask) {
        return prevTasks.map(task => 
          task.id === editingTask.id ? taskData : task
        );
      } else {
        return [...prevTasks, taskData];
      }
    });
  }, [editingTask, setTasks]);

  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  }, [setTasks]);

  const handleDropTask = useCallback((taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, [setTasks]);

  const handleClearCompleted = useCallback(() => {
    if (window.confirm('Tem certeza que deseja limpar todas as tarefas concluídas?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.status !== 'Done'));
    }
  }, [setTasks]);

  const exportTasks = useCallback(() => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanban-tasks-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [tasks]);

  return (
    <div className="kanban-app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="fas fa-tasks"></i>
            Kanban - Gestão de Tarefas
          </h1>
          
          <div className="header-controls">
            <div className="search-container">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="priority-filter"
              >
                <option value="">Todas as prioridades</option>
                <option value="High">Alta</option>
                <option value="Medium">Média</option>
                <option value="Low">Baixa</option>
              </select>
              
              <button
                onClick={handleClearCompleted}
                className="btn btn--secondary btn--sm"
                title="Limpar concluídas"
              >
                <i className="fas fa-broom"></i>
              </button>
              
              <button
                onClick={exportTasks}
                className="btn btn--secondary btn--sm"
                title="Exportar tarefas"
              >
                <i className="fas fa-download"></i>
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="theme-toggle"
                title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
              >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="kanban-board">
        <div className="board-container">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter(task => task.status === column.id)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onDropTask={handleDropTask}
            />
          ))}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        initialStatus={initialStatus}
      />
    </div>
  );
};

// Render the app
ReactDOM.render(<KanbanApp />, document.getElementById('root'));