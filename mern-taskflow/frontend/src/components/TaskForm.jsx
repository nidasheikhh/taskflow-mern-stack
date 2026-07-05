import React, { useState, useEffect } from 'react';

const emptyForm = {
  title: '',
  description: '',
  category: 'Other',
  priority: 'Medium',
  status: 'To Do',
  dueDate: '',
};

const TaskForm = ({ open, onClose, onSubmit, initialTask }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        category: initialTask.category || 'Other',
        priority: initialTask.priority || 'Medium',
        status: initialTask.status || 'To Do',
        dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialTask, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-lg shadow-2xl">
        <h2 className="font-display text-2xl font-semibold text-ink mb-5">
          {initialTask ? 'Edit task' : 'New task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to get done?"
              className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Any extra detail (optional)"
              className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors bg-white"
              >
                {['Work', 'Personal', 'Study', 'Health', 'Other'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors bg-white"
              >
                {['Low', 'Medium', 'High'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors bg-white"
              >
                {['To Do', 'In Progress', 'Done'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Due date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-flow-100 focus:border-flow-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-flow-700 text-white font-semibold hover:bg-ink transition-colors"
            >
              {initialTask ? 'Save changes' : 'Add task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-flow-100 text-flow-700 font-semibold hover:bg-flow-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
