"use client";
 
import React, { useState, useRef, useEffect, Children, cloneElement } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  distance?: number;
  hasUpwardAnimation?: boolean;
  disabled?: boolean;
  forcePosition?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = React.memo(({ children, content, position = "top", className = "", distance = 8, hasUpwardAnimation = false, disabled = false, forcePosition = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipWidth, setTooltipWidth] = useState(200);
  const [isMobile, setIsMobile] = useState(false);
  const [actualPosition, setActualPosition] = useState<"top" | "bottom" | "left" | "right">(position);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (disabled) {
      setIsVisible(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (isVisible && triggerRef.current && !isMobile) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const tempElement = document.createElement("div");
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      tempElement.style.whiteSpace = "normal";
      tempElement.style.fontSize = "14px";
      tempElement.style.fontFamily = "inherit";
      tempElement.style.padding = "8px 12px";
      tempElement.style.maxWidth = "300px";
      tempElement.style.wordWrap = "break-word";
      tempElement.style.lineHeight = "1.4";
      tempElement.style.width = "auto";
      tempElement.style.minWidth = "120px";
      tempElement.innerHTML = content.replace(/\n/g, '<br>');
      document.body.appendChild(tempElement);

      // Force le rendu pour obtenir des dimensions précises
      tempElement.offsetHeight;

      const calculatedTooltipWidth = Math.min(300, Math.max(120, tempElement.offsetWidth + 2)); // +2 pour la bordure
      const calculatedTooltipHeight = tempElement.offsetHeight + 2; // +2 pour la bordure
      document.body.removeChild(tempElement);

      let top = 0;
      let left = 0;
      let currentPosition = position;

      switch (position) {
        case "top":
          // Positionner le tooltip plus haut si l'élément a une animation vers le haut
          const animationOffset = hasUpwardAnimation ? 20 : 0; // Compensation pour le déplacement vers le haut
          top = rect.top - calculatedTooltipHeight - distance - animationOffset;
          // Centrer le tooltip sur l'élément en utilisant ses dimensions actuelles (animées)
          left = rect.left + rect.width / 2 - calculatedTooltipWidth / 2;

          // Calculer l'espace disponible en haut et ajuster si nécessaire
          // Espace plus généreux pour éviter tout chevauchement visuel, tenir compte du décalage d'animation
          const minSpaceNeeded = Math.max(calculatedTooltipHeight + 10, 15) + animationOffset; // Au moins 15px ou hauteur + 10px + animation offset
          const availableSpaceAbove = rect.top - minSpaceNeeded;
          const needsAdjustment = calculatedTooltipHeight > availableSpaceAbove;

          if (needsAdjustment) {
            // Pas assez d'espace en haut, essayer d'autres positions
            if (rect.bottom + calculatedTooltipHeight + distance < viewportHeight - 10) {
              currentPosition = "bottom";
              top = rect.bottom + distance;
              left = rect.left + rect.width / 2 - calculatedTooltipWidth / 2;
            } else if (rect.left - calculatedTooltipWidth - distance > 10) {
              currentPosition = "left";
              top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
              left = rect.left - calculatedTooltipWidth - distance;
            } else if (rect.right + calculatedTooltipWidth + distance < viewportWidth - 10) {
              currentPosition = "right";
              top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
              left = rect.right + distance;
            }
            // Sinon, garde la position top mais ajuste la position verticalement
          }

          if (top < 10) {
            // Si le tooltip sort en haut de la viewport, repositionner en bas
            currentPosition = "bottom";
            top = rect.bottom + distance;
            left = rect.left + rect.width / 2 - calculatedTooltipWidth / 2;
          }
          break;

        case "bottom":
          top = rect.bottom + distance;
          left = rect.left + rect.width / 2 - calculatedTooltipWidth / 2;

          // Vérifier si le tooltip sort en bas de la viewport
          if (!forcePosition && top + calculatedTooltipHeight > viewportHeight - 10) {
            currentPosition = "top";
            top = rect.top - calculatedTooltipHeight - distance;
          }
          break;

        case "left":
          top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
          left = rect.left - calculatedTooltipWidth - distance;

          // Si le tooltip sort à gauche de la viewport, repositionner à droite
          if (left < 10) {
            currentPosition = "right";
            left = rect.right + distance;
          }
          break;

        case "right":
          top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
          left = rect.right + distance;

          // Si le tooltip sort à droite de la viewport, repositionner à gauche
          if (left + calculatedTooltipWidth > viewportWidth - 10) {
            currentPosition = "left";
            left = rect.left - calculatedTooltipWidth - distance;
          }
          break;
      }

      // Dernière vérification : si on est toujours en position top et qu'on chevauche encore
      // Ignorer si forcePosition est true et que la position demandée est "bottom"
      if (!(forcePosition && position === "bottom") && currentPosition === "top" && top + calculatedTooltipHeight > rect.top) {
        // Si le tooltip chevauche encore l'élément en position top, essaie d'autres positions
        if (rect.bottom + calculatedTooltipHeight + distance < viewportHeight - 10) {
          currentPosition = "bottom";
          top = rect.bottom + distance;
          left = rect.left + rect.width / 2 - calculatedTooltipWidth / 2;
        } else if (rect.left - calculatedTooltipWidth - distance > 10) {
          currentPosition = "left";
          top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
          left = rect.left - calculatedTooltipWidth - distance;
        } else if (rect.right + calculatedTooltipWidth + distance < viewportWidth - 10) {
          currentPosition = "right";
          top = rect.top + rect.height / 2 - calculatedTooltipHeight / 2;
          left = rect.right + distance;
        }
        // Sinon, ajuste la position top pour éviter le chevauchement minimum
      }

      // Ajustement final pour s'assurer que le tooltip reste dans la viewport horizontalement
      if (left < 10) {
        left = 10;
      } else if (left + calculatedTooltipWidth > viewportWidth - 10) {
        left = viewportWidth - calculatedTooltipWidth - 10;
      }

      // Ajustement final pour s'assurer que le tooltip reste dans la viewport verticalement
      // Si forcePosition est true et position est "bottom", ne pas ajuster verticalement
      if (!(forcePosition && position === "bottom")) {
        if (top < 10) {
          top = 10;
        } else if (top + calculatedTooltipHeight > viewportHeight - 10) {
          top = viewportHeight - calculatedTooltipHeight - 10;
        }
      }

      // Dernière vérification : ajuste la position si nécessaire pour éviter le chevauchement
      // Distance de sécurité plus grande pour les éléments animés
      // Ignorer si forcePosition est true et que la position demandée est "bottom"
      if (!(forcePosition && position === "bottom") && currentPosition === "top") {
        const safeDistance = hasUpwardAnimation ? 20 : 12;
        if (top + calculatedTooltipHeight > rect.top - safeDistance) {
          const overlapAmount = (top + calculatedTooltipHeight) - (rect.top - safeDistance);
          if (overlapAmount > 0) {
            top = top - overlapAmount - (hasUpwardAnimation ? 5 : 3); // Espace supplémentaire pour les éléments animés
          }
        }
      }



      setTooltipPosition({ top, left });
      setTooltipWidth(calculatedTooltipWidth);
      setActualPosition(currentPosition);
    }
  }, [isVisible, position, content, distance, isMobile, hasUpwardAnimation, forcePosition]);

  // Système de suivi en temps réel ultra-réactif pour les animations
  useEffect(() => {
    if (!isVisible || !triggerRef.current || isMobile) return;

    let rafId: number;
    let lastRect: DOMRect | null = null;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }

      // Forcer le recalcul des styles pour détecter les animations
      const element = triggerRef.current;
      if (element) {
        // Forcer le navigateur à recalculer les styles
        element.offsetHeight;
        element.offsetWidth;
      }

      // Calculer les dimensions du tooltip pour un positionnement précis
      const tempElement = document.createElement("div");
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      tempElement.style.whiteSpace = "normal";
      tempElement.style.fontSize = "14px";
      tempElement.style.fontFamily = "inherit";
      tempElement.style.padding = "8px 12px";
      tempElement.style.maxWidth = "300px";
      tempElement.style.wordWrap = "break-word";
      tempElement.style.lineHeight = "1.4";
      tempElement.style.width = "auto";
      tempElement.style.minWidth = "120px";
      tempElement.innerHTML = content.replace(/\n/g, '<br>');
      document.body.appendChild(tempElement);

      // Force le rendu pour obtenir des dimensions précises
      tempElement.offsetHeight;

      const tooltipWidth = Math.min(300, Math.max(120, tempElement.offsetWidth + 2));
      const tooltipHeight = tempElement.offsetHeight + 2;
      document.body.removeChild(tempElement);

      // Calculer la position avec les vraies dimensions selon la position demandée
      const distance = 8;
      let top = 0;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;

      if (position === "bottom") {
        top = rect.bottom + distance;
      } else if (position === "top") {
        const animationOffset = hasUpwardAnimation ? 20 : 0;
        top = rect.top - tooltipHeight - distance - animationOffset;
      } else if (position === "left") {
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - distance;
      } else if (position === "right") {
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + distance;
      } else {
        // Par défaut, position top
        const animationOffset = hasUpwardAnimation ? 20 : 0;
        top = rect.top - tooltipHeight - distance - animationOffset;
      }

      // Ajustement horizontal pour rester dans la viewport
      if (left < 10) {
        left = 10;
      } else if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
      }

      // Ajustement vertical seulement si forcePosition n'est pas activé
      if (!(forcePosition && position === "bottom")) {
        if (top < 10) {
          top = 10;
        } else if (top + tooltipHeight > window.innerHeight - 10) {
          top = window.innerHeight - tooltipHeight - 10;
        }
      }

      // Mettre à jour immédiatement la position et les dimensions
      setTooltipPosition({ top, left });
      setTooltipWidth(tooltipWidth);

      // Continuer le suivi
      rafId = requestAnimationFrame(updatePosition);
    };

    // Démarrer le suivi
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isVisible, hasUpwardAnimation, isMobile, position, forcePosition, content]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
    };

    if (isVisible) {
      document.addEventListener("scroll", handleScroll, true);
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isVisible]);

  const arrowClasses = {
    top: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black",
    bottom: "absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black",
    left: "absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-black",
    right: "absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black",
  };

  const childrenWithoutTitle = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child as any, { title: "" });
    }
    return child;
  });

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => !isMobile && !disabled && setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        title=""
      >
        {childrenWithoutTitle}
      </div>
      {isVisible && !isMobile && !disabled &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[10000001] rounded-lg bg-black px-3 py-2 text-center text-sm text-white transition-opacity duration-200"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              width: `${tooltipWidth}px`,
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {content}
            <div className={arrowClasses[actualPosition || position]}></div>
          </div>,
          document.body,
        )}
    </>
  );
});
