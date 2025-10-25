import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`px-6 py-4 border-b border-slate-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`px-6 py-4 border-t border-slate-200 ${className}`} {...props}>
      {children}
    </div>
  );
};
