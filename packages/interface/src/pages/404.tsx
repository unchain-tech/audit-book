import clsx from 'clsx';

export const Custom404 = () => {
  return (
    <div
      className={clsx(
        'w-screen',
        'h-screen',
        'flex',
        'flex-col',
        'justify-center',
        'items-center'
      )}
    >
      <div className={clsx('text-3xl', 'font-bold', 'm-4')}>
        404 - Page Not Found
      </div>
    </div>
  );
};
