import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import StatsBar from '../components/StatsBar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from '../components/TaskForm.jsx';
import api from '../api/axios.js';

const statusFilters = ['All', 'To Do', 'In Progress', 'Done'];
const categoryFilters = ['All', 'Work', 'Personal', 'Study', 'Health', 'Other'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (search.trim()) params.search = search.trim();

      const [tasksRes, statsRes] = await Promise.all([
        api.get('/tasks', { params }),
        api.get('/tasks/stats'),
      ]);
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      toast.error('Could not load your tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, search]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 250); // light debounce for search
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const openNewTaskForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
        toast.success('Task updated');
      } else {
        await api.post('/tasks', form);
        toast.success('Task added');
      }
      setFormOpen(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error('Could not delete task');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  return (
    <div className="min-h-screen bg-mist pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-8 space-y-8">
        <StatsBar stats={stats} />

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="flex-1 px-4 py-2.5 rounded-full border border-flow-100 bg-white focus:border-flow-600 outline-none transition-colors"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-flow-100 bg-white focus:border-flow-600 outline-none"
          >
            {statusFilters.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-flow-100 bg-white focus:border-flow-600 outline-none"
          >
            {categoryFilters.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={openNewTaskForm}
            className="px-5 py-2.5 rounded-full bg-amber-400 text-ink font-semibold hover:bg-amber-500 transition-colors whitespace-nowrap"
          >
            + New task
          </button>
        </div>

        {/* Task grid */}
        {loading ? (
          <p className="text-flow-600 font-mono text-sm">Loading your tasks…</p>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-ink mb-2">
              Nothing here yet.
            </p>
            <p className="text-flow-700 mb-6">
              Add your first task and start building momentum.
            </p>
            <button
              onClick={openNewTaskForm}
              className="px-5 py-2.5 rounded-full bg-flow-700 text-white font-semibold hover:bg-ink transition-colors"
            >
              + Add a task
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;
