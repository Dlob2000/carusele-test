import React, { useEffect } from 'react';
import { useToastStore } from '../../store/useToastStore';

const Toasts: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => remove(toasts[0].id), 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, remove]);

  return (
    <div className="pointer-events-none fixed top-4 right-4 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto rounded bg-black px-3 py-2 text-white shadow">
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toasts;
