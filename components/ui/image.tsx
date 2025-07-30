import React from 'react';
import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/images';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  useAlias?: boolean;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className, 
  useAlias = false,
  ...props 
}) => {
  const imageSrc = useAlias ? getImagePath(src) : src;
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn(className)}
      {...props}
    />
  );
};

// Composant spécialisé pour les images du dossier @images/
export const LocalImage: React.FC<Omit<ImageProps, 'useAlias'> & { imageName: string }> = ({ 
  imageName, 
  alt, 
  className,
  ...props 
}) => {
  return (
    <Image
      src={imageName}
      alt={alt}
      className={className}
      useAlias={true}
      {...props}
    />
  );
}; 