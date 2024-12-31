import Button from '../Button';
import { fsAddTemplate, fsListenToTemplates, fsDeleteTemplate } from '@/app/lib/firestore';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/app/lib/authContext';

export default function TemplateTasks({ addTemplate }) {
  const [templates, setTemplates] = useState([]);

  const { user } = useAuth();

  // Call getTemplates when user is loaded
  useEffect(() => {
    if (user) {
      const unsubscribe = fsListenToTemplates(user.uid, (updatedTemplates) => {
        setTemplates(updatedTemplates);
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe(); // Properly clean up listener
        }
      };
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center ">
      <h2 className="text-lg font-bold">Template Tasks</h2>

      {/* List all templates */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => addTemplate(template)}
            className="bg-dark-7 text-white p-4 rounded shadow cursor-pointer"
          >
            <h3 className="text-lg font-bold">{template.name}</h3>
            <Button onClick={() => fsDeleteTemplate(user.uid, template.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
