import React from 'react';

const priorityStyles = {
  High: 'bg-coral/10 text-coral border-coral/30',
  Medium: 'bg-amber-400/10 text-amber-500 border-amber-400/30',
  Low: 'bg-flow-100 text-flow-600 border-flow-100',
};

const statusOrder = ['To Do', 'In Progress', 'Done'];

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const nextStatus = () => {
    const idx = statusOrder.indexOf(task.status);
    return statusOrder[(idx + 1) % statusOrder.length];
  };

  return (
    <div className="task-card bg-white rounded-2xl p-5 border border-flow-100 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold text-ink leading-snug">
          {task.title}
        </h3>
        <span
          className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-flow-700 leading-relaxed">{task.description}</p>
      )}

      <div className="flex items-center gap-2 text-xs font-mono text-flow-600">
        <span className="px-2 py-1 bg-flow-50 rounded-md">{task.category}</span>
        {task.dueDate && (
          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-flow-100">
        <button
          onClick={() => onStatusChange(task, nextStatus())}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-flow-700 text-white hover:bg-ink transition-colors"
          title="Move to next status"
        >
          {task.status} →
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(task)}
            className="text-xs font-semibold text-flow-600 hover:text-ink transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-xs font-semibold text-coral hover:text-ink transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
